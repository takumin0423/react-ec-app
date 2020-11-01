import React from 'react';
import {Switch, Route} from 'react-router';
import {Home, SignIn, SignUp} from './pages';

const Router = () => {
  return (
      <Switch>
        <Route exact path={'(/)?'} component={Home}/>
        <Route exact path={'/signup'} component={SignUp}/>
        <Route exact path={'/signin'} component={SignIn}/>
      </Switch>
  );
};

export default Router;