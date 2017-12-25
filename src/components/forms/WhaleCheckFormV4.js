import React, {Component} from 'react'
import WhaleNetworkV4 from '../../../build/contracts/WhaleNetworkV4.json'
import WhaleRewardsV4 from '../../../build/contracts/WhaleRewardsV4.json'
import getWeb3 from '../../utils/getWeb3'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'
import Alert from '../alert.js'
import Grid from 'material-ui/Grid';

class WhaleCheckFormV4 extends Component {
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

    getWeb3.then(results => {
      this.setState({web3: results.web3})
      // Instantiate contract once web3 provided.
    }).catch(() => {
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
        whaleNetworkInstance = whaleNetwork.at(result);
        return whaleNetworkInstance.isWhale.call(this.state.value, {from: accounts[0]})
      }).then((result) => {

        ReactDOM.render(
          <div>{<Alert result={result.toString()}/>}</div>, document.getElementById('result'));
      })
    })
  }
  // renders the basic form in the root tab space
  render() {
    return (
      <MuiThemeProvider>
      <div>
      <form onSubmit={this.handleSubmit}>
      <Grid container spacing={24}>
      <Grid item xs={12} >
          <TextField id="check" fullWidth label="WhaleCoin Address" value={this.state.value} onChange={this.handleChange}/>
        </Grid>
        <Grid item xs={12} >
        <Button raised type="submit" color="primary">Check Whale</Button>
        </Grid>
        </Grid>

      </form>
      </div>
      </MuiThemeProvider>

    );
  }
}
export default WhaleCheckFormV4
