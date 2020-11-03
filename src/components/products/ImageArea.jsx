import React, {useCallback} from 'react';
import {IconButton} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {makeStyles} from '@material-ui/styles';
import {storage} from '../../firebase';
import ImagePreview from './ImagePreview';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea = (props) => {
  const classes = useStyles();
  const images = props.images;

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

  // アップロードした画像を削除する機能
  const deleteImage = useCallback(async (id) => {
    const boolean = window.confirm('この画像を削除しますか？');

    if (boolean) {
      // 指定された画像以外をfilterで取り出す
      const newImages = images.filter(image => image.id !== id);
      props.setImages(newImages);

      return storage.ref('images').child(id).delete();
    } else {
      return false;
    }
  }, [images]);

  return (
      <div>
        <div className="images-list">
          {props.images.length > 0 && (
              props.images.map(image => <ImagePreview path={image.path} key={image.id} id={image.id} delete={deleteImage}/>)
          )}
        </div>
        <div className="right-text">
          <span className="add-product-image-text">動物の画像</span>
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