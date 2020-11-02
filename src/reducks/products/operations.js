import {firebaseTimestamp, firestore} from '../../firebase';
import {push} from 'connected-react-router';

const productRef = firestore.collection('products');

// 商品情報をデータベースに追加するメソッド
export const saveProduct = (name, description, category, gender, price) => {
  return async (dispatch) => {
    const timestamp = firebaseTimestamp.now();

    const data = {
      name: name,
      description: description,
      category: category,
      gender: gender,
      price: parseInt(price, 10),
      updatedAt: timestamp,
    };

    const ref = productRef.doc();

    data.id = ref.id;
    data.createdAt = timestamp;

    return productRef.doc(ref.id)
        .set(data)
        .then(() => {
          dispatch(push('/'));
        }).catch((error) => {
          throw new Error(error);
        });
  };
};