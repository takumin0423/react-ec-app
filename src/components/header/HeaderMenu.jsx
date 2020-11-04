import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";

const HeaderMenu = (props) => {
  return (
      <>
        <IconButton>
          <Badge badgeContent={3} color={'primary'}>
            <ShoppingCartIcon/>
          </Badge>
        </IconButton>

        <IconButton>
          <FavoriteBorderIcon/>
        </IconButton>

        <IconButton>
          <MenuIcon/>
        </IconButton>
      </>
  );
};
export default HeaderMenu;