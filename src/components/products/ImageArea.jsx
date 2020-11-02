import React from 'react';
import {IconButton} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea = (props) => {
  const classes = useStyles();

  return (
      <div>
        <div className="right-text">
          <span className="add-product-image-text">商品の画像</span>
          <IconButton className={classes.icon}>
            <label>
              <AddAPhotoIcon/>
              <input
                  className="none-display"
                  type="file"
                  id="product-image"
              />
            </label>
          </IconButton>
        </div>
      </div>
  );
};

export default ImageArea;