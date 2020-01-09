import tabbarReducer from './tabbarReducer'
import CitylistReducer from './citylistreducer' 
import { combineReducers } from 'redux'
import cinemaReducer from './cinemaReducer'
const reducer = combineReducers({
    tabbarReducer,
    CitylistReducer,
    cinemaReducer
})

export default reducer