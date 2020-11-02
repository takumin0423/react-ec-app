import React, {useCallback} from 'react';
import {IconButton} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {makeStyles} from '@material-ui/styles';
import {useDispatch} from 'react-redux';
import {storage} from '../../firebase';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea = (props) => {
  const classes = useStyles();

  // 画像アップロード機能
  const uploadImage = useCallback((event) => {
    const file = event.target.files;
    let blob = new Blob(file, {type: 'image/jpeg'});

    // ランダムな16桁の文字列を生成する
    const randomString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const digits = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(digits))).map((n) => randomString[n % randomString.length]).join('');

    const uploadRef = storage.ref('images').child(fileName);
    const uploadTask = uploadRef.put(blob);

    uploadTask.then(() => {
      uploadTask
          .snapshot
          .ref
          .getDownloadURL()
          .then((url) => {
            const newImage = {id: fileName, path: url};
            props.setImages((prevState) => [...prevState, newImage]);
          });
    });
  }, [props.setImages]);

  return (
      <div>
        <div className="right-text">
          <span className="add-product-image-text">商品の画像</span>
          <IconButton className={classes.icon}>
            <label>
              <AddAPhotoIcon/>
              <input
                  className="none-display"
                  id="product-image"
                  type="file"
                  onChange={event => uploadImage(event)}
              />
            </label>
          </IconButton>
        </div>
      </div>
  );
};

export default ImageArea;