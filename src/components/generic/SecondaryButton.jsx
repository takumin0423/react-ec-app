import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  'button': {
    backgroundColor: '#323026',
    color: '#ffffff',
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
    fontWeight: 'bold',
  },
});

const SecondaryButton = (props) => {
  const classes = useStyles();

  return (
      <Button
          className={classes.button}
          variant="contained"
          onClick={() => props.onClick()}>
        {props.label}
      </Button>
  );
};

export default SecondaryButton;