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
import PostAlert from '../alerts/postAlert.js';




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


class AddPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      whale: '',
      address: '',
      post: '',
      privateKey: '',
      web3: null
    }
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);
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

  handlePostChange(event) {
    this.setState({post: event.target.value});
  }

  handleWhaleChange(event) {
    this.setState({whale: event.target.value});
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
        return whaleRewardsInstance.getNetworkAddress.call({from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log(result)
        whaleNetwork.at(result).then((whaleNet) => {
            whaleNetworkInstance = whaleNet;
        var address = this.state.address
        var whale = this.state.whale
        whaleNetworkInstance.numPosts().then((postid) => {
        var txOptions = {
          nonce: this.state.web3.toHex(this.state.web3.eth.getTransactionCount(this.state.address)),
          gasLimit: this.state.web3.toHex(2000000),
          gasPrice: this.state.web3.toHex(20000000000),
          to: result,
          from: this.state.address
        }
        console.log(this.state.post, this.state.whale)

        var rawTx = txutils.functionTx(whaleNetworkInstance.abi, 'post',[this.state.post, this.state.whale], txOptions);
        console.log(1)
        var privateKey = new Buffer(this.state.privateKey, 'hex');
        var transaction = new tx(rawTx);
        console.log(2)
        transaction.sign(privateKey);
        console.log(3)
        var serializedTx = transaction.serialize().toString('hex');
        console.log(serializedTx)
        var posts = []
        this.state.web3.eth.sendRawTransaction('0x' + serializedTx, function(err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            whaleNetworkInstance.Posted({author:whale, id:postid},
            { fromBlock:0, toBlock: 'latest' }).get((error, eventResult) => {
    if (error)
      console.log('Error in myEvent event handler: ' + error);
    else
              if (error) {
                console.log(error);
              } else {
                var data = eventResult[0]
              ReactDOM.render(
              <div>{<PostAlert result={result.toString()} id={data.args.id.toNumber()} author={data.args.author} title={data.args.title}/>}</div>, document.getElementById('result'));}
            })

          }
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
        <div>

          <form onSubmit={this.handleSubmit}>
          <div className={this.props.classes.root}>

          <Grid container spacing={24}>
          <Grid item xs={12} >
            <TextField fullWidth label="Enter Moderator Address" value={this.state.address} onChange={this.handleAddressChange} />

            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Enter private key for address" value={this.state.privateKey} onChange={this.handleKeyChange} />

              </Grid>
              <Grid item xs={12} >
                <TextField fullWidth label="Enter Whale Address" value={this.state.whale} onChange={this.handleWhaleChange} />

                </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Title your Post" value={this.state.post} onChange={this.handlePostChange} />

                </Grid>
              <Grid item xs={12}>
                <Button raised type="submit" color="primary">Create Post</Button>

                </Grid>
                </Grid>
                </div>
          </form>
        </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(AddPost);
