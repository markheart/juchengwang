import tabbarReducer from './tabbarReducer'
import CitylistReducer from './citylistreducer' 
import { combineReducers } from 'redux'
import pageTitleReducer from './pageTitle'
import cinemaReducer from './cinemaReducer'

const reducer = combineReducers({
    tabbarReducer,
    CitylistReducer,
    pageTitleReducer,
    cinemaReducer,
    
})

export default reducer