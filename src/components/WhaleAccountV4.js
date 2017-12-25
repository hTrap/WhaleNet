
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
import BecomeWhaleFormV4 from './forms/BecomeWhaleFormV4.js'
import BecomeNormalFormV4 from './forms/BecomeNormalFormV4.js'
import WhaleCheckFormV4 from './forms/WhaleCheckFormV4.js'
import Header from './header.js'
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


class WhaleAccountV4 extends Component {
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

          <h1 className={this.props.classes.paper}>My Whale Account</h1>
          <div className={this.props.classes.root}>

          <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={this.props.classes.paper}>

            {<WhaleCheckFormV4/>}
            </Paper>
          </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>

              {<BecomeWhaleFormV4/>}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              {<BecomeNormalFormV4/>}
              </Paper>
            </Grid>
          </Grid>
          </div>
          </div>

      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(WhaleAccountV4);
