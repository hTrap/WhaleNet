import React, {Component} from 'react'
import WhaleNetwork from '../build/contracts/WhaleNetwork.json'
import WhaleRewards from '../build/contracts/WhaleRewards.json'
import getWeb3 from './utils/getWeb3'
import Button from 'material-ui/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import BecomeWhaleForm from './components/forms/BecomeWhaleForm.js'
import Header from './components/header.js'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

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

    getWeb3.then(results => {
      this.setState({web3: results.web3})

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    }).catch(() => {
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
        whaleNetworkInstance = whaleNetwork.at(result);

        return whaleNetworkInstance.getNumberWhales.call({from: accounts[0]})
      }).then((result) => {
        // Update state with the result.
        return this.setState({storageValue: result.c[0]})
      })
    })
  }

  onChange(i, value, tab, ev) {
    console.log(arguments);
  }

  onActive(tab) {
    console.log(arguments);
  }
  handleSubmit(event) {
    event.preventDefault();
    ReactDOM.render(
      <MuiThemeProvider>
      <div>{< BecomeWhaleForm />}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }
  render() {
    return (
      <MuiThemeProvider>

        <div>
          {< Header />}

          <div>
            <Grid container spacing={24}>

              <Grid item xs={6} sm={3}>
                <Paper>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <Button raised type="submit" color="primary">Go</Button>
                  </form>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <Button raised type="submit" color="primary">Go</Button>
                  </form>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <Button raised type="submit" color="primary">Go</Button>
                  </form>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <Button raised type="submit" color="primary">Go</Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App
