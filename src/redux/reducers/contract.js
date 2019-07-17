import { SET_NETWORK } from 'redux/actions/actionTypes'
import { SET_EVENTS } from '../actions/actionTypes';

const initialState = {
  network: null,
  networkUrl: null,
  events: null,
}

const contractReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NETWORK:
      if (action.payload.network == 'Baobab Testnet') {
        return {
          ...state,
          network: action.payload.network,
          networkUrl: 'https://api.baobab.klaytn.net:8651',
        }
      }
      if (action.payload.network == 'Cypress Mainnet') {
        return {
          ...state,
          network: action.payload.network,
          networkUrl: 'https://api.cypress.klaytn.net:8651',
        }
      }
      return {
        ...state,
        network: action.payload.network,
      }
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload.events,
      }
    default:
      return state;
  }
}

export default contractReducer
