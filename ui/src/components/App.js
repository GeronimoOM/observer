import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MainLayout from './MainLayout'

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' component={MainLayout} />
      </Switch>
    </div>
  );
}
export default App
