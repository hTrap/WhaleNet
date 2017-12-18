import React, {Component} from 'react'
import WhaleNetworkV4 from '../../build/contracts/WhaleNetworkV4.json'
import WhaleRewardsV4 from '../../build/contracts/WhaleRewardsV4.json'
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
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';


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


class FollowerStats extends Component {
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
      const contract = require('truffle-contract')
      const whaleNetwork = contract(WhaleNetworkV4)
      const whaleRewards = contract(WhaleRewardsV4)
      whaleRewards.setProvider(this.state.web3.currentProvider)
      whaleNetwork.setProvider(this.state.web3.currentProvider)

      // Declaring this for later so we can chain functions on SimpleStorage.
      var whaleRewardsInstance
      var whaleNetworkInstance

      // Get accounts.
      this.state.web3.eth.getAccounts((error, accounts) => {
        whaleRewards.deployed().then((instance) => {
          whaleRewardsInstance = instance



      })
    })
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
    const whaleNetwork = contract(WhaleNetworkV4)
    const whaleRewards = contract(WhaleRewardsV4)
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
        return whaleRewardsInstance.getNetworkAddress()
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log(result)
        whaleNetworkInstance = whaleNetwork.at(result)
        whaleNetworkInstance.FollowerAdded(
          {follower:this.state.address},
          { fromBlock:0, toBlock: 'latest' }).get((error, eventResult) => {
  if (error)
    console.log('Error in myEvent event handler: ' + error);
  else
  whaleNetworkInstance.FollowerAdded(
    {whale:this.state.address},
    { fromBlock:0, toBlock: 'latest' }).get((error, followers) => {
      if (error)
        console.log('Error in myEvent event handler: ' + error);
      else
      console.log(followers)
  console.log(eventResult)
  var items = eventResult.sort(function(obj, obj2) { return obj2.blockNumber - obj.blockNumber})



        ReactDOM.render(
          <MuiThemeProvider>
          <div>
          {<Header/>}
          <h1> Stats for {this.state.address}</h1>
          <Grid container spacing={24}>

            <Grid item xs={12} sm={6}>
            <list>
            <h3>Posts Followed</h3>
            {items.map(item => (
              <ListItem button key={`${item.transactionHash}`}>
              <Paper className={this.props.classes.paper}>

                <ListItemText primary={`ID: ${item.args.postid}`} secondary={`Block No :${item.blockNumber}`} />
                </Paper>
              </ListItem>
            ))}
            </list>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Paper className={this.props.classes.paper}>

              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={this.props.classes.paper}>

              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={this.props.classes.paper}>

              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>

            </Grid>
          </Grid>
          </div>
        </MuiThemeProvider>, document.getElementById('root'));
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
            <TextField fullWidth label="Enter Follower Address" value={this.state.address} onChange={this.handleAddressChange} />
            </Grid>
              <Grid item xs={12}>
                <Button raised type="submit" color="primary">Check Stats!</Button>
                </Grid>
                </Grid>
                </div>
          </form>
          <div id='claims'></div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(FollowerStats);
