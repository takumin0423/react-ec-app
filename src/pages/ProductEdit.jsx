import React, {useCallback, useState} from 'react';
import {TextInput} from '../components/generic';

const ProductEdit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, [setDescription]);

  const inputCategory = useCallback((event) => {
    setCategory(event.target.value);
  }, [setCategory]);

  const inputGender = useCallback((event) => {
    setGender(event.target.value);
  }, [setGender]);

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value);
  }, [setPrice]);

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
        </div>
      </section>
  );
};

export default ProductEdit;