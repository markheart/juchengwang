import tabbarReducer from './tabbarReducer'
import CitylistReducer from './citylistreducer' 
import { combineReducers } from 'redux'
import cinemaReducer from './cinemaReducer'
import pageTitleReducer from './pageTitle'

const reducer = combineReducers({
    tabbarReducer,
    CitylistReducer,
    pageTitleReducer,
    cinemaReducer,

})
    


export default reducer