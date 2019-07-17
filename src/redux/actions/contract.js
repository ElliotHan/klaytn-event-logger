import Caver from 'caver-js'
import { SET_NETWORK, SET_EVENTS } from './actionTypes'

export const setNetwork = (network) => ({
  type: SET_NETWORK,
  payload: { network },
})

export const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: { events },
})

export const getEvent = (
  networkUrl,
  contractAddress,
  contractAbi,
  filter,
  fromBlock,
  toBlock) => (dispatch) => {
  const caver = new Caver(networkUrl)
  if (Object.keys(contractAbi).length == 0) {
    alert('Need contract JSON file')
  } else {
    const contractInstance = new caver.klay.Contract(contractAbi, contractAddress)
    contractInstance.getPastEvents(filter, { fromBlock, toBlock }, function (error, events) {
      if (error) {
        alert(error)
      } else if (events.length == 0) {
        alert('Events not available, please double check contract address or network (baobab, cypress)')
      } else {
        dispatch(setEvents(events))
      }
    })
  }
}
