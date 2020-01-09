import tabbarReducer from './tabbarReducer'
import CitylistReducer from './citylistreducer' 
import { combineReducers } from 'redux'

const reducer = combineReducers({
    tabbarReducer,
    CitylistReducer
})

export default reducer