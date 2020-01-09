import tabbarReducer from './tabbarReducer'
import CitylistReducer from './citylistreducer' 
import { combineReducers } from 'redux'
import pageTitleReducer from './pageTitle'

const reducer = combineReducers({
    tabbarReducer,
    CitylistReducer,
    pageTitleReducer
    
})

export default reducer