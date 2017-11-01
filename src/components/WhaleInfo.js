import React, {Component} from 'react'
import WhaleNetwork from '../../build/contracts/WhaleNetwork.json'
import WhaleRewards from '../../build/contracts/WhaleRewards.json'
import getWeb3 from '../utils/getWeb3'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'
import {keystore, txutils} from 'eth-lightwallet'
import tx from 'ethereumjs-tx'
import Header from './header.js'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import PropTypes from 'prop-types';







const styles = {
  root: {
    width: '100%',
    marginTop: '10px',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}





class WhaleInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address1: '',
      address: '',
      post: '',
      web3: null
    }

  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3.then(results => {
      this.setState({web3: results.web3})
      // Instantiate contract once web3 provided.



    const contract = require('truffle-contract')
    const whaleNetwork = contract(WhaleNetwork)
    const whaleRewards = contract(WhaleRewards)
    whaleRewards.setProvider(this.state.web3.currentProvider)
    whaleNetwork.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var whaleRewardsInstance
    var whaleNetworkInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      whaleRewards.deployed().then((instance) => {
        whaleRewardsInstance = instance

        // Stores a given value, 5 by default.
        return whaleRewardsInstance.getNetworkAddress.call({from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log(result)
        whaleNetwork.at(result).then((netInstance) => {
              whaleNetworkInstance = netInstance;
          whaleNetworkInstance.whaleList(0).then((address) => {
            console.log(address)
            this.setState({address:address})
          }).then(()=> {
            whaleNetworkInstance.whaleList(1).then((address1) => {
              console.log(address1)
              this.setState({address1:address1})
            })
          })
        })
      })
    })
  })
  }
  // renders the basic form in the root tab space
  render() {
    return (
      <MuiThemeProvider>
        <div>

            <Paper className={this.props.classes.root}>
              <Table className={this.props.classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell> # </TableCell>
                    <TableCell >ADDRESS</TableCell>
                    <TableCell numeric># OF POSTS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                      <TableRow>
                        <TableCell>0</TableCell>
                        <TableCell>{this.state.address}</TableCell>
                        <TableCell numeric>{this.state.post}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>{this.state.address1}</TableCell>
                        <TableCell numeric>{this.state.post}</TableCell>
                      </TableRow>
                </TableBody>
              </Table>
            </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(WhaleInfo);
// import React, {Component} from 'react'
// import WhaleNetwork from '../../build/contracts/WhaleNetwork.json'
// import WhaleRewards from '../../build/contracts/WhaleRewards.json'
// import getWeb3 from '../utils/getWeb3'
// import Button from 'material-ui/Button';
// import TextField from 'material-ui/TextField';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import ReactDOM from 'react-dom'
// import {keystore, txutils} from 'eth-lightwallet'
// import tx from 'ethereumjs-tx'
// import Header from './header.js'
// import Paper from 'material-ui/Paper';
// import Grid from 'material-ui/Grid';
// import { withStyles } from 'material-ui/styles';
// import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
// import PropTypes from 'prop-types';
//
//
//
// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 700,
//   },
// });
//
//
//
// class WhaleInfo extends Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//
//       web3: null
//     }
//   }
//
//
//   componentWillMount() {
//     // Get network provider and web3 instance.
//     // See utils/getWeb3 for more info.
//
//     getWeb3.then(results => {
//       this.setState({web3: results.web3})
//       // Instantiate contract once web3 provided.
//     }).catch(() => {
//       console.log('Error finding web3.')
//     })
//
//   }
//
//
//       getWhale() {
//
//       const contract = require('truffle-contract')
//       const whaleNetwork = contract(WhaleNetwork)
//       const whaleRewards = contract(WhaleRewards)
//       whaleRewards.setProvider(this.state.web3.currentProvider)
//       whaleNetwork.setProvider(this.state.web3.currentProvider)
//
//       // Declaring this for later so we can chain functions on SimpleStorage.
//       var whaleRewardsInstance
//       var whaleNetworkInstance
//
//       // Get accounts.
//       this.state.web3.eth.getAccounts((error, accounts) => {
//         whaleRewards.deployed().then((instance) => {
//           whaleRewardsInstance = instance
//
//           // Stores a given value, 5 by default.
//           return whaleRewardsInstance.getNetworkAddress.call({from: accounts[0]})
//         }).then((result) => {
//           // Get the value from the contract to prove it worked.
//           console.log(result)
//           whaleNetwork.at(result).then((netInstance) => {
//               whaleNetworkInstance = netInstance;
//           whaleNetworkInstance.whaleList(0).then((address) => {
//             console.log(address)
//             return address
//
//         })
//         })
//       })
//     })
//   }
// render() {
//
//   let id = 0;
//   function createData(address, numPosts, numFollowers) {
//     id += 1;
//     return { id, address, numPosts, numFollowers };
//   }
//   this.getWhale().bind(this)
//   const { classes } = this.props;
//   const data = [
//     createData('fdf', 1, 1),
//     createData(';lskdf;s', 1, 1),
//   ];
//
//   return (
//     <MuiThemeProvider>
//         <div>
//     <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell> # </TableCell>
//             <TableCell numeric>ADDRESS</TableCell>
//             <TableCell numeric># OF POSTS</TableCell>
//             <TableCell numeric># OF FOLLOWERS</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map(n => {
//             return (
//               <TableRow key={n.id}>
//                 <TableCell>{n.id}</TableCell>
//                 <TableCell numeric>{n.address}</TableCell>
//                 <TableCell numeric>{n.numPosts}</TableCell>
//                 <TableCell numeric>{n.numFollowers}</TableCell>
//               </TableRow>
//             );
//           })}
//
//         </TableBody>
//       </Table>
//     </Paper>
//     </div>
//         </MuiThemeProvider>
//       );
//     }
// }
//
// // export default withStyles(styles)(BasicTable);
//
// //   // renders the basic form in the root tab space
// //   render() {
// //     return (
// //       <MuiThemeProvider>
// //
// //
// //           <div className={this.props.classes.root}>
// //           <Grid container spacing={24}>
// //
// //             <Grid item xs={12}>
// //               <Paper className={this.props.classes.paper}>
// //             <Table>
// //               <TableHeader>
// //                 <TableRow>
// //                   <TableHeaderColumn>ID</TableHeaderColumn>
// //                   <TableHeaderColumn>Name</TableHeaderColumn>
// //                   <TableHeaderColumn>Status</TableHeaderColumn>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 <TableRow>
// //                   <TableRowColumn>1</TableRowColumn>
// //                   <TableRowColumn>John Smith</TableRowColumn>
// //                   <TableRowColumn>Employed</TableRowColumn>
// //                 </TableRow>
// //                 <TableRow>
// //                   <TableRowColumn>2</TableRowColumn>
// //                   <TableRowColumn>Randal White</TableRowColumn>
// //                   <TableRowColumn>Unemployed</TableRowColumn>
// //                 </TableRow>
// //                 <TableRow>
// //                   <TableRowColumn>3</TableRowColumn>
// //                   <TableRowColumn>Stephanie Sanders</TableRowColumn>
// //                   <TableRowColumn>Employed</TableRowColumn>
// //                 </TableRow>
// //                 <TableRow>
// //                   <TableRowColumn>4</TableRowColumn>
// //                   <TableRowColumn>Steve Brown</TableRowColumn>
// //                   <TableRowColumn>Employed</TableRowColumn>
// //                 </TableRow>
// //                 <TableRow>
// //                   <TableRowColumn>5</TableRowColumn>
// //                   <TableRowColumn>Christopher Nolan</TableRowColumn>
// //                   <TableRowColumn>Unemployed</TableRowColumn>
// //                 </TableRow>
// //               </TableBody>
// //             </Table>
// //             </Paper>
// //             </Grid>
// //             </Grid>
// //         </div>
// //       </MuiThemeProvider>
// //     );
// //   }
// // }
//
// export default withStyles(styles)(WhaleInfo);
