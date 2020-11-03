import React, {useCallback, useEffect, useState} from 'react';
import {PrimaryButton, SelectBox, TextInput} from '../components/generic';
import {useDispatch} from 'react-redux';
import {saveProduct} from '../reducks/products/operations';
import ImageArea from '../components/products/ImageArea';
import {firestore} from '../firebase';
import {SetSizeArea} from '../components/products';

const ProductEdit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
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
            setImages(product.images);
            setSizes(product.sizes);
          });
    }
  }, [id]);

  return (
      <section>
        <h1 className="text-headline text-center">動物の写真ページ</h1>

        <div className="container">
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

          <div className="medium-space"/>

          <SetSizeArea
              sizes={sizes}
              setSizes={setSizes}
          />

          <div className="small-space"/>

          <ImageArea
              images={images}
              setImages={setImages}
          />

          <div className="center">
            <PrimaryButton
                label={'保存する'}
                onClick={() => dispatch(saveProduct(id, name, description, category, price, images, sizes))}
            />
          </div>
        </div>
      </section>
  );
};

export default ProductEdit;