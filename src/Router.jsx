import React from 'react';
import {Switch, Route} from 'react-router';

const Router = () => {
  return (
      <Switch>
        <Route exact path={'/login'}/>
        <Route exact path={'(/)?'}/>
      </Switch>
  );
};

export default Router;