import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AppLayout from './AppLayout'

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' component={ AppLayout } />
      </Switch>
    </div>
  );
}
export default App
