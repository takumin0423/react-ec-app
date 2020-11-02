import React, {useCallback, useState} from 'react';
import {PrimaryButton, SelectBox, TextInput} from '../components/generic';
import {useDispatch} from 'react-redux';
import {saveProduct} from '../reducks/products/operations';
import ImageArea from '../components/products/ImageArea';

const ProductEdit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, [setDescription]);

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value);
  }, [setPrice]);

  const categories = [
    {
      id: 'tops',
      name: 'トップス',
    },
    {
      id: 'bottom',
      name: 'ボトムス',
    },
  ];

  const genders = [
    {
      id: 'male',
      name: '男性',
    },
    {
      id: 'female',
      name: '女性',
    },
    {
      id: 'unisex',
      name: 'ユニセックス',
    },
  ];

  return (
      <section>
        <h1 className="text-headline text-center">商品を登録してください</h1>

        <div className="container">
          <TextInput
              fullWidth={true}
              label={'商品名'}
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

          <SelectBox
              label={'カテゴリー'}
              required={true}
              value={category}
              select={setCategory}
              options={categories}
          />

          <SelectBox
              label={'性別'}
              required={true}
              value={gender}
              select={setGender}
              options={genders}
          />

          <ImageArea/>

          <div className="medium-space"/>

          <div className="center">
            <PrimaryButton
                label={'保存する'}
                onClick={() => dispatch(saveProduct(name, description, category, gender, price))}
            />
          </div>
        </div>
      </section>
  );
};

export default ProductEdit;