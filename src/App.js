import React, { Component } from 'react'
import WhaleNetwork from '../build/contracts/WhaleNetwork.json'
import WhaleRewards from '../build/contracts/WhaleRewards.json'
import getWeb3 from './utils/getWeb3'
import {Tabs, Tab} from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'
import {keystore, txutils} from 'eth-lightwallet'
import util from 'ethereumjs-util'
import tx from 'ethereumjs-tx'





import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


class WhaleCheckForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      web3: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      // Instantiate contract once web3 provided.
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }



		// on change of form values these states are updatd
	  handleChange(event) {
	    this.setState({value: event.target.value});
	  }


// on form submit this is the action called
  handleSubmit(event) {
    event.preventDefault();
    event.preventDefault();
    const contract = require('truffle-contract')
    const whaleNetwork = contract(WhaleNetwork)
    const whaleRewards = contract(WhaleRewards)
    whaleRewards.setProvider(this.state.web3.currentProvider)
    whaleNetwork.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var whaleRewardsInstance
    var whaleNetworkInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      whaleRewards.deployed().then((instance) => {
        whaleRewardsInstance = instance

        // Stores a given value, 5 by default.
        return whaleRewardsInstance.getNetworkAddress.call({from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log(result)
           whaleNetworkInstance = whaleNetwork.at(result );
           return whaleNetworkInstance.isWhale.call(this.state.value, {from:accounts[0]})
      }).then((result) => {

      ReactDOM.render(<div>{result.toString()}</div>, document.getElementById('result'));
    })})
  }
	// renders the basic form in the root tab space
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <TextField id="check" label="WhaleCoin Address"
      	value={this.state.value}
      	onChange={this.handleChange}
      	floatingLabelText="WhaleCoin Address" />
        <RaisedButton type="submit" color="primary">Check</RaisedButton>
      </form>

    );
  }
}

class WhaleNumberForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      // Instantiate contract once web3 provided.
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }




  handleSubmit(event) {
    event.preventDefault();
    const contract = require('truffle-contract')
    const whaleNetwork = contract(WhaleNetwork)
    const whaleRewards = contract(WhaleRewards)
    whaleRewards.setProvider(this.state.web3.currentProvider)
    whaleNetwork.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var whaleRewardsInstance
    var whaleNetworkInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      whaleRewards.deployed().then((instance) => {
        whaleRewardsInstance = instance

        // Stores a given value, 5 by default.
        return whaleRewardsInstance.getNetworkAddress.call({from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log(result)
           whaleNetworkInstance = whaleNetwork.at(result );
           return whaleNetworkInstance.getNumberWhales.call({from:accounts[0]})
      }).then((result) => {

      ReactDOM.render(<div>{result.toString()}</div>, document.getElementById('result'));
    })})


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <RaisedButton type="submit"  color="primary">Check Whale Count</RaisedButton>
      </form>

    );
  }
}

class BecomeWhaleForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      privateKey: '',
      web3: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      // Instantiate contract once web3 provided.
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }



		// on change of form values these states are updatd
	  handleChange(event) {
	    this.setState({privateKey: event.target.value});
	  }


// on form submit this is the action called
  handleSubmit(event) {
    event.preventDefault();
    event.preventDefault();
    const contract = require('truffle-contract')
    const whaleNetwork = contract(WhaleNetwork)
    const whaleRewards = contract(WhaleRewards)
    whaleRewards.setProvider(this.state.web3.currentProvider)
    whaleNetwork.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var whaleRewardsInstance
    var whaleNetworkInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      whaleRewards.deployed().then((instance) => {
        whaleRewardsInstance = instance

        // Stores a given value, 5 by default.
        return whaleRewardsInstance.getNetworkAddress.call({from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log(result)
           whaleNetworkInstance = whaleNetwork.at(result);
           var userAddress = '0x' + keystore._computeAddressFromPrivKey(this.state.privateKey)
           var txOptions = {
               nonce: this.state.web3.toHex(this.state.web3.eth.getTransactionCount(userAddress)),
               gasLimit: this.state.web3.toHex(800000),
               gasPrice: this.state.web3.toHex(20000000000),
               to: whaleNetworkInstance.address,
               value: 5555
           }
           var rawTx = txutils.functionTx(whaleNetworkInstance.abi, 'becomeWhale',userAddress, txOptions);
           var privateKey = new Buffer(this.state.privateKey, 'hex');
           var transaction = new tx(rawTx);
           transaction.sign(privateKey);
           var serializedTx = transaction.serialize().toString('hex');
           this.state.web3.eth.sendRawTransaction(
           '0x' + serializedTx, function(err, result) {
               if(err) {
                   console.log(err);
               } else {
                   console.log(result);
                   ReactDOM.render(<div>{result.toString()}</div>, document.getElementById('result'));

               }
           })


    })
  })
  }
	// renders the basic form in the root tab space
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      	<TextField label="Private Key"
      	value={this.state.privateKey} onChange={this.handleChange}
      	floatingLabelText="Private Key" />
        <RaisedButton type="submit" color="primary">Become Whale</RaisedButton>
      </form>

    );
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const whaleNetwork = contract(WhaleNetwork)
    const whaleRewards = contract(WhaleRewards)
    whaleRewards.setProvider(this.state.web3.currentProvider)
    whaleNetwork.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var whaleRewardsInstance
    var whaleNetworkInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      whaleRewards.deployed().then((instance) => {
        whaleRewardsInstance = instance

        // Stores a given value, 5 by default.
        return whaleRewardsInstance.getNetworkAddress.call({from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log(result)
			     whaleNetworkInstance = whaleNetwork.at(result );

           return whaleNetworkInstance.getNumberWhales.call({from:accounts[0]})
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  onChange(i, value, tab, ev) {
    console.log(arguments);
  }

  onActive(tab) {
    console.log(arguments);
  }

  render() {
    return (  <MuiThemeProvider>

      <Tabs onChange={this.onChange}>
        <Tab value="pane-1" label="Whale Status" onActive={this.onActive}>{<WhaleCheckForm/>}</Tab>
        <Tab value="pane-2" label="Whale Count">{<WhaleNumberForm/>}</Tab>
        <Tab value="pane-3" label="Become Whale">{<BecomeWhaleForm/>}</Tab>

      </Tabs>
    </MuiThemeProvider>
    );
  }
}



export default App
