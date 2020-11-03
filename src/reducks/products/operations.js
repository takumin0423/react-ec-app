import {firebaseTimestamp, firestore} from '../../firebase';
import {push} from 'connected-react-router';
import {deleteProductsAction, fetchProductsAction} from './actions';

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
export const fetchProducts = () => {
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

    productRef.doc(id)
        .delete()
        .then(() => {
          const prevProducts = getState().products.list;
          const newProducts = prevProducts.filter(product => product.id !== id);

          dispatch(deleteProductsAction(newProducts));
        });
  };
};