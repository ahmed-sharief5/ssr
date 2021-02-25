import React, {Fragment} from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Dashboard from "./containers/Dashboard";
import CreateInvestment from "./containers/CreateInvestment"

export default (
  <Fragment>
    <Route path="/" component={Dashboard} />
    <Route path="/create-investment" component={CreateInvestment} />
  </Fragment>
)
