pragma solidity ^0.4.11;

import "./WhaleNetworkV4.sol";

contract WhaleRewardsV4{

  address public owner;
  mapping (address => uint) public claimedShare;
  address networkAddress;
  mapping (address => uint) public claimedFollowerShare;
  uint public followerRewards;
  mapping (address => uint) public lastFollowerClaim;
  mapping (address => mapping(uint => bool)) followerClaimedReward;


  struct Vars {
    uint netShare;
    uint whaleShare;
    uint unclaimedShare;
    uint reward;
    uint whaleRatio;
    uint followerRatio;
    address moderator;
    uint moderatorRatio;
  }

  struct FollowerVars {
    uint numPosts;
    uint postShares;
    uint followerShare;
    uint followerReward;
  }

  event Claimed(
    uint indexed block,
    uint reward,
    address indexed whale,
    uint moderatorReward,
    address indexed moderator,
    uint followerReward
    );

  event FollowerClaimed(
    uint reward,
    address indexed follower,
    uint indexed postid
    );

  WhaleNetworkV4 whaleNetwork;
  /*uint distEpoch;
  uint distBloc;*/
  function WhaleRewardsV4() {
    owner = msg.sender;
    whaleNetwork = new WhaleNetworkV4(owner);
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
    require(block.number - whaleNetwork.getWhaleLastBlockShared(addr) >= 10);
    Vars memory vars;
    // these functions update the networkshare and the whale share and change the state
    // this is the reason the blocks mined increase on claiming reward
    whaleNetwork.updateNetworkShare();
    whaleNetwork.updateWhaleShare(addr);
    // These are public getters that get the state variables // like here
    vars.netShare = whaleNetwork.networkShares();
    vars.whaleShare = whaleNetwork.getWhaleShares(addr);
    // whaleshare is the total share whale has accumulated on the platform
    // claimedShare is the state variable that stores the claimed whale shares
    vars.unclaimedShare = vars.whaleShare - claimedShare[addr];
    vars.reward = (vars.unclaimedShare * this.balance) / vars.netShare;
    claimedShare[addr] += vars.unclaimedShare;
    vars.whaleRatio = vars.reward / 10; // 10%
    vars.moderatorRatio = vars.reward / 5; // 20%
    addr.transfer(vars.whaleRatio);
    vars.moderator = whaleNetwork.moderators(addr);
    if (vars.moderator == 0x0000000000000000000000000000000000000000) {
      vars.followerRatio = vars.reward - vars.whaleRatio;
      followerRewards += vars.followerRatio;
      Claimed(vars.whaleRatio, addr, 0, vars.moderator, vars.followerRatio);
    } else {
      vars.moderator.transfer(vars.moderatorRatio);
      vars.followerRatio = vars.reward - vars.whaleRatio - vars.moderatorRatio;
      followerRewards += vars.followerRatio;
      Claimed(block.number, vars.whaleRatio, addr, vars.moderatorRatio, vars.moderator, vars.followerRatio);

    }
    // event that is triggered which I wait for and show it as an alert in the ui

  }

  function claimFollowerReward(address addr, uint postid) {
    require(whaleNetwork.getPostTimeStamp(postid) < (block.number -10)); // IMP change 10 to 10000
    require(followerClaimedReward[addr][postid] == false);
    FollowerVars memory fvars;
    fvars.followerShare = whaleNetwork.getFollowerShare(addr, postid);
    require(fvars.followerShare > 0);
    fvars.postShares = whaleNetwork.getPostFollowers(postid);
    fvars.numPosts = whaleNetwork.numPosts();
    fvars.followerReward = (fvars.followerShare * followerRewards)/(fvars.postShares *fvars.numPosts);
    followerClaimedReward[addr][postid] = true;
    addr.transfer(fvars.followerReward);
    FollowerClaimed(fvars.followerReward, addr, postid);
  }

  function getNetworkAddress() constant returns (address addr){
    return networkAddress;
  }

}
