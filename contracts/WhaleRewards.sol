pragma solidity ^0.4.11;

import "./WhaleNetwork.sol";

contract WhaleRewards{

  address public owner;
  mapping (address => uint) public claimedShare;
  address networkAddress;

  struct Vars {
    uint netShare;
    uint whaleShare;
    uint unclaimedShare;
    uint reward;

  }

  event Claimed(
    uint reward,
    address follower
    );

  WhaleNetwork whaleNetwork;
  /*uint distEpoch;
  uint distBloc;*/
  function WhaleRewards() {
      owner = msg.sender;
      whaleNetwork = new WhaleNetwork(owner);
      networkAddress = address(whaleNetwork);
    }

  modifier isOwner() {
      require(owner==msg.sender);
      _;
    }

    //Reward functions
    function () payable {

    }



    function claimReward(address addr) {
      Vars memory vars;
      whaleNetwork.getNetworkShare();
      whaleNetwork.getWhaleShare(addr);
      vars.netShare = whaleNetwork.networkShares();
      (,,vars.whaleShare) = whaleNetwork.getWhale(addr);
      vars.unclaimedShare = vars.whaleShare - claimedShare[addr];
      vars.reward = (vars.unclaimedShare * this.balance) / vars.netShare;
      claimedShare[addr] += vars.unclaimedShare;
      addr.transfer(vars.reward);
      Claimed(vars.reward, addr);

    }


    function getNetworkAddress() constant returns (address addr){
      return networkAddress;
    }


}
