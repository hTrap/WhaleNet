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
    function addWhalesBatch1() isOwner() {
      whales[0x4025DCCCD994585AF9e2436d7A18289057189d5B] = true;
      whales[0xC4E4556343288954A5256755600Be0d96bF718c6] = true;
      whales[0x256092D76AAC23130b69d2Ee039c3C04e6052E3a] = true;
      whales[0x8Ba2a30E2658ad93A401D527344782dd41e13bEc] = true;
      whales[0xBe6c907CAF9f2d5Dd9b7aFfCB1715131EE137F43] = true;
      whales[0x30709B503A109d2066FfD2A4b039e7bBd991e14e] = true;
      whales[0xb0419C030C73047aC7a6d7911df398476FDF6D87] = true;
      whales[0x3CFcF9974fe7E43F742325347b6899c3861995d9] = true;
      whales[0x6EE7575cAA525d221162ceb427bAC8B0dD5d7Fd2] = true;
      whales[0xA84c3AeDA942b36C4fF68AFfef492D6611138D91] = true;
      whales[0xe0c2A15767F59B9939a99D698Ede65c4e710b874] = true;
      whales[0x4B14c1d94E213fA173c1FAc848FEb8D06e451321] = true;
      whales[0xc3B515E38f3062d4A7227b6f4601f419FF5B5565] = true;
      whales[0x41D3292F7D974898B7a533F05d6D8507126f8375] = true;
      whales[0x5Db381Ce5fbbB3aDC1Fa481E57966070C307c51b] = true;
      whales[0x3b7A8c1AbC8F2dF2A353b0632d6cA4850A82e233] = true;
      whales[0x436712dEF29AD88bFB702eD95728b2CF57907776] = true;
      whales[0x8c28dD1455878793296c3B1f3100CbcFf9DAb496] = true;
      whales[0xEfAc8b2682f18f1755c105D308ffEAFF6e655656] = true;
      whales[0xbF10C0614f1124B9A864e5aA7A862B70bF552bFB] = true;
      whales[0xF3c7a25c5324397b7d4bAcA7b97eE3c891BB48a8] = true;
      whales[0x03a07521395010BA05d7CcF589eCD2f6C1f0263F] = true;
      whales[0x9d6d9c020aE8821Bc9950c5380AE152Cc4332e19] = true;
      whales[0x52b88bfda3916cC3F76787E692d56821FAb6b10b] = true;
      whales[0xF4400c85B0fA186fd2344435ae62522Cd8546279] = true;
      whales[0x98430fDb9567Fa59285CCb9E63e07504C2C43997] = true;
      whales[0x2b7E32dFF1CaCF00713239a567362be4b20D79A4] = true;
      whales[0xa5Ad9b11214137CC3473103C21f500Aa23F9D60c] = true;
      whales[0xCd6E95ab9c599D147943AdaFf73A20ae7EcB1370] = true;
      whales[0x306409002F2ddA4D03a197a692c0FcA450Ef2AAc] = true;
      whales[0x71f57724C5d2D6a0D3b51Bb401157bBa5942519B] = true;
      whales[0x5c8D750050Bbda62DAB02D98f385C116DeC1bB20] = true;
      whales[0x4352F7abE6Cd46F8D5f878B3838b3DBC70309422] = true;
      whales[0x004F4016E2fC26331dDC8cA6ebd157d6fd207038] = true;
      whales[0x82D348202740d9e53A05CbFAe4Ef4F83C9E06aff] = true;
      whales[0x42fFD6487f62a8BF6F50055841c784b71BD15F56] = true;
      whales[0xc2722e0e4E058009bEaF4dC43a213b3cd1B2e37f] = true;
      whales[0x9F32b33f3320a56af231fE13cF8dBfC59d9bf1E2] = true;
      whales[0x2012d81a114BC6f9Bc8704CB6F1F7aA53962aD95] = true;
      whales[0x7e64A0c289F80eA1823ca4ed1Fc7CF9624D11Df2] = true;
      whales[0x97f8b1111b6889F67bdb733A52dF2A47ad8B4445] = true;
      whales[0x6D2448374e8d26281fD270D20736D614A98A431f] = true;
      whales[0x2eA50499bb673d746ef4DBb069df944c497Eb22B] = true;
      whales[0x5b02413Ec125a02B78602eF8e923c2B6254a1Eb2] = true;
      whales[0x52089c03D27Ca7A1D10e1825e8283f810FDbD388] = true;
      whales[0xD9727Bc759c39FD014f466C6A133eA635C405bfA] = true;
      whales[0xe7297F8d092a3808F1A85baAc89c09699aE22Ac8] = true;
      whales[0xEb0f3d382f7A30bAF5eF3d0C5f1F1A69d9bc300b] = true;
      whales[0x42dF61D111b7040664440ef227A9b9Bd97C39f59] = true;
      whales[0xaDb8D9C66C6CB2184c6AE0C0E6f6c1046b4D02ea] = true;
      whales[0x54899F7597254435ca9aA953E3266359F2CE7fA7] = true;
      whales[0x1b23521507545CF9B943d1d36e7fe2667C1a2611] = true;
      whales[0x31766465c755aE62A1ADEEb592CB3eB1C1555460] = true;
      whales[0xFEC5aAC6250898c0142F6D2a4C5bdd4D519Af071] = true;
      whales[0x6087e9Ff78489486e1a64567622D0e46A536f3B1] = true;
      whales[0x2326c79506C0cD3Ba71C635e628fa99C6f6201af] = true;
      whales[0x0c6ba995Ac5D2F75833A736Cff300be0fad6c998] = true;
      whales[0x78447EB2eC8059bFd04D672F64986109D9640184] = true;
      whales[0x6b7Ce472d21660B1d6442BC4917c10Fd1290c41c] = true;
      whales[0x707738837A229aEE1cb22A692FBcC326D5578C7C] = true;
      whales[0x5F2594E0DE6B62331375Dd8e20c5939Cc4BBdB1B] = true;
      whales[0xf23afcdd7c164bAE5b18019077463709605709d7] = true;
      whales[0xc806408420D299e53073D6a4345D19B495457d54] = true;
      whales[0xaA2F133CAaa667a5DBD86DB823054E0faCa3E050] = true;
      whales[0x238Ab81023F5590A3f5836B8d474A60611604E44] = true;
      whales[0x7bd826feDE8B1Fa7C477fEbD99E617fa60039b0D] = true;
      whales[0xE1a373C97370d2de1C7a4512D60fAE36F204F908] = true;
      whales[0x3fBf5EdE02C4347C451Ed85E1524588F6863F6F0] = true;
      whales[0x395231b5F396fD5B9c6833FEEA540A3506121Ec3] = true;
      whales[0x0F6a632E5675c9d01C567751833d7DC3EC230b10] = true;
      whales[0x4153e3815EcCDD217E8480aCB696F252E4Fb5D25] = true;
      whales[0x8408FB70c4D3Df3FC858E46215DfB9D5a49F328d] = true;
      whales[0x2dEe0Aee4579235c5A214bCB3593f68E2747daD8] = true;
      whales[0x35fe868dC54BcEEf4cf99bD0458B719236023a3C] = true;
      whales[0x2916F44AdECF33075Bc10f3b1c25f48f1F2fa429] = true;
      whales[0x0d0C2AE60Fe95A1404FeD866511eB9334d59fb89] = true;
      whales[0xF9841cE1e7d38838a33966731bb60781e4B8f313] = true;
      whales[0xF9EA1D29fcfc795B35c69614F69B91898641cc88] = true;
      whales[0xf496743F893De982b0b6D9eDd953A8Ac901C5C71] = true;
      whales[0x31ddDAFB8B67058aCb72580D55aF7D2cBef8C84c] = true;
}

    function addWhalesBatch2() isOwner() {
      whales[0xEDE16CF0A39aB898932aa7667fE2553Eb63D871E] = true;
      whales[0x5E8846a5323E0cc785A71958EdBdaeAd80c2319c] = true;
      whales[0x13Bad21d7c1fCd3f4AAc11Dc04E7800010C9f0Be] = true;
      whales[0x5BDE9926B871Adb44A3b7cD515102870Dfaead37] = true;
      whales[0xB27807E0D572A4192EA88008b20b56e3D9b76D65] = true;
      whales[0x6D9a5270917364a6a0620E44a839cEad2056D695] = true;
      whales[0x0ECf4c140161f7822956b61862f1bE30673A4e31] = true;
      whales[0xC8cF58eb7C5244C2Be20894a0a09C954E961A687] = true;
      whales[0x25eD77B488E54821A1aB72Ca92B474834c54D5E2] = true;
      whales[0x940Fdbc2A0389ec944B6b4422B42dBcb376D2fA1] = true;
      whales[0x64C4215dC38605A51515ab84330BC46Cd9857af3] = true;
      whales[0xA2a94d885B724eB0518BD42bE4c16e169693E30c] = true;
      whales[0x07E96D90a7D1651fE3fCE4426057970033930612] = true;
      whales[0xa617B5D3626E470422837A4515fDcD0817cf60a5] = true;
      whales[0x637F22E73eBdBd117F90245F6B4CeF1Ce3FC0352] = true;
      whales[0xAD0f5B1B5B235cD4F98bB512caf5882984F2fa4B] = true;
      whales[0x81F3F88975d98FbD4f221Fc36D967CE350292aDD] = true;
      whales[0xb5B451D23b73698aA0024C57Cf1Ce1C4168e4825] = true;
      whales[0xf99CD5e6ab337Df44bDaE0C6345cB360FB1029C1] = true;
      whales[0x146971697bB3E4E27f8722A2660F54A11fFD3536] = true;
      whales[0x3744188964F2275E4fA217270DFF5f769cf19F92] = true;
      whales[0xd2Ab7392De2Fb036D722D26f564777dD66cAA47C] = true;
      whales[0x3F867a6884aA8C44caF9D74de22EA14C81D16FE1] = true;
      whales[0x0b75FC8A02c8Efa9A14f90E10270fEC7b328Ddd0] = true;
      whales[0x6b910B98B3d705087788D5D574A24EcF38DeBa17] = true;
      whales[0xA64A0b0D58c3358Fb651338C9b1BB8e5CeD9701a] = true;
      whales[0x046773E701054A809c8Cc31B734559b4E79bA8dd] = true;
      whales[0xd4488eBC2460472ad84C7211503c1b7dD6FAB7dC] = true;
      whales[0x0558E71e116D38258C5ef8Db2823b12B304774EB] = true;
      whales[0x2dFfe20Bcc0C264bE6836d3dE408B29d8FC5BE40] = true;
      whales[0xed98cAeaE912Ff3BeeE3eE6e425B4B2d296d1411] = true;
      whales[0xDAF53FDD4558c78d4f2636f350c0F1B3AA2f766b] = true;
      whales[0x6e09D5ED5817EF683229A9e027bda51884Dc0eba] = true;
      whales[0xf1b9e71a6072Bf95494c12b638c4656156429377] = true;
      whales[0xacd781AbC94081bcb8CC5102FB34d9d7a9C1f6cC] = true;
      whales[0x5056bf217B55d50316D3BF9aaCC3E6837416c0F4] = true;
      whales[0xc5672Ac2CC6EFf535ad59b2CBE69FCa218340213] = true;
      whales[0x379E5Ea560Ef9A491a77f34b7FAe908c6CbC3a59] = true;
      whales[0xb7707F41e4D65BeAd42E8F271fCA31bE57F33d1C] = true;
      whales[0xeC4C69c5623De4040FB9AB6B94bcf7Aef6f7ff2A] = true;
      whales[0x3AeabDa89b6BC4668d7A08022c8C2c335cAd6049] = true;
      whales[0xe19E5E747aAcB98237650eaD582B13D11e8e84Fb] = true;
      whales[0x1C0b4Dcf07FFeF4F43BA923048A3724a10A75b97] = true;
      whales[0x2A30a3366348502eB2AC6BCB91f43afBD5DB3FE0] = true;
      whales[0x9eC805776f910789e7965c64Cee38cfe5d1b6d7E] = true;
      whales[0x843AeBb6a8D24EACDd9BceE2c291091EbBD2adFE] = true;
      whales[0x614430d5BE1A77265C735c1191465f002680a841] = true;
      whales[0x355f9394e8029aC54272B3F6d66D5d1C5f2C65ed] = true;
      whales[0xa60df09201c63d80A3CAECB49947BF92fBa68F75] = true;
      whales[0x9D086b43F7045D1379800297fCCE377d7Da239D4] = true;
      whales[0xFCF58De36B8940c74c8ff315e43d50542eC75FFa] = true;
      whales[0x349d0160582647796FE09BB7E9Deeffceee7f19A] = true;
      whales[0xa31033eEF19aDD0A306D8B70Bc666f122560dcc1] = true;
      whales[0x3B25Cad5e8443fbD29FE4D94109E2AD8aae1ABF6] = true;
      whales[0xfe4c938C9EB3cb0646ee74121FB6a1C393FA7553] = true;
      whales[0xE44Cc2DF4C37D9Db9a12927D196D1FaDF99deB68] = true;
      whales[0x18E1f7d105dC5868eBB5a8afD0332bD687c3176C] = true;
      whales[0x2c3CF65770993bE42105E3EACF7d9CbBE0C63Abc] = true;
      whales[0x843F9285e7C73bEac90c0b0591d3d86A6FfEEbFD] = true;
      whales[0x9Ca42Aa0A32c2167f20b22cc65AF1B4D0F6e1965] = true;
      whales[0x4d81571902B9c3bb76E43A3a2E5441E851c812c1] = true;
      whales[0x10cD994B2b234aCbE69b8acee41eCb3986b4ff1d] = true;
      whales[0x45eEff821dED7f50f75067359339cEb224FFF642] = true;
      whales[0xE3F07cbc2F400FB0607b265034Fb0F1C7f46fefb] = true;
      whales[0xF55097F7c00fDF40DEe8fBeEb56daDDF49d5Cd93] = true;
      whales[0x63b3370be4e551F467bfc116ca1fA278ee97fFC9] = true;
      whales[0x3aC727807EA9A842c467401e75580049ab0e60ab] = true;
      whales[0x1eA0680776d14347f6D0bEDAaca20366Ef3D7ce9] = true;
      whales[0xd3585B5C1711C80cE70eD9C541c8bB0c88DbEb75] = true;
      whales[0xa69D9f28e229035f419AdAc46669620335bBAfB3] = true;
      whales[0x9e7903ff99c9F5891D5A93F8F9Ec9E5f0cd97C83] = true;
      whales[0xA5F7353e312aCa6b335614B7103DFC4c38b52C66] = true;
      whales[0x91B839B304578f1f5F2C8b83D40d4897c2c52B0B] = true;
      whales[0xcf7284f6aFd94b91799d31E928528a8384d303F7] = true;
      whales[0x636af5182C8988C43f98B6cB14A860572ea71BB4] = true;
      whales[0x53ebbd8e727d98c264e8a9fECD53984cd25BC1a1] = true;
      whales[0xC8E8c505BaeDb158deb1553eD3E291e46BaD1cc2] = true;
      whales[0x52C5950F3d941a16d61c379278f924EB8595BcbE] = true;
      whales[0x793e4915e2319cC66B4Dd27E9215401ffB06899c] = true;
      whales[0x343453b76f316b14b51776118Ab5597d6b7574BA] = true;

    }

    function addWhalesBatch3() isOwner() {
      whales[0xc098C19f2A9B4944b04bcC38FA4c9EFc1a58329C] = true;
      whales[0x4B895FC40cB2c7BF2f1B577D559eCf0d3b343Bc6] = true;
      whales[0x52d022225D7C5e6565AC114D81644e772F4d51C1] = true;
      whales[0x82757148C48D447a4AFaCc884c958BC634d5Ff4D] = true;
      whales[0xeDB7aAFFDfad8651F3Ea0cc8E3201BCFfb4Ad2bE] = true;
      whales[0x919913bE60f80cd5B26cFeDA681259f91D53BDeE] = true;
      whales[0x40fe4AA7d5cf92566F8894715Da79A7d54F2Bbb3] = true;
      whales[0x8385927Ca373D5a19EC80f97f71026EE0dfCC3b3] = true;
      whales[0x6670e760D91955F47FaB2Bb674B479b864c481be] = true;
      whales[0x4202e9D1994f027a61c06BAd4c439f63600a9793] = true;
      whales[0x525Ff03A8Cf189ba4E6e0cD762fF93df60a811ae] = true;
      whales[0x489d3F01e3bd58ec3994CEd48737cD366628c579] = true;
      whales[0xeE3f50ad0D4Bc24A28401bf191B937E0e770E0D4] = true;
      whales[0xE0Cf06Af3b699799Fc7197506D7f3E899E2130D6] = true;
      whales[0xFF9279038Aa2966794355C8Fd8EE913d3391B806] = true;
      whales[0xb6CEcd96A66361b2ca19ef76B5313691540b4Ed9] = true;
      whales[0x2DDe9d4662948dfC9F0919040607401bA1C88D0d] = true;
      whales[0x7fb9083C15F97A5fbE271Df7ee4a6CBaacfcb6C8] = true;
      whales[0x8921A5d911F30ee47428d47bF3A0eEfdB09959D8] = true;
      whales[0xB6b9836eAd30F5F68f16D9434c33b8F8bA0948e2] = true;
      whales[0xa1890427BC341C50C73E32CECB38796889B69787] = true;
      whales[0x3F2b27D3C3889B5b2A69ff3241327b960038013F] = true;
      whales[0xEF49E3B91D9ec5c2671AAb431B8F824C7309d72b] = true;
      whales[0x5797db17B853F1a305d68b1D0806198A5a4B79f4] = true;
      whales[0x8751498c217faF89232F953b434E282A91c205C5] = true;
      whales[0x6Cd832E0b6EFAE31ACd16F119E8549E00bA51983] = true;
      whales[0x6E27f8c59111f6FCecC6c0eFB93A71Fc79fd41B1] = true;
      whales[0xC5febDbBd0Fc1531F79f23351FE6938EB31040b1] = true;
      whales[0x8711fda50E7A9cCD9dF8E6A2c40414550747d18e] = true;
      whales[0x38FC5B10CB78cbc060BE68Afed9ae0cd719fF9D4] = true;
      whales[0xa0B653fcdd9e8EfF8BcC2E797beCc5491015fDa2] = true;
      whales[0xb01ea84F4b6d362fe11E80c9934330C76459269b] = true;
      whales[0x5822C213B09475b1cef717A144BA7f1D5cA30e5E] = true;
      whales[0x9535e3DCFe5D03C8003a4d9BB8aabd37b1853E8F] = true;
      whales[0xF2421F6aB007DfCEBaA80b784dc0f19f2B72dd2A] = true;
      whales[0x5f92d0032420Da23a60c61979187C77A2dFeE24a] = true;
      whales[0xAa7de4449DE332806395AC37fc34BEDC03F35382] = true;
      whales[0xBFE73203966949B22841F4C20Cc51BfB330863ab] = true;
      whales[0x3E589eadfd4CB4DBAafC069Db58e894584A7327a] = true;
      whales[0x7939a20bb1f54F940D92b9Ec4f1C94D8CF63f3F9] = true;
      whales[0x0F8CF0C78B5A1C142aFA2724e105E2C17dedbeE7] = true;
      whales[0x93E513Da38ba88108d603CCc86bAE04034fbDe48] = true;
      whales[0x1808b2bD4B05BD1f4CA079BFC138f1cFc3D9b2E8] = true;
      whales[0x9257a4De9cf1c241950f5a822a6614Da562354Af] = true;
      whales[0xb96Ab00B619Ee8870EA0F86b3cd9ED3b3e46b718] = true;
      whales[0x64F2008c5cfB5613340839c0411EAb4Eeb38c767] = true;
      whales[0xf774d711D69f2C95b324014b8e639Bd8adA6DDf0] = true;
      whales[0x4de64aBcE748Fd34f4D7592AF1e59f5A194fB411] = true;
      whales[0x40BcA6a9a26153682027Bf3C2b1a1A554549C0df] = true;
      whales[0xF5334aBb26c96D5f955db681Ced3c2bD913cbfA6] = true;
      whales[0x3358a0079E44eD1a31aF018B550a1ED2C7688ab4] = true;
      whales[0x3E227cc330CA567459Dc40eb7fdC5eD2338Bf207] = true;
      whales[0x70723a026FB95Aa522964E96162fB1f7A834147b] = true;
      whales[0xb80D4Eb21391aCb6BeF230AD739597FA3728aD48] = true;
      whales[0x58F843F437D57Ed91Ba61D21E2CDA2DFAE7934D4] = true;
      whales[0xA77b6FB6162C5a6DDc241D606E6A0d30c8dDf1A9] = true;
      whales[0x7f83aC409a4c127DF7FCb8f1F24BE3410bB614b8] = true;
      whales[0x6177Ac2A40de846DBa465e928725577BF998fbf3] = true;
      whales[0x7a90A1A3DeE0856022c9FdAfDFD45C9DCa9B7eAb] = true;
      whales[0x7f4c3a5AF8860285F6e5373DE9B57755110Ad0b4] = true;
      whales[0x67dD0C7681979D68915d67FCd8fC3fd1e14e7716] = true;
      whales[0xdB8960D3dF226C49b41C8c618d13bAbBc2040C14] = true;
      whales[0xfd9921867571cfAab7C7561eb17776929D3fd6f6] = true;
      whales[0x0d01885DDEb3c4848A8eA1fDfF0fEc67CC9da993] = true;
      whales[0xbA0dabDfA4b3a656ECB7C5A413D35803C07dA526] = true;
      whales[0xD25652180fE283FFb2BB7f405ec9AD04AaBa82c7] = true;
      whales[0x2240A93255aD39bc93de370B29b1105Ae1151e86] = true;
      whales[0x9b8971e4871Ca33760a535191D9e6C97d89e1236] = true;
      whales[0xd3c2eE608f39D545dAC4c0Db163A736061106662] = true;
      whales[0xF3d5a28641497e67F9803767084bB65Fa9CA9cDd] = true;
      whales[0x00f27932404991A14DCE412013b737B673D9aB94] = true;
      whales[0x8E25457C2C55D6EA879904a568a9A30F5A8fDa2B] = true;
      whales[0xD70bcFb82db97569e9360E0174B319045127b5bA] = true;
      whales[0xc51f48A49c8c36fEa2044fB78D875C3c82006f93] = true;
      whales[0x44e2C2EcAb311820a01486e49e294B8E0563B049] = true;
      whales[0x77F036ab7aADA07C0273337888218e18637038d4] = true;
      whales[0x52e2BD11c36D1216F659407c4420763EDC25bDc8] = true;
      whales[0xE3D36B6575e98b539C6BA758a54Cd326a4666D99] = true;
      whales[0xE1b5547977Ad0e06b8fCD12Ca7a6b14EBb264CbA] = true;
      whales[0x4cE91B5c865f07a6c293536EadD7984b58Ba8171] = true;
    }

}
