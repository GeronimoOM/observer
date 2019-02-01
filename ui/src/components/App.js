import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AppLayout from './AppLayout'

const App = () => {
  return (
    <Switch>
      <Route path='/' component={AppLayout} />
    </Switch>
  );
}
export default App
