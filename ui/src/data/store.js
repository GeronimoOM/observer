import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import reducer from '../reducers/reducer'

export const history = createBrowserHistory()

export const store = createStore(
	connectRouter(history)(reducer),
	applyMiddleware(
		routerMiddleware(history),
		thunk,
		logger
	)
)