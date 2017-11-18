var WhaleRewardsV2 = artifacts.require("./WhaleRewardsV2.sol");
var WhaleNetworkV2 = artifacts.require("./WhaleNetworkV2.sol");
module.exports = function(deployer) {
  deployer.deploy(WhaleRewardsV2);
};
