import {firebaseTimestamp, firestore} from '../../firebase';
import {push} from 'connected-react-router';
import {deleteProductAction, fetchProductsAction} from './actions';

const productRef = firestore.collection('products');

// 商品情報をデータベースに追加するメソッド
export const saveProduct = (id, name, description, category, price, quantity, images) => {
  return async (dispatch) => {
    const timestamp = firebaseTimestamp.now();

    const data = {
      name: name,
      description: description,
      category: category,
      price: parseInt(price, 10),
      quantity: parseInt(quantity, 10),
      images: images,
      updatedAt: timestamp,
    };

    // 商品の新規登録の場合のみの処理
    if (id === '') {
      const ref = productRef.doc();
      id = ref.id;
      data.id = id;
      data.createdAt = timestamp;
    }

    return productRef.doc(id)
        .set(data, {merge: true})
        .then(() => {
          dispatch(push('/'));
        }).catch((error) => {
          throw new Error(error);
        });
  };
};

// 商品情報をデータベースから取得するメソッド
export const fetchProducts = (category) => {
  return async (dispatch) => {
    productRef.orderBy('updatedAt', 'desc')
        .get()
        .then(snapshots => {
          const productList = [];

          snapshots.forEach(snapshot => {
            const product = snapshot.data();

            productList.push(product);
          });

          dispatch(fetchProductsAction(productList));
        });
  };
};

// 商品情報をデーターベースから削除するメソッド
export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productRef.doc(id).delete()
        .then(() => {
          const prevProducts = getState().products.list;
          const nextProducts = prevProducts.filter(product => product.id !== id);
          dispatch(deleteProductAction(nextProducts));
        });
  };
};

// 商品を購入するメソッド
export const orderProduct = (productsInCart, price) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = firestore.collection('users').doc(uid);
    const timestamp = firebaseTimestamp.now();
    const batch = firestore.batch();

    let products = [];
    let soldOutProducts = [];

    for (const product of productsInCart) {
      const snapshot = await productRef.doc(product.productId).get();
      const stock = snapshot.data().quantity;

      if (stock === 0) {
        soldOutProducts.push(product.name);
        return stock;
      }

      const updatedStock = stock - 1;

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });

      // 購入後の在庫を更新する
      batch.update(
          productRef.doc(product.productId),
          {quantity: updatedStock},
      );

      // カートから購入した商品を削除する
      batch.delete(
          userRef.collection('cart').doc(product.cartId),
      );
    }

    // 売り切れのものがあった場合のエラー処理
    if (soldOutProducts.length > 0) {
      const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0];
      alert(`${errorMessage}が在庫切れなので、購入ができませんでした`);

      return false;
    } else {
      batch.commit().then(() => {
        const orderRef = userRef.collection('orders').doc();
        const date = timestamp.toDate();
        const shippingDate = firebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 5)));

        const history = {
          amount: price,
          id: orderRef.id,
          products: products,
          shippingDate: shippingDate,
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        orderRef.set(history);
        dispatch(push('/order/complate'));
      }).catch((error) => {
        alert('購入処理が中断しました');
        return false;
      });
    }
  };
};