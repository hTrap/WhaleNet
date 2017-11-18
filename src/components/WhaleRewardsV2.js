
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import React, {Component} from 'react'
import WhaleNetworkV2 from '../../build/contracts/WhaleNetworkV2.json'
import WhaleRewardsV2 from '../../build/contracts/WhaleRewardsV2.json'
import getWeb3 from '../utils/getWeb3'
import Button from 'material-ui/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'
import RewardClaimBlockCheck from '../components/forms/RewardClaimBlockCheck.js'
import RewardClaimV2 from '../components/forms/RewardClaimV2.js'
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


class whaleRewardsV2 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }





  render() {




    return (
      <MuiThemeProvider>
          <div>
          {< Header />}

          <h1 className={this.props.classes.paper}>My Whale Rewards</h1>
          <div className={this.props.classes.root}>

          <Grid container spacing={24}>


            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              {<RewardClaimBlockCheck/>}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              {<RewardClaimV2/>}
              </Paper>
            </Grid>
          </Grid>
          </div>
          </div>

      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(whaleRewardsV2);
