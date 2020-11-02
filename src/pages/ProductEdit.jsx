import React, {useCallback, useState} from 'react';

const ProductEdit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

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
        </div>
      </section>
  );
};

export default ProductEdit;