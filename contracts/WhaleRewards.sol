pragma solidity ^0.4.11;

import "./WhaleNetwork.sol";

contract WhaleRewards{

  address public owner;
  mapping (address => uint) public balances;
  address networkAddress;
  uint public lastPostRewarded;

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
      vars.followerRewards = 9 * this.balance/10;
      vars.moderatorRewards = this.balance/10;
      vars.postsDiff = vars.numberPosts - lastPostRewarded;


      for (vars.i=lastPostRewarded; vars.i<vars.numberPosts; vars.i++) {

        (vars.id, vars.num, vars.whale, vars.followers) = whaleNetwork.getPost(vars.i);
        vars.moderator = whaleNetwork.whaleMod(vars.whale);
        balances[vars.moderator] += (vars.moderatorRewards/vars.postsDiff);
        for (vars.j=0; vars.j<vars.followers;vars.j++) {
          vars.postFollower = whaleNetwork.getFollower(vars.i, vars.j);
          balances[vars.postFollower] += (vars.followerRewards/vars.postsDiff)/vars.followers;
        }
      }
      lastPostRewarded = vars.numberPosts-1;
    }

    function claimReward(address addr) {
      addr.transfer(balances[addr]);
      Claimed(addr, balances[addr]);
      balances[addr] = 0;

    }


    function getNetworkAddress() constant returns (address addr){
      return networkAddress;
    }


}
