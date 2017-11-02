pragma solidity ^0.4.11;

import "./WhaleNetwork.sol";

contract WhaleRewards{

  address public owner;
  mapping (address => uint) balances;
  address networkAddress;

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

    function distReward() isOwner() {
      uint numberPosts = whaleNetwork.numPosts();
      uint lastPostRewarded = whaleNetwork.getLastPostRewarded();
      uint balance = this.balance;
      uint followerRewards = 9 * balance/10;
      uint moderatorRewards = balance/10;
      uint postsDiff = numberPosts - lastPostRewarded;
      for (uint i=lastPostRewarded; i<numberPosts; i++) {
        uint id;
        uint num;
        address whale;
        uint followers;
        (id, num, whale, followers) = whaleNetwork.getPost(i);
        address moderator = whaleNetwork.getModerator(whale);
        balances[moderator] += (moderatorRewards/postsDiff);
        for (uint j=0; j<followers;j++) {
          address postFollower = whaleNetwork.getFollower(i, j);
          balances[postFollower] += (followerRewards/postsDiff)/followers;
        }
      }
      lastPostRewarded = i;
    }

    function claimReward(address addr) {
      addr.transfer(balances[addr]);
      balances[addr] = 0;
    }

    function checkRewards(address addr) constant returns (uint balance) {
      balance = balances[addr];
      return balance;
    }

    function getNetworkAddress() constant returns (address addr){
      return networkAddress;
    }


}
