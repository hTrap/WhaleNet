pragma solidity ^0.4.11;


contract WhaleNetwork {

  event Posted(
      address author,
      string title,
      uint id
  );

  struct Whale {
    uint id;
    uint[] whaleBlocks;
    uint[] normalBlocks;
    uint shares;
    bool isWhale;
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

  struct Vars {
    uint i;
  }

  uint public numPosts;
  mapping (uint => Post) public posts;
  address owner;
  mapping (address => Whale) public whales;
  uint public numWhales;
  uint whaleRequirement;
  address[] public whaleList;
  mapping (address => Validator) validators;
  mapping (address => address) public whaleMod;
  uint public networkShares;
  uint lastBlockShareRecorded;
  mapping (address => uint) lastWhaleShareRecorded;
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
    whaleRequirement = 100;
    numPosts = 0;
  }


  //setter functions

  function becomeWhale() payable {
    require(msg.value == whaleRequirement);
    require(!whales[msg.sender].isWhale);
    whales[msg.sender].whaleBlocks.push(block.number);
    whales[msg.sender].isWhale = true;
    whaleList.push(msg.sender);
    numWhales++;
  }

  function becomeNormal() {
    require(whales[msg.sender].isWhale);
    whales[msg.sender].normalBlocks.push(block.number);
    whales[msg.sender].shares += (block.number - lastWhaleShareRecorded[msg.sender]);
    lastWhaleShareRecorded[msg.sender] =  block.number;
    whales[msg.sender].isWhale = false;
    whaleList[whales[msg.sender].id] = whaleList[whaleList.length-1];
    delete whaleList[whaleList.length-1];
    numWhales--;
    networkShares += numWhales * (block.number - lastBlockShareRecorded);
    lastBlockShareRecorded = block.number;
    msg.sender.transfer(whaleRequirement);
  }

  function designateModerator(address mod) onlyWhale{
      whaleMod[msg.sender] = mod;
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

  function post(string postTitle, address whale)  {
    require(whales[whale].isWhale);
    require(whaleMod[whale] == msg.sender);
    require(bytes(postTitle).length <= 160);
    posts[numPosts].id = numPosts;
    posts[numPosts].timestamp = now;
    posts[numPosts].whale = whale;
    posts[numPosts].title = postTitle;
    whales[msg.sender].postList.push(numPosts);
    Posted(msg.sender, postTitle, numPosts);
    numPosts++;
  }

  function addFollowers(uint postid, address[] followers) {
    Vars memory vars;
    require(whaleMod[posts[postid].whale] == msg.sender);
    for (vars.i=0; vars.i<followers.length; vars.i++) {
      posts[postid].followers.push(followers[vars.i]);
  }
  }


  //getter functions
  function getWhaleShare(address _address) returns (uint shares) {
    if (whales[_address].isWhale) {
      whales[_address].shares += (block.number - lastWhaleShareRecorded[_address]);
      lastWhaleShareRecorded[_address] = block.number;
    }
    return whales[_address].shares;
  }

  function getNetworkShare() returns (uint) {
    networkShares += (block.number - lastBlockShareRecorded) * numWhales;
    lastBlockShareRecorded = block.number;
    return networkShares;
  }

  function isWhale(address _address) constant returns (bool _status) {
    bool status = whales[_address].isWhale;
    return status;
  }

  function getLockedBalance() constant returns (uint balance) {
    balance = this.balance;
  }

  function getWhale(address _addr) public constant returns (uint num, address moderator, uint shares) {
      return (whales[_addr].postList.length, whaleMod[_addr], whales[_addr].shares);
  }

  function getPost(uint postId) constant returns (uint id, uint timestamp, address whale, uint numFollowers) {
    require(postId < numPosts); //We check that the post exists
    id = posts[postId].id;
    timestamp = posts[postId].timestamp;
    whale = posts[postId].whale;
    numFollowers = posts[postId].followers.length;
  }

  function getFollower(uint pid, uint fid) constant returns (address) {
    return posts[pid].followers[fid];
  }

  function getCurrentWhaleCount() public constant returns(uint count) {
    return whaleList.length;
}

}
