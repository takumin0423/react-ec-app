import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {saveProduct} from '../reducks/products/operations';
import ImageArea from '../components/products/ImageArea';
import {firestore} from '../firebase';
import TextInput from '../components/generic/TextInput';
import PrimaryButton from '../components/generic/PrimaryButton';
import SelectBox from '../components/generic/SelectBox';

const ProductEdit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  // path情報
  let id = window.location.pathname.split('/product/edit')[1];

  // 編集時
  if (id !== '') {
    id = id.split('/')[1];
  }

  const categories = [
    {
      id: 'cat',
      name: '猫',
    },
    {
      id: 'dog',
      name: '犬',
    },
    {
      id: 'other',
      name: 'その他'
    }
  ];

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, [setDescription]);

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value);
  }, [setPrice]);

  const inputQuantity = useCallback((event) => {
    setQuantity(event.target.value);
  }, [setQuantity]);

  // マウント後の処理
  useEffect(() => {
    // 編集ページの場合
    if (id !== '') {
      firestore.collection('products')
          .doc(id)
          .get()
          .then(snapshot => {
            const product = snapshot.data();

            setName(product.name);
            setDescription(product.description);
            setCategory(product.category);
            setPrice(product.price);
            setQuantity(product.quantity);
            setImages(product.images);
          });
    }
  }, [id]);

  return (
      <section>
        <h1 className="text-headline text-center">動物の写真ページ</h1>

        <div className="container">
          <ImageArea
              images={images}
              setImages={setImages}
          />

          <TextInput
              fullWidth={true}
              label={'名前'}
              multiline={false}
              required={true}
              onChange={inputName}
              rows={1}
              value={name}
              type={'text'}
          />

          <TextInput
              fullWidth={true}
              label={'説明'}
              multiline={true}
              required={true}
              onChange={inputDescription}
              rows={5}
              value={description}
              type={'text'}
          />

          <SelectBox
              label={'カテゴリー'}
              options={categories}
              required={true}
              select={setCategory}
              value={category}
          />

          <TextInput
              fullWidth={true}
              label={'価格'}
              multiline={false}
              required={true}
              onChange={inputPrice}
              rows={1}
              value={price}
              type={'number'}
          />

          <TextInput
              fullWidth={true}
              label={'在庫'}
              multiline={false}
              required={true}
              onChange={inputQuantity}
              rows={1}
              value={quantity}
              type={'number'}
          />

          <div className="medium-space"/>

          <div className="center">
            <PrimaryButton
                label={'保存する'}
                onClick={() => dispatch(saveProduct(id, name, description, category, price, quantity, images))}
            />
          </div>
        </div>
      </section>
  );
};

export default ProductEdit;