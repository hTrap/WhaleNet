
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
import WhaleSocial from './WhaleSocial.js'
import ModeratorSocial from './ModeratorSocial.js'
import FollowerSocial from './FollowerSocial.js'
import FollowerStats from './FollowerStats.js'
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


class SocialNetwork extends Component {
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
      <div>{< WhaleSocial />}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }

  handleSubmitModerator(event) {
    event.preventDefault();
    ReactDOM.render(
      <MuiThemeProvider>
      <div>{<ModeratorSocial/>}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }

  handleSubmitFollower(event) {
    event.preventDefault();
    ReactDOM.render(
      <MuiThemeProvider>
      <div>{<FollowerSocial/>}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }

  handleSubmitFollowerStats(event) {
    event.preventDefault();
    ReactDOM.render(
      <MuiThemeProvider>
      <div>{<FollowerStats/>}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }

  render() {




    return (
      <MuiThemeProvider>

          <div>
          {<Header/>}
          <div className={this.props.classes.root}>
          <Grid container spacing={24}>

          <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              <h1>Whale Actions</h1>
              <br></br>
              <p>Create Post and UpdateModerator</p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <Button raised type="submit" color="primary">Go</Button>
                </form>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              <h1>Moderator Actions</h1>
              <br></br>
              <p>Add Followers to Post</p>
            <form onSubmit={this.handleSubmitModerator.bind(this)}>
              <Button raised type="submit" color="primary">Go</Button>
            </form>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              <h1>Follower Actions</h1>
              <br></br>
              <p>Check/Claim Rewards</p>
            <form onSubmit={this.handleSubmitFollower.bind(this)}>
              <Button raised type="submit" color="primary">Go</Button>
            </form>
            </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              <h1>Follower Stats</h1>
              <br></br>
              <p>Experimental</p>
            <form onSubmit={this.handleSubmitFollowerStats.bind(this)}>
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


export default withStyles(styles)(SocialNetwork);
