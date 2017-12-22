
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import React, {Component} from 'react'
import WhaleNetworkV4 from '../../build/contracts/WhaleNetworkV4.json'
import WhaleRewardsV4 from '../../build/contracts/WhaleRewardsV4.json'
import getWeb3 from '../utils/getWeb3'
import Button from 'material-ui/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'
import AddModerator from '../components/forms/AddModerator.js'
import AddPost from '../components/forms/AddPost.js'
import Header from '../components/header.js'
import TextField from 'material-ui/TextField';
import FollowerRewardClaimBlockCheck from '../components/forms/FollowerRewardClaimBlockCheck.js'
import FollowerRewardClaimV4 from '../components/forms/FollowerRewardClaimV4.js'
import FollowerRewardClaimAllPosts from '../components/forms/FollowerRewardClaimAllPosts.js'



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


class FollowerSocial extends Component {
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

  render() {




    return (
      <MuiThemeProvider>
      <div>
      {< Header />}

      <h1 className={this.props.classes.paper}>My Follower Rewards</h1>
      <div className={this.props.classes.root}>

      <Grid container spacing={24}>


        <Grid item xs={12} sm={6}>
          <Paper className={this.props.classes.paper}>
          {<FollowerRewardClaimBlockCheck/>}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={this.props.classes.paper}>
          {<FollowerRewardClaimV4/>}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={this.props.classes.paper}>
          <h2>Multi Claim</h2>
          {<FollowerRewardClaimAllPosts/>}
          </Paper>
        </Grid>
      </Grid>
      </div>
      </div>

      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(FollowerSocial);
