pragma solidity ^0.4.11;


contract WhaleNetworkV4 {
//compiling now
  event Posted(
      address indexed author,
      string title,
      uint indexed id
  );

  event FollowerAdded(
    address indexed whale,
    uint indexed postid,
    address indexed follower,
    address moderator
    );

  event BecomeWhale(
    address whale,
    uint blockNumber
    );

  event BecomeNormal(
    address whale,
    uint blockNumber
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
    bool expired;
  }

  address owner;
  mapping (address => Whale) public whales;
  uint public numWhales;
  uint whaleRequirement;
  address[] public whaleList; //we would need this to show a list of whales
  mapping(address => address) public moderators;
  mapping  (uint => address[]) public postFollowers;
  mapping(address => mapping(uint => uint)) public followedPosts;
  mapping (address => Post[]) public whalePosts;

  uint public numPosts;
  mapping (uint => Post) public posts;
   // keep track of the networkShares
  uint public networkShares;
  // keeps track of the last block that the network share was recorded
  uint lastBlockShareRecorded;
  // keeps track of the last block that the whale shere was recorded
  uint id;
  uint public socialShares;


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
    numPosts = 0;
    socialShares = 0;
  }

  //setter functions
  function becomeWhale() payable {
    require(msg.value == whaleRequirement);
    require(!whales[msg.sender].isWhale);
    whales[msg.sender].isWhale = true;
    whales[msg.sender].id = id; // now assigned here
    whales[msg.sender].lastBlockShared = block.number;
    whaleList.push(msg.sender);
    BecomeWhale(msg.sender, block.number);
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
    BecomeNormal(msg.sender, block.number);
  }

  function designateModerator(address mod) onlyWhale{
      moderators[msg.sender] = mod;
  }


  function post(string postTitle, address whale)  {
    require(whales[whale].isWhale);
    require(moderators[whale] == msg.sender);
    require(bytes(postTitle).length <= 160);
    posts[numPosts].id = numPosts;
    posts[numPosts].timestamp = block.number;
    posts[numPosts].whale = whale;
    posts[numPosts].title = postTitle;
    whales[whale].postIds.push(numPosts);
    Posted(whale, postTitle, numPosts);
    numPosts++;
  }

  function addFollower(uint postid, address follower) {
    require(moderators[posts[postid].whale] == msg.sender);
    require(posts[postid].timestamp + 10000 >= block.number);
      postFollowers[postid].push(follower);
      followedPosts[follower][postid]++;
      FollowerAdded(posts[postid].whale, postid, follower, msg.sender);
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

  function getFollowerShare(address _addr, uint postid) public constant returns (uint shares) {
    shares = followedPosts[_addr][postid];
  }
  function getPostFollowers(uint postid) public constant returns (uint shares) {
    shares = postFollowers[postid].length;
  }

  function getPostTimeStamp(uint postid) public constant returns (uint time) {
    return posts[postid].timestamp;
  }
}
