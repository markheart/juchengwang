import tabbarReducer from './tabbarReducer'
import CitylistReducer from './citylistreducer' 
import { combineReducers } from 'redux'
import pageTitleReducer from './pageTitle'
import DetailReducer from './detailreducer'

const reducer = combineReducers({
    tabbarReducer,
    CitylistReducer,
    pageTitleReducer,
    DetailReducer
    
})

export default reducer