
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
import BecomeWhaleFormV2 from './forms/BecomeWhaleFormV2.js'
import BecomeNormalFormV2 from './forms/BecomeNormalFormV2.js'
import WhaleCheckFormV2 from './forms/WhaleCheckFormV2.js'
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


class WhaleAccountV2 extends Component {
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

            {<WhaleCheckFormV2/>}
            </Paper>
          </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>

              {<BecomeWhaleFormV2/>}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={this.props.classes.paper}>
              {<BecomeNormalFormV2/>}
              </Paper>
            </Grid>
          </Grid>
          </div>
          </div>

      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(WhaleAccountV2);
