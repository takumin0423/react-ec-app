import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {Badge} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import {getProductsInCart} from '../../reducks/users/selectors';
import {useSelector} from 'react-redux';

const HeaderMenu = (props) => {
  const selector = useSelector(state => state);

  let productsInCart = getProductsInCart(selector);

  return (
      <>
        <IconButton>
          <Badge badgeContent={productsInCart.length} color={'primary'}>
            <ShoppingCartIcon/>
          </Badge>
        </IconButton>

        <IconButton>
          <FavoriteBorderIcon/>
        </IconButton>

        <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
          <MenuIcon/>
        </IconButton>
      </>
  );
};
export default HeaderMenu;