import React from 'react';
import Button from 'material-ui/Button';
import ReactDOM from 'react-dom'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class Error extends React.Component {
  state = {
    open: true,
  };


  handleRequestClose = () => {
    this.setState({ open: false });
    ReactDOM.render(
      <div></div>, document.getElementById('result'));
  };

  render() {
    return (
      <div>
        <Dialog open={this.state.open}>
          <DialogTitle>{"Transaction Incomplete"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Invalid Transaction.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
