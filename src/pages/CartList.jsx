import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProductsInCart} from '../reducks/users/selectors';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import {CartListItem} from '../components/Products';

import {push} from 'connected-react-router';
import PrimaryButton from '../components/generic/PrimaryButton';
import SecondaryButton from '../components/generic/SecondaryButton';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%',
  },
}));

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'));
  }, []);

  const backToTop = useCallback(() => {
    dispatch(push('/'));
  }, []);

  return (
      <section className="section-wrapper">
        <h2 className="text-headline">ショッピングカート</h2>
        <List className={classes.root}>
          {productsInCart.length > 0 && (
              productsInCart.map(product => <CartListItem product={product} key={product.cartId}/>)
          )}
        </List>
        <div className="medium-space"/>
        <div className="grid_column">
          <PrimaryButton label={'レジへ進む'} onClick={goToOrder}/>
          <div className="extra-small-space"/>
          <SecondaryButton label={'ショッピングを続ける'} onClick={backToTop}/>
        </div>
      </section>
  );
};
export default CartList;