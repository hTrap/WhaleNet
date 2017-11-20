
var WhaleClaimV2 = artifacts.require("./WhaleClaimV2.sol");
module.exports = function(deployer) {
  return deployer.deploy(WhaleClaimV2, {gas: 4700000});
};
