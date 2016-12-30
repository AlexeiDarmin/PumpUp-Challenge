import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { loadUserProfile, fetchPopularFeedPhotos, fetchUserFeedPhotos } from './actions'
import Home from './containers/Home'


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)


store.dispatch(loadUserProfile())
store.dispatch(fetchPopularFeedPhotos())
store.dispatch(fetchUserFeedPhotos())

render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
)
