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
import RewardAlert from '../alerts/rewardAlert.js';
import Alert from '../alert.js';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';




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


class FollowerRewardClaimBlockCheck extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: '',
      address: '',
      privateKey: '',
      web3: null
    }
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handlePostChange = this.handlePostChange.bind(this);
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

  handlePostChange(event) {
    this.setState({post: event.target.value});
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

          whaleNetworkInstance.getPostTimeStamp(this.state.post).then((block) => {
          console.log(block)
          whaleNetworkInstance.FollowerAdded(
            {postid:this.state.post},
            { fromBlock:block.toNumber(), toBlock: block.toNumber()+10000 }).get((error, followers) => {
              if (error)
                console.log('Error in myEvent event handler: ' + error);
              else
              console.log(followers)
          console.log(followers)
          var items = followers.sort(function(obj, obj2) { return obj2.blockNumber - obj.blockNumber})

          console.log(block)
          ReactDOM.render(  <div><Grid item xs={12}>
            <Paper className={this.props.classes.tableroot}>
    <Table className={this.props.classes.table}>
      <TableHead>
        <TableRow>
          <TableCell><h2>Followers</h2></TableCell>
<TableCell><h2>Total: {items.length}</h2></TableCell>
<TableCell><h2>Claimable At {block.toNumber()+10000}</h2></TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {items.map(item => {
          return (
            <TableRow key={item.transactionHash}>
              <TableCell>follower: {item.args.follower} <br></br> Block: {item.blockNumber} <br></br>Moderator: {item.args.moderator} </TableCell>

            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Paper>
          </Grid></div>
        , document.getElementById('follower_logs'));})})
        // Stores a given value, 5 by default


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
                <TextField fullWidth label="Enter Post ID" value={this.state.post} onChange={this.handlePostChange} />

                </Grid>

              <Grid item xs={12}>
                <Button raised type="submit" color="primary">Check Post!</Button>

                </Grid>
                </Grid>
                </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(FollowerRewardClaimBlockCheck);
