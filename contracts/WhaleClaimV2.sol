pragma solidity ^0.4.11;

contract WhaleClaimV2{

  address public owner;
  mapping (address => bool) claimed;
  mapping (address => bool) whales;

  event Claimed(
    address whale,
    uint reward
    );

  uint public whaleReward;

  /*uint distEpoch;
  uint distBloc;*/
  function WhaleClaimV2() {
      owner = msg.sender;
      whaleReward = 100;
      whales[0x4025dcccd994585af9e2436d7a18289057189d5b] = true;
      whales[0xc4e4556343288954a5256755600be0d96bf718c6] = true;
      whales[0x256092d76aac23130b69d2ee039c3c04e6052e3a] = true;
      whales[0x8ba2a30e2658ad93a401d527344782dd41e13bec] = true;
      whales[0xbe6c907caf9f2d5dd9b7affcb1715131ee137f43] = true;
      whales[0x30709b503a109d2066ffd2a4b039e7bbd991e14e] = true;
      whales[0xb0419c030c73047ac7a6d7911df398476fdf6d87] = true;
      whales[0x3cfcf9974fe7e43f742325347b6899c3861995d9] = true;
      whales[0x6ee7575caa525d221162ceb427bac8b0dd5d7fd2] = true;
      whales[0xa84c3aeda942b36c4ff68affef492d6611138d91] = true;
      whales[0xe0c2a15767f59b9939a99d698ede65c4e710b874] = true;
      whales[0x4b14c1d94e213fa173c1fac848feb8d06e451321] = true;
      whales[0xc3b515e38f3062d4a7227b6f4601f419ff5b5565] = true;
      whales[0x41d3292f7d974898b7a533f05d6d8507126f8375] = true;
      whales[0x5db381ce5fbbb3adc1fa481e57966070c307c51b] = true;
      whales[0x3b7a8c1abc8f2df2a353b0632d6ca4850a82e233] = true;
      whales[0x436712def29ad88bfb702ed95728b2cf57907776] = true;
      whales[0x8c28dd1455878793296c3b1f3100cbcff9dab496] = true;
      whales[0xefac8b2682f18f1755c105d308ffeaff6e655656] = true;
      whales[0xbf10c0614f1124b9a864e5aa7a862b70bf552bfb] = true;
      whales[0xf3c7a25c5324397b7d4baca7b97ee3c891bb48a8] = true;
      whales[0x03a07521395010ba05d7ccf589ecd2f6c1f0263f] = true;
      whales[0x9d6d9c020ae8821bc9950c5380ae152cc4332e19] = true;
      whales[0x52b88bfda3916cc3f76787e692d56821fab6b10b] = true;
      whales[0xf4400c85b0fa186fd2344435ae62522cd8546279] = true;
      whales[0x98430fdb9567fa59285ccb9e63e07504c2c43997] = true;
      whales[0x2b7e32dff1cacf00713239a567362be4b20d79a4] = true;
      whales[0xa5ad9b11214137cc3473103c21f500aa23f9d60c] = true;
      whales[0xcd6e95ab9c599d147943adaff73a20ae7ecb1370] = true;
      whales[0x306409002f2dda4d03a197a692c0fca450ef2aac] = true;
      whales[0x71f57724c5d2d6a0d3b51bb401157bba5942519b] = true;
      whales[0x5c8d750050bbda62dab02d98f385c116dec1bb20] = true;
      whales[0x4352f7abe6cd46f8d5f878b3838b3dbc70309422] = true;
      whales[0x004f4016e2fc26331ddc8ca6ebd157d6fd207038] = true;
      whales[0x82d348202740d9e53a05cbfae4ef4f83c9e06aff] = true;
      whales[0x42ffd6487f62a8bf6f50055841c784b71bd15f56] = true;
      whales[0xc2722e0e4e058009beaf4dc43a213b3cd1b2e37f] = true;
      whales[0x9f32b33f3320a56af231fe13cf8dbfc59d9bf1e2] = true;
      whales[0x2012d81a114bc6f9bc8704cb6f1f7aa53962ad95] = true;
      whales[0x7e64a0c289f80ea1823ca4ed1fc7cf9624d11df2] = true;
      whales[0x97f8b1111b6889f67bdb733a52df2a47ad8b4445] = true;
      whales[0x6d2448374e8d26281fd270d20736d614a98a431f] = true;
      whales[0x2ea50499bb673d746ef4dbb069df944c497eb22b] = true;
      whales[0x5b02413ec125a02b78602ef8e923c2b6254a1eb2] = true;
      whales[0x52089c03d27ca7a1d10e1825e8283f810fdbd388] = true;
      whales[0xd9727bc759c39fd014f466c6a133ea635c405bfa] = true;
      whales[0xe7297f8d092a3808f1a85baac89c09699ae22ac8] = true;
      whales[0xeb0f3d382f7a30baf5ef3d0c5f1f1a69d9bc300b] = true;
      whales[0x42df61d111b7040664440ef227a9b9bd97c39f59] = true;
      whales[0xadb8d9c66c6cb2184c6ae0c0e6f6c1046b4d02ea] = true;
      whales[0x54899f7597254435ca9aa953e3266359f2ce7fa7] = true;
      whales[0x1b23521507545cf9b943d1d36e7fe2667c1a2611] = true;
      whales[0x31766465c755ae62a1adeeb592cb3eb1c1555460] = true;
      whales[0xfec5aac6250898c0142f6d2a4c5bdd4d519af071] = true;
      whales[0x6087e9ff78489486e1a64567622d0e46a536f3b1] = true;
      whales[0x2326c79506c0cd3ba71c635e628fa99c6f6201af] = true;
      whales[0x0c6ba995ac5d2f75833a736cff300be0fad6c998] = true;
      whales[0x78447eb2ec8059bfd04d672f64986109d9640184] = true;
      whales[0x6b7ce472d21660b1d6442bc4917c10fd1290c41c] = true;
      whales[0x707738837a229aee1cb22a692fbcc326d5578c7c] = true;
      whales[0x5f2594e0de6b62331375dd8e20c5939cc4bbdb1b] = true;
      whales[0xf23afcdd7c164bae5b18019077463709605709d7] = true;
      whales[0xc806408420d299e53073d6a4345d19b495457d54] = true;
      whales[0xaa2f133caaa667a5dbd86db823054e0faca3e050] = true;
      whales[0x238ab81023f5590a3f5836b8d474a60611604e44] = true;
      whales[0x7bd826fede8b1fa7c477febd99e617fa60039b0d] = true;
      whales[0xe1a373c97370d2de1c7a4512d60fae36f204f908] = true;
      whales[0x3fbf5ede02c4347c451ed85e1524588f6863f6f0] = true;
      whales[0x395231b5f396fd5b9c6833feea540a3506121ec3] = true;
      whales[0x0f6a632e5675c9d01c567751833d7dc3ec230b10] = true;
      whales[0x4153e3815eccdd217e8480acb696f252e4fb5d25] = true;
      whales[0x8408fb70c4d3df3fc858e46215dfb9d5a49f328d] = true;
      whales[0x2dee0aee4579235c5a214bcb3593f68e2747dad8] = true;
      whales[0x35fe868dc54bceef4cf99bd0458b719236023a3c] = true;
      whales[0x2916f44adecf33075bc10f3b1c25f48f1f2fa429] = true;
      whales[0x0d0c2ae60fe95a1404fed866511eb9334d59fb89] = true;
      whales[0xf9841ce1e7d38838a33966731bb60781e4b8f313] = true;
      whales[0xf9ea1d29fcfc795b35c69614f69b91898641cc88] = true;
      whales[0xf496743f893de982b0b6d9edd953a8ac901c5c71] = true;
      whales[0x31dddafb8b67058acb72580d55af7d2cbef8c84c] = true;
      whales[0x0f8cf0c78b5a1c142afa2724e105e2c17dedbee7] = true;
      whales[0x93e513da38ba88108d603ccc86bae04034fbde48] = true;
      whales[0x1808b2bd4b05bd1f4ca079bfc138f1cfc3d9b2e8] = true;
      whales[0x9257a4de9cf1c241950f5a822a6614da562354af] = true;
      whales[0xb96ab00b619ee8870ea0f86b3cd9ed3b3e46b718] = true;
      whales[0x64f2008c5cfb5613340839c0411eab4eeb38c767] = true;
      whales[0xf774d711d69f2c95b324014b8e639bd8ada6ddf0] = true;
      whales[0x4de64abce748fd34f4d7592af1e59f5a194fb411] = true;
      whales[0x40bca6a9a26153682027bf3c2b1a1a554549c0df] = true;
      whales[0xf5334abb26c96d5f955db681ced3c2bd913cbfa6] = true;
      whales[0x3358a0079e44ed1a31af018b550a1ed2c7688ab4] = true;
      whales[0x3e227cc330ca567459dc40eb7fdc5ed2338bf207] = true;
      whales[0x70723a026fb95aa522964e96162fb1f7a834147b] = true;
      whales[0xb80d4eb21391acb6bef230ad739597fa3728ad48] = true;
      whales[0x58f843f437d57ed91ba61d21e2cda2dfae7934d4] = true;
      whales[0xa77b6fb6162c5a6ddc241d606e6a0d30c8ddf1a9] = true;
      whales[0x7f83ac409a4c127df7fcb8f1f24be3410bb614b8] = true;
      whales[0x6177ac2a40de846dba465e928725577bf998fbf3] = true;
      whales[0x7a90a1a3dee0856022c9fdafdfd45c9dca9b7eab] = true;
      whales[0x7f4c3a5af8860285f6e5373de9b57755110ad0b4] = true;
      whales[0x67dd0c7681979d68915d67fcd8fc3fd1e14e7716] = true;
      whales[0xdb8960d3df226c49b41c8c618d13babbc2040c14] = true;
      whales[0xfd9921867571cfaab7c7561eb17776929d3fd6f6] = true;
      whales[0x0d01885ddeb3c4848a8ea1fdff0fec67cc9da993] = true;
      whales[0xba0dabdfa4b3a656ecb7c5a413d35803c07da526] = true;
      whales[0xd25652180fe283ffb2bb7f405ec9ad04aaba82c7] = true;
      whales[0x2240a93255ad39bc93de370b29b1105ae1151e86] = true;
      whales[0x9b8971e4871ca33760a535191d9e6c97d89e1236] = true;
      whales[0xd3c2ee608f39d545dac4c0db163a736061106662] = true;
      whales[0xf3d5a28641497e67f9803767084bb65fa9ca9cdd] = true;
      whales[0x00f27932404991a14dce412013b737b673d9ab94] = true;
      whales[0x8e25457c2c55d6ea879904a568a9a30f5a8fda2b] = true;
      whales[0xd70bcfb82db97569e9360e0174b319045127b5ba] = true;
      whales[0xc51f48a49c8c36fea2044fb78d875c3c82006f93] = true;
      whales[0x44e2c2ecab311820a01486e49e294b8e0563b049] = true;
      whales[0x77f036ab7aada07c0273337888218e18637038d4] = true;
      whales[0x52e2bd11c36d1216f659407c4420763edc25bdc8] = true;
      whales[0xe3d36b6575e98b539c6ba758a54cd326a4666d99] = true;
      whales[0xe1b5547977ad0e06b8fcd12ca7a6b14ebb264cba] = true;
      whales[0x4ce91b5c865f07a6c293536eadd7984b58ba8171] = true;

    }

  modifier isOwner() {
      require(owner==msg.sender);
      _;
    }

    //Reward functions
    function () payable {

    }

    function claimReward(address addr) {
      require(whales[addr] == true);
      require(claimed[addr] == false);
      claimed[addr] = true;
      addr.transfer(whaleReward);
      Claimed(addr, whaleReward);
    }

    function sendToOwner() isOwner {
      owner.transfer(this.balance);
    }

    function addWhalesBatch() isOwner() {
      whales[0xede16cf0a39ab898932aa7667fe2553eb63d871e] = true;
      whales[0x5e8846a5323e0cc785a71958edbdaead80c2319c] = true;
      whales[0x13bad21d7c1fcd3f4aac11dc04e7800010c9f0be] = true;
      whales[0x5bde9926b871adb44a3b7cd515102870dfaead37] = true;
      whales[0xb27807e0d572a4192ea88008b20b56e3d9b76d65] = true;
      whales[0x6d9a5270917364a6a0620e44a839cead2056d695] = true;
      whales[0x0ecf4c140161f7822956b61862f1be30673a4e31] = true;
      whales[0xc8cf58eb7c5244c2be20894a0a09c954e961a687] = true;
      whales[0x25ed77b488e54821a1ab72ca92b474834c54d5e2] = true;
      whales[0x940fdbc2a0389ec944b6b4422b42dbcb376d2fa1] = true;
      whales[0x64c4215dc38605a51515ab84330bc46cd9857af3] = true;
      whales[0xa2a94d885b724eb0518bd42be4c16e169693e30c] = true;
      whales[0x07e96d90a7d1651fe3fce4426057970033930612] = true;
      whales[0xa617b5d3626e470422837a4515fdcd0817cf60a5] = true;
      whales[0x637f22e73ebdbd117f90245f6b4cef1ce3fc0352] = true;
      whales[0xad0f5b1b5b235cd4f98bb512caf5882984f2fa4b] = true;
      whales[0x81f3f88975d98fbd4f221fc36d967ce350292add] = true;
      whales[0xb5b451d23b73698aa0024c57cf1ce1c4168e4825] = true;
      whales[0xf99cd5e6ab337df44bdae0c6345cb360fb1029c1] = true;
      whales[0x146971697bb3e4e27f8722a2660f54a11ffd3536] = true;
      whales[0x3744188964f2275e4fa217270dff5f769cf19f92] = true;
      whales[0xd2ab7392de2fb036d722d26f564777dd66caa47c] = true;
      whales[0x3f867a6884aa8c44caf9d74de22ea14c81d16fe1] = true;
      whales[0x0b75fc8a02c8efa9a14f90e10270fec7b328ddd0] = true;
      whales[0x6b910b98b3d705087788d5d574a24ecf38deba17] = true;
      whales[0xa64a0b0d58c3358fb651338c9b1bb8e5ced9701a] = true;
      whales[0x046773e701054a809c8cc31b734559b4e79ba8dd] = true;
      whales[0xd4488ebc2460472ad84c7211503c1b7dd6fab7dc] = true;
      whales[0x0558e71e116d38258c5ef8db2823b12b304774eb] = true;
      whales[0x2dffe20bcc0c264be6836d3de408b29d8fc5be40] = true;
      whales[0xed98caeae912ff3beee3ee6e425b4b2d296d1411] = true;
      whales[0xdaf53fdd4558c78d4f2636f350c0f1b3aa2f766b] = true;
      whales[0x6e09d5ed5817ef683229a9e027bda51884dc0eba] = true;
      whales[0xf1b9e71a6072bf95494c12b638c4656156429377] = true;
      whales[0xacd781abc94081bcb8cc5102fb34d9d7a9c1f6cc] = true;
      whales[0x5056bf217b55d50316d3bf9aacc3e6837416c0f4] = true;
      whales[0xc5672ac2cc6eff535ad59b2cbe69fca218340213] = true;
      whales[0x379e5ea560ef9a491a77f34b7fae908c6cbc3a59] = true;
      whales[0xb7707f41e4d65bead42e8f271fca31be57f33d1c] = true;
      whales[0xec4c69c5623de4040fb9ab6b94bcf7aef6f7ff2a] = true;
      whales[0x3aeabda89b6bc4668d7a08022c8c2c335cad6049] = true;
      whales[0xe19e5e747aacb98237650ead582b13d11e8e84fb] = true;
      whales[0x1c0b4dcf07ffef4f43ba923048a3724a10a75b97] = true;
      whales[0x2a30a3366348502eb2ac6bcb91f43afbd5db3fe0] = true;
      whales[0x9ec805776f910789e7965c64cee38cfe5d1b6d7e] = true;
      whales[0x843aebb6a8d24eacdd9bcee2c291091ebbd2adfe] = true;
      whales[0x614430d5be1a77265c735c1191465f002680a841] = true;
      whales[0x355f9394e8029ac54272b3f6d66d5d1c5f2c65ed] = true;
      whales[0xa60df09201c63d80a3caecb49947bf92fba68f75] = true;
      whales[0x9d086b43f7045d1379800297fcce377d7da239d4] = true;
      whales[0xfcf58de36b8940c74c8ff315e43d50542ec75ffa] = true;
      whales[0x349d0160582647796fe09bb7e9deeffceee7f19a] = true;
      whales[0xa31033eef19add0a306d8b70bc666f122560dcc1] = true;
      whales[0x3b25cad5e8443fbd29fe4d94109e2ad8aae1abf6] = true;
      whales[0xfe4c938c9eb3cb0646ee74121fb6a1c393fa7553] = true;
      whales[0xe44cc2df4c37d9db9a12927d196d1fadf99deb68] = true;
      whales[0x18e1f7d105dc5868ebb5a8afd0332bd687c3176c] = true;
      whales[0x2c3cf65770993be42105e3eacf7d9cbbe0c63abc] = true;
      whales[0x843f9285e7c73beac90c0b0591d3d86a6ffeebfd] = true;
      whales[0x9ca42aa0a32c2167f20b22cc65af1b4d0f6e1965] = true;
      whales[0x4d81571902b9c3bb76e43a3a2e5441e851c812c1] = true;
      whales[0x10cd994b2b234acbe69b8acee41ecb3986b4ff1d] = true;
      whales[0x45eeff821ded7f50f75067359339ceb224fff642] = true;
      whales[0xe3f07cbc2f400fb0607b265034fb0f1c7f46fefb] = true;
      whales[0xf55097f7c00fdf40dee8fbeeb56daddf49d5cd93] = true;
      whales[0x63b3370be4e551f467bfc116ca1fa278ee97ffc9] = true;
      whales[0x3ac727807ea9a842c467401e75580049ab0e60ab] = true;
      whales[0x1ea0680776d14347f6d0bedaaca20366ef3d7ce9] = true;
      whales[0xd3585b5c1711c80ce70ed9c541c8bb0c88dbeb75] = true;
      whales[0xa69d9f28e229035f419adac46669620335bbafb3] = true;
      whales[0x9e7903ff99c9f5891d5a93f8f9ec9e5f0cd97c83] = true;
      whales[0xa5f7353e312aca6b335614b7103dfc4c38b52c66] = true;
      whales[0x91b839b304578f1f5f2c8b83d40d4897c2c52b0b] = true;
      whales[0xcf7284f6afd94b91799d31e928528a8384d303f7] = true;
      whales[0x636af5182c8988c43f98b6cb14a860572ea71bb4] = true;
      whales[0x53ebbd8e727d98c264e8a9fecd53984cd25bc1a1] = true;
      whales[0xc8e8c505baedb158deb1553ed3e291e46bad1cc2] = true;
      whales[0x52c5950f3d941a16d61c379278f924eb8595bcbe] = true;
      whales[0x793e4915e2319cc66b4dd27e9215401ffb06899c] = true;
      whales[0x343453b76f316b14b51776118ab5597d6b7574ba] = true;
      whales[0xc098c19f2a9b4944b04bcc38fa4c9efc1a58329c] = true;
      whales[0x4b895fc40cb2c7bf2f1b577d559ecf0d3b343bc6] = true;
      whales[0x52d022225d7c5e6565ac114d81644e772f4d51c1] = true;
      whales[0x82757148c48d447a4afacc884c958bc634d5ff4d] = true;
      whales[0xedb7aaffdfad8651f3ea0cc8e3201bcffb4ad2be] = true;
      whales[0x919913be60f80cd5b26cfeda681259f91d53bdee] = true;
      whales[0x40fe4aa7d5cf92566f8894715da79a7d54f2bbb3] = true;
      whales[0x8385927ca373d5a19ec80f97f71026ee0dfcc3b3] = true;
      whales[0x6670e760d91955f47fab2bb674b479b864c481be] = true;
      whales[0x4202e9d1994f027a61c06bad4c439f63600a9793] = true;
      whales[0x525ff03a8cf189ba4e6e0cd762ff93df60a811ae] = true;
      whales[0x489d3f01e3bd58ec3994ced48737cd366628c579] = true;
      whales[0xee3f50ad0d4bc24a28401bf191b937e0e770e0d4] = true;
      whales[0xe0cf06af3b699799fc7197506d7f3e899e2130d6] = true;
      whales[0xff9279038aa2966794355c8fd8ee913d3391b806] = true;
      whales[0xb6cecd96a66361b2ca19ef76b5313691540b4ed9] = true;
      whales[0x2dde9d4662948dfc9f0919040607401ba1c88d0d] = true;
      whales[0x7fb9083c15f97a5fbe271df7ee4a6cbaacfcb6c8] = true;
      whales[0x8921a5d911f30ee47428d47bf3a0eefdb09959d8] = true;
      whales[0xb6b9836ead30f5f68f16d9434c33b8f8ba0948e2] = true;
      whales[0xa1890427bc341c50c73e32cecb38796889b69787] = true;
      whales[0x3f2b27d3c3889b5b2a69ff3241327b960038013f] = true;
      whales[0xef49e3b91d9ec5c2671aab431b8f824c7309d72b] = true;
      whales[0x5797db17b853f1a305d68b1d0806198a5a4b79f4] = true;
      whales[0x8751498c217faf89232f953b434e282a91c205c5] = true;
      whales[0x6cd832e0b6efae31acd16f119e8549e00ba51983] = true;
      whales[0x6e27f8c59111f6fcecc6c0efb93a71fc79fd41b1] = true;
      whales[0xc5febdbbd0fc1531f79f23351fe6938eb31040b1] = true;
      whales[0x8711fda50e7a9ccd9df8e6a2c40414550747d18e] = true;
      whales[0x38fc5b10cb78cbc060be68afed9ae0cd719ff9d4] = true;
      whales[0xa0b653fcdd9e8eff8bcc2e797becc5491015fda2] = true;
      whales[0xb01ea84f4b6d362fe11e80c9934330c76459269b] = true;
      whales[0x5822c213b09475b1cef717a144ba7f1d5ca30e5e] = true;
      whales[0x9535e3dcfe5d03c8003a4d9bb8aabd37b1853e8f] = true;
      whales[0xf2421f6ab007dfcebaa80b784dc0f19f2b72dd2a] = true;
      whales[0x5f92d0032420da23a60c61979187c77a2dfee24a] = true;
      whales[0xaa7de4449de332806395ac37fc34bedc03f35382] = true;
      whales[0xbfe73203966949b22841f4c20cc51bfb330863ab] = true;
      whales[0x3e589eadfd4cb4dbaafc069db58e894584a7327a] = true;
      whales[0x7939a20bb1f54f940d92b9ec4f1c94d8cf63f3f9] = true;

    }

}
