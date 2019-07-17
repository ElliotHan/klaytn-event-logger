import React from 'react'
import { connect } from 'react-redux'
import NetworkPage from 'pages/NetworkPage'
import MainPage from 'pages/MainPage'
import Footer from 'components/Footer'
import Nav from 'components/Nav'

import './App.scss'

const App = ({ isNetwork }) => (
  <div className="App">
    {isNetwork && <Nav />}
    {isNetwork ? <MainPage /> : <NetworkPage />}
    <Footer />
  </div>
)

const mapStateToProps = (state) => ({
  isNetwork: state.contract.network,
})

export default connect(mapStateToProps)(App)
