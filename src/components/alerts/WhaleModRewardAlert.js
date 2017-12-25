import React from 'react';
import Button from 'material-ui/Button';
import ReactDOM from 'react-dom'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class WhaleModRewardAlert extends React.Component {
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
              Tx: {this.props.result}
            </DialogContentText>
            <DialogContentText>
              Whale:
              {this.props.follower}
            </DialogContentText>
            <DialogContentText>
              Reward:
              {this.props.reward}
            </DialogContentText>
            <DialogContentText>
              Moderator:
              {this.props.moderator}
            </DialogContentText>
            <DialogContentText>
              Moderator Reward:
              {this.props.moderatorReward}
            </DialogContentText>
            <DialogContentText>
              Follower Reward:
              {this.props.followerReward}
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
