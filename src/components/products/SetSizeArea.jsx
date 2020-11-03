import React, {useCallback, useEffect, useMemo, useState} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from '@material-ui/styles';
import {TextInput} from '../generic';

const useStyles = makeStyles({
  iconCell: {
    height: 48,
    width: 48,
  },
  checkIcon: {
    float: 'right',
  },
});

const SetSizeArea = (props) => {
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);

  const inputSize = useCallback((event) => {
    setSize(event.target.value);
  }, [setSize]);

  const inputQuantity = useCallback((event) => {
    setQuantity(event.target.value);
  }, [setQuantity]);

  // 数量とサイズを指定して保存する機能
  const addSize = (index, size, quantity) => {
    if (size === '' || quantity === '') {
      return false;
    } else {
      if (index === props.sizes.length) {
        props.setSizes(prevState => [...prevState, {size: size, quantity: quantity}]);

        setIndex(index + 1);
        setSize('');
        setQuantity(0);
      } else {
        const newSizes = props.sizes;

        newSizes[index] = {size: size, quantity: quantity};
        props.setSizes(newSizes);
        setIndex(newSizes.length);
        setSize('');
        setQuantity(0);
      }
    }
  };

  // 変更するサイズと数量の組み合わせを指定する機能
  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  // サイズと数量の組み合わせを削除する機能
  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((item, index) => index !== deleteIndex);
    props.setSizes(newSizes);
  };

  useEffect(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  const classes = useStyles();

  return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>サイズ</TableCell>
                <TableCell>数量</TableCell>
                <TableCell className={classes.iconCell}/>
                <TableCell className={classes.iconCell}/>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.sizes.length > 0 && (
                  props.sizes.map((item, index) => (
                      <TableRow key={item.size}>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <IconButton
                              className={classes.iconCell}
                              onClick={() => editSize(index, item.size, item.quantity)}
                          >
                            <EditIcon/>
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                              className={classes.iconCell}
                              onClick={() => deleteSize(index)}
                          >
                            <DeleteIcon/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                  ))
              )}
            </TableBody>
          </Table>

          <div>
            <TextInput
                fullWidth={false}
                label={'サイズ'}
                multiline={false}
                required={true}
                onChange={inputSize}
                rows={1}
                value={size}
                type={'text'}
            />
            <TextInput
                fullWidth={false}
                label={'数量'}
                multiline={false}
                required={true}
                onChange={inputQuantity}
                rows={1}
                value={quantity}
                type={'number'}
            />
          </div>

          <IconButton
              className={classes.checkIcon}
              onClick={() => addSize(index, size, quantity)}
          >
            <CheckBoxIcon/>
          </IconButton>
        </TableContainer>
      </div>
  );
};

export default SetSizeArea;