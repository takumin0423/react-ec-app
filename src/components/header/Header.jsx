import React, {useCallback, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {useDispatch, useSelector} from 'react-redux';
import {getIsSignedIn} from '../../reducks/users/selectors';
import {push} from 'connected-react-router';
import HeaderMenu from './HeaderMenu';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: '#F9CBA4',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  toolbar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
});

const Header = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const isSignedId = getIsSignedIn(selector);

  return (
      <div className={classes.root}>
        <AppBar
            position={'fixed'}
            className={classes.menuBar}
        >
          <Toolbar className={classes.toolbar}>
            <div
                className="header-title"
                onClick={() => dispatch(push('/'))}
            >
              <span>ANIMAL PHOTOGRAPH</span>
            </div>
            {isSignedId && (
                <div className={classes.iconButtons}>
                  <HeaderMenu/>
                </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
  );
};

export default Header;