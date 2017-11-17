var WhaleRewards = artifacts.require("./WhaleRewards.sol");
var WhaleNetwork = artifacts.require("./WhaleNetwork.sol");
var WhaleClaimV2 = artifacts.require("./WhaleClaimV2.sol");
module.exports = function(deployer) {
  deployer.deploy(WhaleRewards, {overwrite:false}).then(function() {
    return WhaleRewards.at(WhaleRewards.address);
  }).then(function(instance) {
      return deployer.deploy(WhaleClaimV2, instance.getNetworkAddress());
  })

};
