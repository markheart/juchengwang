import tabbarReducer from './tabbarReducer'
import CitylistReducer from './citylistreducer' 
import { combineReducers } from 'redux'
<<<<<<< HEAD
import pageTitleReducer from './pageTitle'

const reducer = combineReducers({
    tabbarReducer,
    CitylistReducer,
    pageTitleReducer
    
=======
import cinemaReducer from './cinemaReducer'
const reducer = combineReducers({
    tabbarReducer,
    CitylistReducer,
    cinemaReducer,
>>>>>>> cinema-syl
})

export default reducer