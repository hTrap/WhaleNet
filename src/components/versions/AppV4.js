import React, {Component} from 'react'
import getWeb3 from '../../utils/getWeb3'
import WhaleNetworkV4 from '../../../build/contracts/WhaleNetworkV4.json'
import WhaleRewardsV4 from '../../../build/contracts/WhaleRewardsV4.json'
import Button from 'material-ui/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import BecomeNormalForm from '../forms/BecomeNormalForm.js'
import Header from '../header.js'
import ActionGridV4 from '../actionGridV4.js'
import WhaleInfo from '../WhaleInfo.js'
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


const divStyle = {
  marginLeft:"50px",
  marginRight:"50px"
}

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
  tableroot: {
    width: '100%',
    marginTop: 30,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

class AppV4 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      items: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3.then(results => {
      this.setState({web3: results.web3})

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
//     const contract = require('truffle-contract')
//     const whaleNetwork = contract(WhaleNetworkV4)
//     const whaleRewards = contract(WhaleRewardsV4)
//     whaleRewards.setProvider(this.state.web3.currentProvider)
//     whaleNetwork.setProvider(this.state.web3.currentProvider)
//
//     // Declaring this for later so we can chain functions on SimpleStorage.
//     var whaleRewardsInstance
//     var whaleNetworkInstance
//     var block = this.state.web3.eth.getBlock('latest').number
//     // Get accounts.
//     this.state.web3.eth.getAccounts((error, accounts) => {
//       whaleRewards.at('0x0c0d7a5b34321e436ce826a5dd56a9121cd54c49').then((instance) => {
//         whaleRewardsInstance = instance
//
//         // Stores a given value, 5 by default.
//         return whaleRewardsInstance.getNetworkAddress()
//       }).then((result) => {
//         // Get the value from the contract to prove it worked.
//         console.log(result)
//         whaleNetworkInstance = whaleNetwork.at(result)
//         whaleNetworkInstance.Posted({},
//           { fromBlock:block-10000, toBlock: block }).get((error, eventResult) => {
//   if (error)
//     console.log('Error in myEvent event handler: ' + error);
//   else
//
//   console.log(eventResult)
//   var items = eventResult.sort(function(obj, obj2) { return obj2.blockNumber - obj.blockNumber})
//   ReactDOM.render(
//     <Grid item xs={12}>
//     <Paper className={this.props.classes.tableroot}>
//     <Table className={this.props.classes.table}>
//     <TableHead>
//       <TableRow>
//         <TableCell><h2>Active Posts</h2></TableCell>
//
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {items.map(item => {
//         return (
//
//           <TableRow key={item.transactionHash}>
//             <TableCell>ID: {item.args.id.toNumber()} <br></br> Author: {item.args.author}<br></br> Block: {item.blockNumber} <br></br>Title: {item.args.title} </TableCell>
//
//           </TableRow>
//         );
//       })}
//     </TableBody>
//   </Table>
//   </Paper>
//           </Grid>
//     , document.getElementById('active-posts'));
//
// })
// })
// })
}


  render() {
    return (
      <MuiThemeProvider>
          <div>
          {< Header />}

          <div className={this.props.classes.root}>

          <Grid container spacing={24}>

            <Grid item xs={12}>
              <Paper className={this.props.classes.paper}>

              {<ActionGridV4/>}
              </Paper>
            </Grid>

            <div id="active-posts"> </div>

          </Grid>
          </div>
          </div>

      </MuiThemeProvider>

    );
  }
}

export default withStyles(styles)(AppV4);
