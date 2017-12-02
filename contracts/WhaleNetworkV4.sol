pragma solidity ^0.4.11;


contract WhaleNetworkV4 {
//compiling now
  event Posted(
      address author,
      string title,
      uint id
  );

  struct Whale {
    uint id;
    uint shares; // keeps track of the whale shares
    bool isWhale;
    uint lastBlockShared;
    uint[] postIds;
  }


  struct Post {
    uint timestamp;
    uint id;
    address whale;
    string title;
  }

  address owner;
  mapping (address => Whale) public whales;
  uint public numWhales;
  uint whaleRequirement;
  address[] public whaleList; //we would need this to show a list of whales
  mapping(address => address) public moderators;
  mapping  (uint => address[]) public postFollowers;
  mapping (address => Post[]) public whalePosts;
  uint public numPosts;
  mapping (uint => Post) public posts;
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

  function WhaleNetworkV4(address _owner) {
    owner = _owner;
    numWhales = 0;
    whaleRequirement = 1000;
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

  function designateModerator(address mod) onlyWhale{
      moderators[msg.sender] = mod;
  }


  function post(string postTitle, address whale)  {
    require(whales[whale].isWhale);
    require(moderators[whale] == msg.sender);
    require(bytes(postTitle).length <= 160);
    posts[numPosts].id = numPosts;
    posts[numPosts].timestamp = now;
    posts[numPosts].whale = whale;
    posts[numPosts].title = postTitle;
    whales[msg.sender].postIds.push(numPosts);
    Posted(msg.sender, postTitle, numPosts);
    numPosts++;
  }

  function addFollower(uint postid, address follower) {
    require(moderators[posts[postid].whale] == msg.sender);
      postFollowers[postid].push(follower);

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
