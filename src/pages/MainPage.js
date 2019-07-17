import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from 'components/Input'
import Button from 'components/Button'
import Textarea from 'components/Textarea'
import InputFile from 'components/InputFile'
import Caver from 'caver-js'
import download from 'components/Download'

import * as contractActions from 'redux/actions/contract'
import './Mainpage.scss'

class MainPage extends Component {
  state = {
    contractAddress: '',
    compiledJSON: '',
    contractAbi: {},
    filter: 'allEvents',
    fromBlock: '0',
    toBlock: 'latest',
    filename: '',
  }
  setAbi = (abi) => {
    if (abi.length > 0) {
      this.setState({ contractAbi: abi })
    } else {
      alert('Invalid ABI');
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleFileSelect = (e) => {
    const { files } = e.target // FileList object
    const filename = files[0].name
    this.setState({ filename })
    this.setState({ compiledJSON: files[0].name })
    this.handleJSON(files[0], this.setAbi)
  }

  handleJSON = (file, setAbi) => {
    const reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function () {
      return function (e) {
        try {
          const json = JSON.parse(e.target.result);
          if (json.abi) {
            setAbi(json.abi)
          } else {
            alert('Contract ABI does not exist in the file');
          }
        } catch (err) {
          alert(err);
        }
      }
    })(file);
    reader.readAsText(file);
  }

  downloadJson = () => {
    if (this.props.events == null) {
      alert('There is nothing to download yet, please get event logs first');
    } else {
      download(JSON.stringify(this.props.events), 'events_' + this.state.filename, 'application/json')
    }
  }

  render() {
    const {
      contractAddress, contractAbi, filter, fromBlock, toBlock,
    } = this.state
    return (
      <main className="MainPage">
        <Input
          className="MainPage__address"
          name="contractAddress"
          label="Contract Address"
          value={this.state.contractAddress}
          onChange={this.handleChange}
        />
        <InputFile
          className="MainPage__json"
          name="compiledJSON"
          label="Compiled JSON file"
          fileName={this.state.compiledJSON}
          onChange={this.handleFileSelect}
          required
        />
        <Input
          className="MainPage__filter"
          name="filter"
          label="Event Name"
          value={this.state.filter}
          onChange={this.handleChange}
        />
        <Input
          className="MainPage__fromBlock"
          name="fromBlock"
          label="From Block"
          value={this.state.fromBlock}
          onChange={this.handleChange}
        />
        <Input
          className="MainPage__toBlock"
          name="toBlock"
          label="To Block"
          value={this.state.toBlock}
          onChange={this.handleChange}
        />
        <Button
          className="MainPage__getLogButton"
          title="Get Event Logs!"
          onClick={() =>
            this.props.getEvent(
              this.props.networkUrl,
              contractAddress,
              contractAbi,
              filter,
              fromBlock,
              toBlock)}
        />
        <Textarea
          className="MainPage__output"
          name="events"
          value={this.props.parsedEvents}
          label="Event Logs"
          onChange={this.handleInputChange}
          placeholder="Parsed Event Logs will be shown here!"
          readOnly
        />
        <Button
          className="MainPage__downloadButton"
          title="Download Raw Event Logs!"
          onClick={this.downloadJson}
        />
      </main>
    )
  }
}

const parseEvents = (events) => {
  const cav = new Caver()
  let output = ''
  if (events) {
    events.forEach((e) => {
      const name = 'Name   : ' + e.event
      const blockNumber = 'Block# : ' + e.blockNumber
      const txHash = 'TxHash: ' + e.transactionHash
      
      let parsedValues = ''

      for (let [key, value] of Object.entries(e.returnValues)) {
        if (isNaN(parseInt(key))) {
          if (key == 'value') {
            //value일때 KLAY 단위로 변경해서 보여달라는 요청사항 있었음
            parsedValues = parsedValues.concat('\t', key + ' : ' + cav.utils.fromPeb(value) + ' KLAY', '\n')
          } else {
            parsedValues = parsedValues.concat('\t', key + ' : ' + value, '\n')
          }
        }
      }

      //제대로된 abi가 아닐 경우
      if (!parsedValues) parsedValues = JSON.stringify(e.returnValues)
      output = output.concat(name, '\n')
      output = output.concat(blockNumber, '\n')
      output = output.concat(txHash, '\n')
      output = output.concat('Values : ', '\n',  parsedValues, '\n')
      output = output.concat('\n\n')
    })
  }
  return output
}

const mapStateToProps = (state) => ({
  networkUrl: state.contract.networkUrl,
  events: state.contract.events,
  parsedEvents: parseEvents(state.contract.events),
})

const mapDispatchToProps = (dispatch) => ({
  getEvent: (networkUrl, contractAddress, contractAbi, filter, fromBlock, toBlock) =>
    dispatch(contractActions.getEvent(
      networkUrl,
      contractAddress,
      contractAbi,
      filter,
      fromBlock,
      toBlock)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
