import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Print from './Print'


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/print' component={Print}/>
    </Switch>
  </main>
)

export default Main
