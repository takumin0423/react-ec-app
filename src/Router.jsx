import React from 'react';
import {Switch, Route} from 'react-router';
import Auth from './Auth';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PasswordReset from './pages/PasswordReset';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import ProductDetail from './pages/ProductDetail';
import CartList from './pages/CartList';
import OrderConfirm from './pages/OrderConfirm';


const Router = () => {
  return (
      <Switch>
        <Route exact path={'/signup'} component={SignUp}/>
        <Route exact path={'/signin'} component={SignIn}/>
        <Route exact path={'/reset'} component={PasswordReset}/>

        <Auth>
          <Route exact path={'(/)?'} component={ProductList}/>
          <Route exact path={'/product/:id'} component={ProductDetail}/>
          <Route path={'/product/edit(/:id)?'} component={ProductEdit}/>

          <Route exact path="/cart" component={CartList} />
          <Route exact path={'/order/confirm'} component={OrderConfirm}/>
        </Auth>
      </Switch>
  );
};

export default Router;