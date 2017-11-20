pragma solidity ^0.4.11;


contract WhaleNetworkV2 {
//compiling now

  struct Whale {
    uint id;
    uint shares; // keeps track of the whale shares
    bool isWhale;
    uint lastBlockShared;
  }

  address owner;
  mapping (address => Whale) public whales;
  uint public numWhales;
  uint whaleRequirement;
  address[] public whaleList; //we would need this to show a list of whales

  // keep track of the networkShares
  uint public networkShares;
  // keeps track of the last block that the network share was recorded
  uint lastBlockShareRecorded;
  // keeps track of the last block that the whale shere was recorded
  uint id;

  //modifiers

  modifier isOwner() {
    require(owner == msg.sender);
    _;
  }

  modifier onlyWhale() {
    require(whales[msg.sender].isWhale);
    _;
  }

  function WhaleNetworkV2(address _owner) {
    owner = _owner;
    numWhales = 0;
    whaleRequirement = 1000000000000000000000;
  }

  //setter functions
  function becomeWhale() payable {
    require(msg.value == whaleRequirement);
    require(!whales[msg.sender].isWhale);
    whales[msg.sender].isWhale = true;
    whales[msg.sender].id = id; // now assigned here
    whales[msg.sender].lastBlockShared = block.number;
    whaleList.push(msg.sender);
    numWhales++;
    id++;
  }

  function becomeNormal() {
    require(whales[msg.sender].isWhale);
    whales[msg.sender].shares += (block.number - whales[msg.sender].lastBlockShared);
    whales[msg.sender].lastBlockShared = block.number;
    whales[msg.sender].isWhale = false;
    numWhales--;
    networkShares += numWhales * (block.number - lastBlockShareRecorded);
    lastBlockShareRecorded = block.number;
    msg.sender.transfer(whaleRequirement);
  }

  function updateWhaleShare(address _address) {
    if (whales[_address].isWhale) {
      whales[_address].shares += (block.number - whales[_address].lastBlockShared);
      whales[_address].lastBlockShared = block.number;
    }
  }

  function updateNetworkShare() {
    networkShares += (block.number - lastBlockShareRecorded) * numWhales;
    lastBlockShareRecorded = block.number;
  }

  function isWhale(address _address) constant returns (bool _status) {
    return whales[_address].isWhale;
  }

  function getLockedBalance() constant returns (uint balance) {
    balance = this.balance;
  }

  function getWhaleShares(address _addr) public constant returns (uint shares) {
    return whales[_addr].shares;
  }

  function getWhaleLastBlockShared(address _addr) public constant returns (uint blocks) {
    return whales[_addr].lastBlockShared;
  }

  function getWhaleNextBlockShared(address _addr) public constant returns (uint blocks) {
    return whales[_addr].lastBlockShared + 1000;
  }
}
