import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropdown from 'components/Dropdown'
import Button from 'components/Button'

import * as contractActions from 'redux/actions/contract'

import './Network.scss'

class Network extends Component {
  state = {
    network: '',
  }

  selectNetwork = (network) => this.setState({ network })

  render() {
    const { network } = this.state
    const networkList = ['Baobab Testnet', 'Cypress Mainnet']
    return (
      <div className="Network">
        <h2 className="Network__h2">
          Klaytn web-based event logger <br />
          One click...      Boom!
        </h2>
        <h1 className="Network__h1">
          <img src="images/klaytnEventLogger.png" alt="klaytnEventLogger" />
        </h1>
        <Dropdown
          className="Network__dropdown"
          placeholder="Select Klaytn network"
          selectedItem={network}
          handleSelect={this.selectNetwork}
          list={networkList}
        />
        <Button
          className="Network__button"
          title="Start"
          onClick={() => this.props.setNetwork(network)}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNetwork: (network) => dispatch(contractActions.setNetwork(network)),
})

export default connect(null, mapDispatchToProps)(Network)
