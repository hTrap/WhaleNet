pragma solidity ^0.4.11;

import "./WhaleNetwork.sol";

contract WhaleRewards{

  address public owner;
  mapping (address => uint) public balances;
  address networkAddress;
  uint public lastPostRewarded;
  uint public allocatedRewards;
  uint public claimedRewards;

  struct Vars {
    uint numberPosts;
    uint followerRewards;
    uint moderatorRewards;
    uint postsDiff;
    uint id;
    uint num;
    uint followers;
    address whale;
    address moderator;
    address postFollower;
    uint i;
    uint j;
    uint currentFollowerRewards;
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
      lastPostRewarded = 0;
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
      vars.numberPosts = whaleNetwork.numPosts();
      vars.postsDiff = vars.numberPosts - lastPostRewarded;
      vars.moderatorRewards = ((this.balance-allocatedRewards+claimedRewards)/10)/vars.postsDiff;
      vars.followerRewards = (9 * (this.balance-allocatedRewards+claimedRewards)/10)/vars.postsDiff;
      allocatedRewards += vars.moderatorRewards + vars.followerRewards;


      for (vars.i=lastPostRewarded; vars.i<vars.numberPosts; vars.i++) {

        (vars.id, vars.num, vars.whale, vars.followers) = whaleNetwork.getPost(vars.i);
        vars.currentFollowerRewards = vars.followerRewards/vars.followers;
        vars.moderator = whaleNetwork.whaleMod(vars.whale);
        balances[vars.moderator] += vars.moderatorRewards;
        for (vars.j=0; vars.j<vars.followers;vars.j++) {
          vars.postFollower = whaleNetwork.getFollower(vars.i, vars.j);
          balances[vars.postFollower] += vars.currentFollowerRewards;
        }
        lastPostRewarded = vars.i;
      }
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
