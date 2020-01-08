
import {createStore,applyMiddleware,compose} from 'redux'
import reducer from './Reducers'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(reduxPromise,reduxThunk)))
export default store