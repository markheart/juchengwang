import tabbarReducer from './tabbarReducer'
import CitylistReducer from './citylistreducer' 
import { combineReducers } from 'redux'
import cinemaReducer from './cinemaReducer'
import pageTitleReducer from './pageTitle'
import searchReducer from './searchReducer'
import DetailReducer from './detailreducer'
import CinematitleReducer from './cinemtitleReducer'

const reducer = combineReducers({
    tabbarReducer,
    CitylistReducer,
    pageTitleReducer,
    cinemaReducer,
    searchReducer,
    DetailReducer,
    CinematitleReducer
})
    


export default reducer