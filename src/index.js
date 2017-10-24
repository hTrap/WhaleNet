import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
