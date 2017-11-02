
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
import WhaleAccount from '../components/WhaleAccount.js'
import ModeratorAccount from '../components/ModeratorAccount.js'
import PostAction from '../components/postAction.js'
import AddFollowers from '../components/followerAction.js'


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


class ActionGrid extends Component {
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
      <div>{< WhaleAccount />}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }
  handleSubmitMod(event) {
    event.preventDefault();
    ReactDOM.render(
      <MuiThemeProvider>
      <div>{< ModeratorAccount />}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }

  handleSubmitPost(event) {
    event.preventDefault();
    ReactDOM.render(
      <MuiThemeProvider>
      <div>{< PostAction />}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }

  handleSubmitFollower(event) {
    event.preventDefault();
    ReactDOM.render(
      <MuiThemeProvider>
      <div>{< AddFollowers />}</div>
    </MuiThemeProvider>, document.getElementById('root'));
  }


  render() {




    return (
      <MuiThemeProvider>


          <div className={this.props.classes.root}>
          <Grid container spacing={24}>

            <Grid item xs={6} sm={3}>
              <Paper className={this.props.classes.paper}>
              <h1>My Whale Account</h1>
              <br></br>
              <p>Become a Whale/Stop Being a Whale</p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <Button raised type="submit" color="primary">Go</Button>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={this.props.classes.paper}>
              <h1>My Moderator Account</h1>
              <br></br>
              <p>Add or Remove a Moderator</p>
                <form onSubmit={this.handleSubmitMod.bind(this)}>
                  <Button raised type="submit" color="primary">Go</Button>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={this.props.classes.paper}>
              <h1>My Posts</h1>
              <br></br>
              <p>Add a Post</p>
                <form onSubmit={this.handleSubmitPost.bind(this)}>
                  <Button raised type="submit" color="primary">Go</Button>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={this.props.classes.paper}>
              <h1>My Followers</h1>
              <br></br>
              <p>Reward your Followers</p>
                <form onSubmit={this.handleSubmitFollower.bind(this)}>
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


export default withStyles(styles)(ActionGrid);
