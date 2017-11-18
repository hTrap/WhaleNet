pragma solidity ^0.4.11;

import "./WhaleNetworkV2.sol";

contract WhaleRewardsV2{

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
    address whale
    );

  WhaleNetworkV2 whaleNetwork;
  /*uint distEpoch;
  uint distBloc;*/
  function WhaleRewardsV2() {
    owner = msg.sender;
    whaleNetwork = new WhaleNetworkV2(owner);
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
    require(block.number - whaleNetwork.getWhaleLastBlockShared(addr) >= 1000);
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
    addr.transfer(vars.reward);
    // event that is triggered which I wait for and show it as an alert in the ui
    Claimed(vars.reward, addr);
  }

  function getNetworkAddress() constant returns (address addr){
    return networkAddress;
  }

}
