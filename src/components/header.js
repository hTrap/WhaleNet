import React, { Component } from 'react'

import getWeb3 from '../utils/getWeb3'
import {Tabs, Tab} from 'material-ui/Tabs'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import AppBar from 'material-ui/AppBar';
import WhaleCheckForm from './forms/WhaleCheckForm.js'




class Header extends Component {
  render() {
    return (<MuiThemeProvider>

<div>
<AppBar position="static" color="default">
       <Toolbar>
       <Grid container spacing={24}>

         <Grid item xs={12} sm={6}>
           <Paper>
         <Typography type="title" color="inherit">
           Whale Network
         </Typography>
         </Paper>
         </Grid>
         <Grid item xs={12} sm={6}>
           <Paper>
           {<WhaleCheckForm/>}

         </Paper>
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
