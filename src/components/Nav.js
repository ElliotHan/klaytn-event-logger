import React from 'react'
import { connect } from 'react-redux'
import Dropdown from 'components/Dropdown'

import * as contractActions from 'redux/actions/contract'

import './Nav.scss'

const Nav = ({ network, setNetwork }) => (
  <header className="Nav">
    <div className="Nav__inner">
      <h1 className="Nav__logo" >
        <div onClick={() => window.location.reload()}>
          <img
            src="images/klaytnEventLogger.png"
            alt="klaytnEventLogger"
          />
        </div>
      </h1>
      <div className="Nav__menus">
        <Dropdown
          className="Nav__dropdown"
          titleClassName="Nav__title"
          selectedItem={network}
          handleSelect={setNetwork}
          list={['Baobab Testnet', 'Cypress Mainnet']}
        />
      </div>
    </div>
  </header>
)

const mapStateToProps = (state) => ({
  network: state.contract.network,
})

const mapDispatchToProps = (dispatch) => ({
  setNetwork: (network) => dispatch(contractActions.setNetwork(network)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
