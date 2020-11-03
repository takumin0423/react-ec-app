import {firebaseTimestamp, firestore} from '../../firebase';
import {push} from 'connected-react-router';

const productRef = firestore.collection('products');

// 商品情報をデータベースに追加するメソッド
export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
  return async (dispatch) => {
    const timestamp = firebaseTimestamp.now();

    const data = {
      name: name,
      description: description,
      category: category,
      gender: gender,
      price: parseInt(price, 10),
      images: images,
      sizes: sizes,
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