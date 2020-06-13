import React from 'react'
import Masters from './Masters'
import Open from './Open'
import Pga from './Pga'
import UsOpen from './UsOpen'
import { Route, BrowserRouter } from 'react-router-dom'
export default () => {

  return (
    <>
      <div>Golf's Four Major Championships</div>
      <Masters />
      <Open />
    </>

  )
}

{/* <>
  <div>Golf's Four Major Championships</div>
  <div class="container">
    <BrowserRouter>
      <Switch>
        <Route path="/api/masters" component={Masters}>The Masters</Route>
        <Route path="/api/open" component={Open}>The Open</Route>
      </Switch>
    </BrowserRouter>
  </div>
</> */}