import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Home,
  KYC,
  KYCRegister,
  KycThankYou,
  KYCPending,
  Identity,
  Checkout,
  CheckoutSuccess,
} from './pages';

const useStyles = makeStyles((theme) => ({
  container: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
  },
}));

function App() {
  const { container } = useStyles();
  return (
    <div className={container}>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Redirect exact from="/" to="/kyc" /> */}
        <Redirect exact from="/kyc/register" to="/kyc/register/1" />
        <Route path="/kyc/checkout/success" component={CheckoutSuccess} />
        <Route path="/kyc/checkout" component={Checkout} />
        <Route path="/kyc/register/success" component={Identity} />
        <Route path="/kyc/register/failed" component={Identity} />
        <Route path="/kyc/register/pending" component={KYCPending} />
        <Route path="/kyc/register/:id" component={KYCRegister} />
        <Route path="/kyc" component={Identity} />
        <Redirect exact from="/precheck/kyc" to="/precheck/kyc/1" />
        <Route exact path="/precheck/kyc/5" component={KycThankYou} />
        <Route path="/precheck/kyc/:id" component={KYC} />
      </Switch>
    </div>
  );
}

export default App;
