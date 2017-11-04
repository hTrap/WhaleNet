import React from 'react';
import Button from 'material-ui/Button';
import ReactDOM from 'react-dom'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class PostAlert extends React.Component {
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
          <DialogTitle>{"Transaction Completed"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              TX: {this.props.result}
            </DialogContentText>
            <DialogContentText>
              ID:
              {this.props.id}
            </DialogContentText>
            <DialogContentText>
              Author:
              {this.props.author}
            </DialogContentText>
            <DialogContentText>
              Title:
              {this.props.title}
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
