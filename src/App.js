import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

// const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'))
// const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'))
// const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'))

const LazyCheckout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const LazyAuth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const LazyOrders = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const App = props => {
  useEffect ( () => {
    props.onTryAutoSignup();
  }, [])

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <LazyAuth /> } />
      {/* <Route path="/auth" component={asyncAuth} /> */}
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated ) {
    routes = (
      <Switch>
        {/* <Route path="/checkout" component={asyncCheckout} /> */}
        <Route path="/checkout" render={() => <LazyCheckout />} />
        {/* <Route path="/orders" component={asyncOrders} /> */}
        <Route path="/orders" render={() => <LazyOrders />} />
        <Route path="/logout" component={Logout} />
        {/* <Route path="/auth" component={asyncAuth} /> */}
        <Route path="/auth" render={() => <LazyAuth />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>} >{routes}</Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
