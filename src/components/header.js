import React, {Component} from 'react'

import { withStyles } from 'material-ui/styles';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import AppBar from 'material-ui/AppBar';
import WhaleCheckForm from './forms/WhaleCheckForm.js'
import ReactDOM from 'react-dom'
import App from '../App.js'
import Button from 'material-ui/Button';
import AppV1 from './versions/AppV1.js';

const imgStyle  = {
  float: 'left',
  width: '35px',
  height: '35px',
}

const styles  = {
  root: {
    cursor: 'pointer',
  }
}


class Header extends Component {
  constructor(props) {
    super(props)
}
  handleOnClick(event) {
    event.preventDefault()
    ReactDOM.render(
      <div>{<App/>}</div>, document.getElementById('root'));

  }
  handleV1OnClick(event) {
    event.preventDefault()
    ReactDOM.render(
      <div>{<AppV1/>}</div>, document.getElementById('root'));
  }
  render() {
    return (
      <MuiThemeProvider>

        <div >
          <AppBar position="static" color="default">
            <Toolbar>
              <Grid container spacing={24}>

                <Grid item xs={12} sm={6}>
                <div className={this.props.classes.root} onClick={this.handleOnClick.bind(this)}>
                <img style={imgStyle} src="../../images/whalecoin-logo-square.png" alt="logo" />

                    <Typography type="title" color="inherit">
                      Whale Network --- Preview Release:<b> All Rewards Go To Whales</b>
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>

                <Button raised onClick={this.handleV1OnClick.bind(this)}>
                  v1
                </Button>
                <Button raised color="primary" >
                  v2
                </Button>
                <Button raised color="accent" >
                  v3
                </Button>

                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>

    );
  }
}
export default withStyles(styles)(Header);
