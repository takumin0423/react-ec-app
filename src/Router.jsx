import React from 'react';
import {Switch, Route} from 'react-router';
import {Home, PasswordReset, ProductEdit, SignIn, SignUp} from './pages';
import Auth from './Auth';

const Router = () => {
  return (
      <Switch>
        <Route exact path={'/signup'} component={SignUp}/>
        <Route exact path={'/signin'} component={SignIn}/>
        <Route exact path={'/reset'} component={PasswordReset}/>

        <Auth>
          <Route exact path={'(/)?'} component={Home}/>
          <Route exact path={'/product_edit'} component={ProductEdit}/>
        </Auth>
      </Switch>
  );
};

export default Router;