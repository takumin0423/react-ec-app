import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/no_image.png';
import {push} from 'connected-react-router';
import {useDispatch} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)',
    },
  },
  content: {
    display: 'flex',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}));

const ProductCard = (props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  // 画像の有無で表示を変える
  const images = (props.images.length > 0) ? props.images : [{path: NoImage}];

  // 価格を3桁区切りにする
  const price = props.price.toLocaleString();

  const handleClick = (event) => {
    setIsOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpenMenu(null);
  };

  return (
      <Card className={classes.root}>
        <CardMedia
            className={classes.media}
            image={images[0].path}
            onClick={() => dispatch(push(`/product/${props.id}`))}
        />
        <CardContent className={classes.content}>
          <div onClick={() => dispatch(push(`/product/${props.id}`))}>
            <Typography
                color={'textSecondary'}
                component={'p'}
            >
              {props.name}
            </Typography>
            <Typography
                className={classes.price}
                component={'p'}
            >
              ¥{price}
            </Typography>
          </div>
          <IconButton onClick={handleClick}>
            <MoreVertIcon/>
          </IconButton>
          <Menu
              open={Boolean(isOpenMenu)}
              anchorEl={isOpenMenu}
              keepMounted
              onClose={handleClose}
          >
            <MenuItem onClick={() => {
              dispatch(push(`/product/edit/${props.id}`))
              handleClose()
            }}>
              編集
            </MenuItem>
            <MenuItem>
              削除
            </MenuItem>
          </Menu>
        </CardContent>
      </Card>
  );
};

export default ProductCard;