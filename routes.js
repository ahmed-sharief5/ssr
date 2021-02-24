import * as React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Dashboard from "./containers/Dashboard";
import CreateInvestment from "./containers/CreateInvestment"

export default (
  <Route path="/" component={App}>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/create-investment" component={CreateInvestment} />
  </Route>
)
