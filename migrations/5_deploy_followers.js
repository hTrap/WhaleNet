var WhaleRewardsV4 = artifacts.require("./WhaleRewardsV4.sol");
var WhaleNetworkV4 = artifacts.require("./WhaleNetworkV4.sol");
module.exports = function(deployer) {
  deployer.deploy(WhaleRewardsV4);
};
