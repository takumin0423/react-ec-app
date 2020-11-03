import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../reducks/products/operations';
import {getProducts} from '../reducks/products/selectors';
import ProductCard from '../components/products/ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
      <section className="section-wrapper">
        <div className="grid-row">
          {products.length > 0 && (
              products.map(product => (
                  <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      images={product.images}
                      price={product.price}
                  />
              ))
          )}
        </div>
      </section>
  );
};

export default ProductList;