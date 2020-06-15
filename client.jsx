import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ErrorPage from './pages/Error'
import MajorsPage from './pages/Majors'
import MastersPage from './pages/MastersPage'
import OpenPage from './pages/Open'
import PgaPage from './pages/PgaPage'
import UsOpenPage from './pages/UsOpen'


render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={MajorsPage} />
      <Route exact path='/majors/1' component={MastersPage} />
      <Route exact path='/majors/2' component={OpenPage} />
      <Route exact path='/majors/3' component={PgaPage} />
      <Route exact path='/majors/4' component={UsOpenPage} />
      <Route path='*' component={ErrorPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
