import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Admin from './Admin'
import Print from './Print'
import Events from './Events'


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/admin' component={Admin}/>
      <Route path="/events" component={Events}/>
      <Route path='/print' component={Print}/>
    </Switch>
  </main>
)

export default Main
