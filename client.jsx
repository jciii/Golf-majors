import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ErrorPage from './pages/Error'
import MajorsPage from './pages/Majors'
import WinnersPage from './pages/Winners'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MajorsPage} />
      <Route path="/winners" component={WinnersPage} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
