import React, {Component} from 'react'
import WhaleNetworkV2 from '../../build/contracts/WhaleNetworkV2.json'
import WhaleRewardsV2 from '../../build/contracts/WhaleRewardsV2.json'
import getWeb3 from '../utils/getWeb3'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'
import {keystore, txutils} from 'eth-lightwallet'
import tx from 'ethereumjs-tx'
import Header from './header.js'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Alert from './alert.js';
import Error from './error.js';



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


class WhaleStats extends Component {
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
    const whaleNetwork = contract(WhaleNetworkV2)
    const whaleRewards = contract(WhaleRewardsV2)
    whaleRewards.setProvider(this.state.web3.currentProvider)
    whaleNetwork.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var whaleRewardsInstance
    var whaleNetworkInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      whaleRewards.at('0xEcd72a8546a9a306A31Ee143aaD5486F5aB5400b').then((instance) => {
        whaleRewardsInstance = instance

        // Stores a given value, 5 by default.
        return whaleRewardsInstance.getNetworkAddress()
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log(result)
        whaleNetworkInstance = whaleNetwork.at(result);
        var networkBalance = this.state.web3.eth.getBalance('0xEcd72a8546a9a306A31Ee143aaD5486F5aB5400b')
        console.log(networkBalance)
        var whaleBalance = this.state.web3.eth.getBalance(this.state.address)
        console.log(whaleBalance)
        var whaleShare
        var networkShares
        var claimedShare
        whaleNetworkInstance.getWhaleShares(this.state.address).then((res) => {
          console.log(res)
          whaleShare = res.toNumber()
          whaleNetworkInstance.networkShares().then((nshare) => {
            networkShares = nshare.toNumber()
            whaleRewardsInstance.claimedShare(this.state.address).then((cShare) => {
              claimedShare = cShare.toNumber()
              whaleNetworkInstance.getWhaleLastBlockShared(this.state.address).then((bShare) => {
                var lastBlockShared = bShare.toNumber()
                                var shareDiff = (this.state.web3.eth.getBlock('latest').number - lastBlockShared)
                var estimatedBalance = (shareDiff*networkBalance)/networkShares

        ReactDOM.render(
          <MuiThemeProvider>
          <div>
          {<Header/>}
          <h1> Stats for {this.state.address}</h1>
          <Grid container spacing={24}>

            <Grid item xs={12} sm={3}>
              <Paper className={this.props.classes.paper}>
              <h3>Network Balance</h3>
              {networkBalance.toNumber()/1000000000000000000}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper className={this.props.classes.paper}>
              <h3> Whale Balance </h3>
              {whaleBalance.toNumber()/1000000000000000000}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper className={this.props.classes.paper}>
              <h3> Whale Share </h3>
              <p> Assuming 1000 whl not withdrawn since last claim </p>
              {whaleShare + shareDiff}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper className={this.props.classes.paper}>
              <h3> Network Share </h3>
              {networkShares}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={this.props.classes.paper}>
              <h3> Claimed Share </h3>
              {claimedShare}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={this.props.classes.paper}>
              <h3> Last Block Shared </h3>
              {lastBlockShared}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={this.props.classes.paper}>
              <h3> Current estimated unclaimed Balance </h3>
              <p> Assuming 1000 whl not withdrawn since last claim </p>
              {estimatedBalance/1000000000000000000}
              </Paper>
            </Grid>
          </Grid>
          </div>
        </MuiThemeProvider>, document.getElementById('root'));
      })
    })
  })
})
      })
    })
  }
  // renders the basic form in the root tab space
  render() {
    return (
      <MuiThemeProvider>
        <div>
        {<Header/>}
         <form onSubmit={this.handleSubmit}>
        <div className={this.props.classes.root}>
          <Grid container spacing={24}>
          <Grid item xs={12} >
            <TextField fullWidth label="Enter Whale Address" value={this.state.address} onChange={this.handleAddressChange} />
            </Grid>
              <Grid item xs={12}>
                <Button raised type="submit" color="primary">Check Stats!</Button>
                </Grid>
                </Grid>
                </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(WhaleStats);
