
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import React, {Component} from 'react'
import WhaleNetwork from '../../build/contracts/WhaleNetwork.json'
import WhaleRewards from '../../build/contracts/WhaleRewards.json'
import getWeb3 from '../utils/getWeb3'
import Button from 'material-ui/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'
import RewardCheck from '../components/forms/rewardCheck.js'
import RewardClaim from '../components/forms/rewardClaim.js'
import RewardDist from '../components/forms/rewardDist.js'
import Header from '../components/header.js'
import TextField from 'material-ui/TextField';




const styles  = {
  root: {
    flexGrow: 1,
    marginTop: 30,
    marginLeft:"50px",
    marginRight:"50px"
  },
  paper: {
    padding: 16,
    textAlign: 'center',
  },
};


class FollowerAccount extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
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
      <div>}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }
  render() {




    return (
      <MuiThemeProvider>
          <div>
          {< Header />}

          <h1 className={this.props.classes.paper}>My Whale Account</h1>
          <center><h2><b>Reward Checking and Claiming Temporarilly Disabled as We Upgrade The Network -- Block 201,390</b></h2 ></center>
          <div className={this.props.classes.root}>

          <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Paper className={this.props.classes.paper}>

            {<RewardClaim/>}
            </Paper>
          </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>

              {}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              {}
              </Paper>
            </Grid>
          </Grid>
          </div>
          </div>

      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(FollowerAccount);
