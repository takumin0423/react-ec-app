import React, {useEffect, useState} from 'react';
import {firestore} from '../firebase';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import HTMLReactParser from 'html-react-parser';
import ImageSwiper from '../components/products/ImageSwiper';

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
}));

const ProductDetail = () => {
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const path = selector.router.location.pathname;
  const id = path.split('/product/')[1];

  const classes = useStyles();

  // 改行コードがある説明の場合の処理
  const returnCodeToBr = (text) => {
    if (text === '') {
      return text;
    } else {
      return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
    }
  };

  useEffect(() => {
    firestore.collection('products')
        .doc(id)
        .get()
        .then(doc => {
          const data = doc.data();
          setProduct(data);
        });
  }, []);

  return (
      <section className="section-wrapper">
        {product && (
            <div className="grid-row">
              <div className={classes.sliderBox}>
                <ImageSwiper images={product.images}/>
              </div>
              <div className={classes.detail}>
                <h1 className="text-headline">{product.name}</h1>
                <p className={classes.price}>¥{product.price.toLocaleString()}</p>

                <div className="small-space"/>
                <div className="small-space"/>

                <p>{returnCodeToBr(product.description)}</p>
              </div>
            </div>
        )}
      </section>
  );
};

export default ProductDetail;