import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { history, store } from './data/store'
import App from './components/App'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> 
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
