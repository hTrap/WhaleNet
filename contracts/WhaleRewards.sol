pragma solidity ^0.4.11;

import "./WhaleNetwork.sol";

contract WhaleRewards{

  address public owner;
  mapping (address => uint) public balances;
  address networkAddress;
  uint public allocatedRewards;
  uint public claimedRewards;

  struct Vars {
    uint i;
    uint rewards;
    uint rewardPerWhale;
    uint numWhale;
  }

  event Claimed(
    address follower,
    uint reward
    );

  WhaleNetwork whaleNetwork;
  /*uint distEpoch;
  uint distBloc;*/
  function WhaleRewards() {
      owner = msg.sender;
      whaleNetwork = new WhaleNetwork(owner);
      networkAddress = address(whaleNetwork);
      allocatedRewards = 0;
      claimedRewards = 0;
    }
  modifier isOwner() {
      require(owner==msg.sender);
      _;
    }

    //Reward functions
    function () payable {

    }

    function distReward() {
      Vars memory vars;
      vars.numWhale = whaleNetwork.getCurrentWhaleCount();
      vars.rewards = this.balance - allocatedRewards + claimedRewards;
      vars.rewardPerWhale = vars.rewards/vars.numWhale;
      for (vars.i=0; vars.i<vars.numWhale; vars.i++) {
        balances[whaleNetwork.whaleList(vars.i)] += vars.rewards;
      }
      allocatedRewards += vars.rewards;
    }

    function claimReward(address addr) {
      addr.transfer(balances[addr]);
      Claimed(addr, balances[addr]);
      claimedRewards += balances[addr];
      balances[addr] = 0;

    }


    function getNetworkAddress() constant returns (address addr){
      return networkAddress;
    }


}
