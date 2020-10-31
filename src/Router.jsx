import React from 'react';
import {Switch, Route} from 'react-router';
import {Home, Login, SignUp} from './pages';

const Router = () => {
  return (
      <Switch>
        <Route exact path={'(/)?'} component={Home}/>
        <Route exact path={'/signup'} component={SignUp}/>
        <Route exact path={'/login'} component={Login}/>
      </Switch>
  );
};

export default Router;