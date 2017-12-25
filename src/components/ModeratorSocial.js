
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
import AddFollowers from '../components/forms/AddFollowers.js'




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


class ModeratorSocial extends Component {
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

          <h1 className={this.props.classes.paper}>Moderator Social Actions</h1>
          <div className={this.props.classes.root}>

          <Grid container spacing={24}>

            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              {<AddPost/>}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              {<AddFollowers/>}
              </Paper>
            </Grid>
          </Grid>
          </div>
          </div>

      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(ModeratorSocial);
