import React from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

const SizeTable = (props) => {
  const classes = useStyles();

  return (
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">{props.price}</TableCell>
              <TableCell>残り{props.quantity}枚</TableCell>
              <TableCell className={classes.iconCell}>
                {props.quantity > 0 ? (
                    <IconButton
                        className={classes.iconCell}
                        onClick={() => props.addProduct()}
                    >
                      <ShoppingCartIcon/>
                    </IconButton>
                ) : (
                    <div className="sold-out-text">売り切れ</div>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default SizeTable;