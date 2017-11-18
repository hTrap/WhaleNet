pragma solidity ^0.4.11;

import "./WhaleNetwork.sol";

contract WhaleClaimV2{

  address public owner;
  mapping (address => bool) claimed;

  event Claimed(
    address whale,
    uint reward
    );

  uint public whaleReward;

  WhaleNetwork whaleNetwork;
  /*uint distEpoch;
  uint distBloc;*/
  function WhaleClaimV2(address addr) {
      owner = msg.sender;
      whaleNetwork = WhaleNetwork(addr);
      whaleReward = 100;
    }

  modifier isOwner() {
      require(owner==msg.sender);
      _;
    }

    //Reward functions
    function () payable {

    }

    function claimReward(address addr) {
      require(whaleNetwork.isWhale(addr));
      require(!claimed[addr]);
      claimed[addr] = true;
      addr.transfer(whaleReward);
      Claimed(addr, whaleReward);
    }


}
