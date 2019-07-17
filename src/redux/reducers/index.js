import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import contract from './contract'

const reducer = combineReducers({
  routing: routerReducer,
  contract,
})

export default reducer
