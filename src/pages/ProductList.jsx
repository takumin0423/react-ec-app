import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../reducks/products/operations';
import {getProducts} from '../reducks/products/selectors';

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector)

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
      <section className="section-wrapper">
        <div className="grid-row">

        </div>
      </section>
  );
};

export default ProductList;