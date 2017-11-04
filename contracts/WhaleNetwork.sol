pragma solidity ^0.4.11;


contract WhaleNetwork {

  event Posted(
      address author,
      string title,
      uint id
  );

  struct Whale {
    uint timestamp;
    bool isWhale;
    address moderator;
    bool validated;
    uint[] postList;
  }

  struct Validator {
    uint timestamp;
    bool isValidator;
  }

  struct Post {
    uint timestamp;
    uint id;
    address[] followers;
    address whale;
    string title;
  }

  uint public numPosts;
  mapping (uint => Post) public posts;
  address owner;
  mapping (address => Whale) public whales;
  uint public numWhales;
  uint whaleRequirement;
  address[] public whaleList;
  mapping (address => Validator) validators;
  uint lastPostRewarded;

  //modifiers

  modifier isOwner() {
    require(owner == msg.sender);
    _;
  }

  modifier onlyWhale() {
      require(whales[msg.sender].isWhale);
      _;
  }

  modifier onlyValidators() {
      require(validators[msg.sender].isValidator);
      _;
  }

  function WhaleNetwork(address _owner) {
    owner = _owner;
    numWhales = 0;
    whaleRequirement = 5555;
    numPosts = 0;
    lastPostRewarded = 0;
  }


  //setter functions

  function becomeWhale() payable {
    require(msg.value == whaleRequirement);
    require(!whales[msg.sender].isWhale);
    whales[msg.sender].timestamp = now;
    whales[msg.sender].isWhale = true;
    whaleList.push(msg.sender);
    numWhales++;
  }

  function becomeNormal() {
    require(whales[msg.sender].isWhale);
    msg.sender.transfer(whaleRequirement);
    whales[msg.sender].timestamp = now;
    whales[msg.sender].isWhale = false;
    numWhales--;
  }

  function designateModerator(address mod) onlyWhale{
      whales[msg.sender].moderator = mod;
  }

  function validate(address whale) onlyValidators {
      require(whales[whale].isWhale); //check if whale
      whales[whale].validated = true;
  }

  function addValidator(address addr) isOwner{
      require(!validators[addr].isValidator);
      validators[addr].timestamp = now;
      validators[addr].isValidator = true;
  }

  function post(string postTitle) onlyWhale {
    require(bytes(postTitle).length <= 160);
    posts[numPosts].id = numPosts;
    posts[numPosts].timestamp = now;
    posts[numPosts].whale = msg.sender;
    posts[numPosts].title = postTitle;
    whales[msg.sender].postList.push(numPosts);
    Posted(msg.sender, postTitle, numPosts);
    numPosts++;
  }

  function addFollowers(uint postid, address follower) {
    posts[postid].followers.push(follower);
  }


  //getter functions
  function isWhale(address _address) constant returns (bool _status) {
    bool status = whales[_address].isWhale;
    return status;
  }

  function getLockedBalance() constant returns (uint balance) {
    balance = this.balance;
  }

  function getWhale(address _addr) public constant returns (uint num) {
      return (whales[_addr].postList.length);
  }

  function getPost(uint postId) constant returns (uint id, uint timestamp, address whale, uint numFollowers) {
    require(postId < numPosts); //We check that the post exists
    id = posts[postId].id;
    timestamp = posts[postId].timestamp;
    whale = posts[postId].whale;
    numFollowers = posts[postId].followers.length;
  }


  function getModerator(address addr) constant returns (address moderator) {
    moderator = whales[addr].moderator;
    return moderator;
  }
  function getLastPostRewarded() constant returns (uint num) {
    return lastPostRewarded;
  }
  function getFollower(uint pid, uint fid) constant returns (address) {
    return posts[pid].followers[fid];
  }
}
