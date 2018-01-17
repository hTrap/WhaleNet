import React, {Component} from 'react'
import WhaleNetworkV4 from '../../../build/contracts/WhaleNetworkV4.json'
import WhaleRewardsV4 from '../../../build/contracts/WhaleRewardsV4.json'
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
import WhaleModRewardAlert from '../alerts/WhaleModRewardAlert.js';
import Error from '../error.js';



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


class RewardClaimV4 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      whale: '',
      address: '',
      privateKey: '',
      web3: null
    }
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWhaleChange = this.handleWhaleChange.bind(this);
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

  handleWhaleChange(event) {
    this.setState({whale: event.target.value});
  }
  // on form submit this is the action called
  handleSubmit(event) {
    event.preventDefault()
    const contract = require('truffle-contract')
    const whaleNetwork = contract(WhaleNetworkV4)
    const whaleRewards = contract(WhaleRewardsV4)
    whaleRewards.setProvider(this.state.web3.currentProvider)
    whaleNetwork.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var whaleRewardsInstance
    var whaleNetworkInstance
    var whale = this.state.whale
    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      whaleRewards.at('0x0c0d7a5b34321e436ce826a5dd56a9121cd54c49').then((instance) => {
        whaleRewardsInstance = instance

        // Stores a given value, 5 by default.
        return whaleRewardsInstance.getNetworkAddress()
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log(result)
        whaleNetwork.at(result).then((whaleNetworkInstance) => {
          return whaleNetworkInstance.getWhaleNextBlockShared(this.state.whale)
        }).then((block) => {
          if (this.state.web3.eth.getBlock('latest').number >= block.toNumber()) {

        var blockBeforeTransaction = this.state.web3.eth.getBlock('latest').number
        var txOptions = {
          nonce: this.state.web3.toHex(this.state.web3.eth.getTransactionCount(this.state.address)),
          gasLimit: this.state.web3.toHex(2000000),
          gasPrice: this.state.web3.toHex(20000000000),
          to: whaleRewardsInstance.address,
          from: this.state.address
        }

        var rawTx = txutils.functionTx(whaleRewardsInstance.abi, 'claimReward',[this.state.whale], txOptions);
        console.log(1)
        var privateKey = new Buffer(this.state.privateKey, 'hex');
        var transaction = new tx(rawTx);
        console.log(2)
        transaction.sign(privateKey);
        console.log(3)
        var serializedTx = transaction.serialize().toString('hex');
        console.log(serializedTx)
        this.state.web3.eth.sendRawTransaction('0x' + serializedTx, function(err, result) {
          if (err) {
            console.log(err);
            ReactDOM.render(
              <div>{<Error/>}</div>, document.getElementById('result'));
          } else {
            console.log(result);
            whaleRewardsInstance.Claimed({whale:whale},
            { fromBlock:blockBeforeTransaction-5, toBlock: 'latest' }).get((error, eventResult) => {
    if (error)
      console.log('Error in myEvent event handler: ' + error);
    else {
              var data = eventResult[0]
              console.log(data)
              ReactDOM.render(
              <div>{<WhaleModRewardAlert moderator={data.args.moderator} moderatorReward={data.args.moderatorReward.toNumber()/1000000000000000000} followerReward={data.args.followerReward.toNumber()/1000000000000000000} result={result.toString()} whale={data.args.whale} reward={data.args.reward.toNumber()/1000000000000000000} />}</div>, document.getElementById('result'));}
            })
          }
        })}
        else {
          ReactDOM.render(
            <div>{<Error/>}</div>, document.getElementById('result'));
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
            <TextField fullWidth label="Enter Your Address" value={this.state.address} onChange={this.handleAddressChange} />

            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Enter private key for address" value={this.state.privateKey} onChange={this.handleKeyChange} />

              </Grid>
              <Grid item xs={12} >
                <TextField fullWidth label="Enter Whale Address" value={this.state.whale} onChange={this.handleWhaleChange} />

                </Grid>

              <Grid item xs={12}>
                <Button raised type="submit" color="primary">Claim Reward</Button>

                </Grid>
                </Grid>
                </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(RewardClaimV4);
