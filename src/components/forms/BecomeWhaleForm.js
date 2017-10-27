import React, {Component} from 'react'
import WhaleNetwork from '../../../build/contracts/WhaleNetwork.json'
import WhaleRewards from '../../../build/contracts/WhaleRewards.json'
import getWeb3 from '../../utils/getWeb3'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'
import {keystore, txutils} from 'eth-lightwallet'
import tx from 'ethereumjs-tx'
import Header from '../header.js'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';





const styles  = {
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
  },
};


class BecomeWhaleForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
      privateKey: '',
      web3: null
    }
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3.then(results => {
      this.setState({web3: results.web3})
      // Instantiate contract once web3 provided.
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  // on change of form values these states are updatd
  handleKeyChange(event) {
    this.setState({privateKey: event.target.value});
  }

  handleAddressChange(event) {
    this.setState({address: event.target.value});
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
        var txOptions = {
          nonce: this.state.web3.toHex(this.state.web3.eth.getTransactionCount(this.state.address)),
          gasLimit: this.state.web3.toHex(800000),
          gasPrice: this.state.web3.toHex(20000000000),
          to: whaleNetworkInstance.address,
          value: 5555
        }
        var rawTx = txutils.functionTx(whaleNetworkInstance.abi, 'becomeWhale', this.state.address, txOptions);
        var privateKey = new Buffer(this.state.privateKey, 'hex');
        var transaction = new tx(rawTx);
        transaction.sign(privateKey);
        var serializedTx = transaction.serialize().toString('hex');
        this.state.web3.eth.sendRawTransaction('0x' + serializedTx, function(err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            ReactDOM.render(
              <div>{result.toString()}</div>, document.getElementById('root'));
          }
        })

      })
    })
  }
  // renders the basic form in the root tab space
  render() {
    return (
      <MuiThemeProvider>
        <div>

          <form onSubmit={this.handleSubmit}>
          <div className={this.props.classes.root}>

          <Grid container spacing={24}>
          <Grid item xs={12} >
            <TextField fullWidth label="Enter you WhaleCoin address holding 1000 WHL" value={this.state.address} onChange={this.handleAddressChange} />

            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Enter the private key for this address" value={this.state.privateKey} onChange={this.handleKeyChange} />

              </Grid>
              <Grid item xs={12}>
                <Button raised type="submit" color="primary">Become a Whale!</Button>

                </Grid>
                </Grid>
                </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(BecomeWhaleForm);