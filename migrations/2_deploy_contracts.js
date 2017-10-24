var WhaleRewards = artifacts.require("./WhaleRewards.sol");
var WhaleNetwork = artifacts.require("./WhaleNetwork.sol");
module.exports = function(deployer) {
  deployer.deploy(WhaleRewards);
};
