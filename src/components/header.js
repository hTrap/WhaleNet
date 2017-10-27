import React, {Component} from 'react'



import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import AppBar from 'material-ui/AppBar';
import WhaleCheckForm from './forms/WhaleCheckForm.js'

const imgStyle  = {
  float: 'left',
  width: '35px',
  height: '35px',
}




class Header extends Component {
  render() {
    return (
      <MuiThemeProvider>

        <div >
          <AppBar position="static" color="default">
            <Toolbar>
              <Grid container spacing={24}>

                <Grid item xs={12} sm={6}>
                <img style={imgStyle} src="../../images/whalecoin-logo-square.png" alt="logo" />

                    <Typography type="title" color="inherit">
                      Whale Network
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {< WhaleCheckForm />}

                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>

    );
  }
}
export default Header
