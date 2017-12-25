
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
import BecomeWhaleForm from '../components/forms/BecomeWhaleForm.js'
import WhaleAccountV4 from './WhaleAccountV4.js'
import WhaleRewardsV4 from './WhaleRewardsV4.js'
import WhaleStatsV4 from './WhaleStatsV4.js'
import SocialNetwork from './SocialNetwork.js'

import Header from '../components/header.js'




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


class ActionGridV4 extends Component {
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
      <div>{< WhaleAccountV4 />}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }

  handleSubmitReward(event) {
    event.preventDefault();
    ReactDOM.render(
      <MuiThemeProvider>
      <div>{< WhaleRewardsV4 />}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }

  handleSubmitStats(event) {
    event.preventDefault();
    ReactDOM.render(
      <MuiThemeProvider>
      <div>{< WhaleStatsV4 />}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }
  handleSubmitSocial(event) {
    event.preventDefault();
    ReactDOM.render(
      <MuiThemeProvider>
      <div>{<SocialNetwork/>}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }

  render() {




    return (
      <MuiThemeProvider>


          <div className={this.props.classes.root}>
          <Grid container spacing={24}>

          <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              <h1>My Whale Account</h1>
              <br></br>
              <p>Become a Whale/Stop Being a Whale</p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <Button raised type="submit" color="primary">Go</Button>
                </form>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              <h1>My Whale Rewards</h1>
              <br></br>
              <p>Check/Claim your Whale Rewards</p>
            <form onSubmit={this.handleSubmitReward.bind(this)}>
              <Button raised type="submit" color="primary">Go</Button>
            </form>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              <h1>My Whale Stats</h1>
              <br></br>
              <p>Experimental</p>
            <form onSubmit={this.handleSubmitStats.bind(this)}>
              <Button raised type="submit" color="primary">Go</Button>
            </form>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              <h1>Social Network</h1>
              <br></br>
              <p>Moderator and Follower Actions</p>
            <form onSubmit={this.handleSubmitSocial.bind(this)}>
              <Button raised type="submit" color="primary">Go</Button>
            </form>
            </Paper>
            </Grid>
          </Grid>

          </div>

      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(ActionGridV4);
