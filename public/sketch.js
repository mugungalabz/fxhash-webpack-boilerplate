// these are the variables you can use as inputs to your algorithms
// console.log("HASH", fxhash)   // the 64 chars hex number fed to your algorithm
// con.sole.log("RAND", fxrand()) // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function. 
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }
var W
var H
var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var DIM = Math.min(WIDTH, HEIGHT)
var palettes; var palette; var clrs;
// var hashIdx = 1; var maxHashIdx; var minHashIdx =2;
var maskCanvas;
const minTriangleHeight = 1;
var horizonY;
var palettes; var paletteInx;
var clrs; var numOrbitals;
const orbitalOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var startAngleOptions;
var hanging = false;
// var startAngle;
var gradients = [];
var scalars = [];
var orbitals = [];
var radii = [];
var startingAngles = [];
var tAngles = [];
var recursionDepth;
var gradientFlipIndex;
var FILO;
var radialSymmetry;
var triangleAimMode;
const ASPECT = 16 / 9


// noprotect
function setup() {
	qoa_palettes = [
		{ 'name': 'Flamingo', 'colors': [color("#F2D6A9"), color("#F89683"), color("#D8807F"), color("#CF514C"),] },
		{ 'name': 'Rose Garden', 'colors': [color("#FFF8F5"), color("#F06E99"), color("#F02232"),] },
		{ 'name': 'Hawaii', 'colors': [color("#FE6579"), color("#FEAE00"), color("#F72447"), color("#694E50"),] },
		{ 'name': 'Miami', 'colors': [color("#FFFFDC"), color("#CB5A7A"), color("#5D276C"), color("#000000"),] },
		{ 'name': 'Thrall Soul', 'colors': [color("#A89852"), color("#514A33"), color("#000000"),] },

	]
	qoa_palettess = [
		// { 'name': 'Innocence', 'colors': [color("#FFDF84"), color("#F07E9C"), color("#D9566B"),] },
		{ 'name': 'qoa01p03', 'colors': [color("#FFDF55"), color("#A66B0F"), color("#000000"),] },
		// { 'name': 'Starburst', 'colors': [color("#FFCB00"), color("#FFA100"), color("#FF6C14"), color("#F44219"), color("#E40045"),] },
		{ 'name': 'qoa01p06', 'colors': [color("#F5A2A0"), color("#F2625C"), color("#2F2323"),] },
		// { 'name': 'Bouquet', 'colors': [color("#F8E1CB"), color("#C2586F"), color("#BB315C"), color("#AD152E"), color("#590E14"),] },
		{ 'name': 'qoa01p09', 'colors': [color("#FEDC2C"), color("#EFCA46"), color("#D8AD23"), color("#251C02"),] },
		// { 'name': "Tiger's Eye", 'colors': [color("#F7EA27"), color("#DC6D0C"), color("#1A1003"),] },
		{ 'name': 'qoa01p11', 'colors': [color("#FAF5D9"), color("#EA0000"), color("#000000"),] },
		{ 'name': 'qoa01p13', 'colors': [color("#FFECC1"), color("#67C5D1"), color("#0080A0"), color("#780000"),] },
		{ 'name': 'qoa01p15', 'colors': [color("#FBC365"), color("#F8582B"), color("#E5451E"), color("#161400"),] },
		// { 'name': 'Candle Glow', 'colors': [color("#FBE66E"), color("#1F1D15"),] },
		// { 'name': 'Spring Sky', 'colors': [color("#FF92BA"), color("#BE569D"), color("#4695D3"), color("#9A316A"), color("#370029"),] },
		{ 'name': 'qoa01p21', 'colors': [color("#FFFCC6"), color("#3DDCE5"), color("#00BEC7"), color("#6C0434"),] },
		{ 'name': 'qoa01p22', 'colors': [color("#F7F1AB"), color("#F4CD2A"), color("#FB5900"), color("#202000"),] },
		{ 'name': 'qoa01p24', 'colors': [color("#FFE8E6"), color("#DC5C81"), color("#DD1337"),] },
		{ 'name': 'qoa01p25', 'colors': [color("#97FABE"), color("#D58CC3"), color("#63276D"), color("#003941"),] },
		// { 'name': 'Devil Elf', 'colors': [color("#FFFFF1"), color("#E00000"), color("#003000"), color("#000000"),] },
		// { 'name': 'Nation', 'colors': [color("#FFFFF1"), color("#E00000"), color("#000000"),] },
		// { 'name': 'Steel', 'colors': [color("#FAE4B8"), color("#754B0D"), color("#02020C"),] },
		{ 'name': 'qoa01p30', 'colors': [color("#F375CF"), color("#04BBFC"), color("#000000"),] },
		// { 'name': 'Newborn', 'colors': [color("#FFF0C7"), color("#B36497"), color("#0095BB"), color("#00597E"),] },
		{ 'name': 'qoa01p32', 'colors': [color("#E4EEC7"), color("#0E0E0E"),] },
		{ 'name': 'qoa01p33', 'colors': [color("#FEFBD4"), color("#0B4661"), color("#123856"),] },
		{ 'name': 'qoa01p34', 'colors': [color("#FFFFD4"), color("#FFEE5F"), color("#449A78"), color("#284A32"),] },
		// { 'name': 'Solar Flare', 'colors': [color("#FBDC87"), color("#797540"), color("#22210A"),] },
		// { 'name': 'Moth', 'colors': [color("#FBDC87"), color("#797540"), color("#22210A"),] },
		{ 'name': 'qoa01p36', 'colors': [color("#FDD596"), color("#D40000"), color("#000000"),] },
		// { 'name': 'Static', 'colors': [color("#FBFCDF"), color("#B1AF99"), color("#706F5B"), color("#2A290E"),] },
		// { 'name': 'Tropic Fruit', 'colors': [color("#FCEA38"), color("#F8822A"), color("#EE2A3A"), color("#030A21"),] },
		{ 'name': 'qoa01p39', 'colors': [color("#9DD6E1"), color("#FB9292"), color("#682727"), color("#352F2B"),] },
		{ 'name': 'qoa01p40', 'colors': [color("#FFFAE6"), color("#6DBDE3"), color("#009FE1"), color("#005280"),] },
		// { 'name': 'Shriek', 'colors': [color("#FFDBAA"), color("#E9003B"), color("#8D133A"), color("#D80000"),] },
		{ 'name': 'qoa01p44', 'colors': [color("#FBE98E"), color("#E1B11F"), color("#6D8E3C"), color("#62882B"), color("#4B510B"), color("#5A2F00"),] },
		{ 'name': 'qoa01p46', 'colors': [color("#FFD596"), color("#FF7295"), color("#4491B6"), color("#981C61"), color("#3D132C"),] },
		{ 'name': 'qoa01p47', 'colors': [color("#FFD69F"), color("#FF728B"), color("#9B2975"), color("#7A0040"),] },
		{ 'name': 'qoa01p48', 'colors': [color("#FEDC9B"), color("#694C06"),] },
		{ 'name': 'qoa01p49', 'colors': [color("#EE8A98"), color("#E9798C"), color("#B04376"), color("#964278"), color("#7C264F"), color("#2B001C"),] },
		{ 'name': 'qoa01p50', 'colors': [color("#FF982E"), color("#C14242"), color("#000018"),] },
		{ 'name': 'qoa01p51', 'colors': [color("#FEEECB"), color("#75B4BF"), color("#095F83"), color("#00327C"),] },
		{ 'name': 'qoa01p53', 'colors': [color("#FFFFA0"), color("#FF9682"), color("#DF7F7D"), color("#D3463F"), color("#A41400"), color("#000000"),] },
		{ 'name': 'qoa01p55', 'colors': [color("#E7D9C2"), color("#D5839B"), color("#66265C"), color("#460033"),] },
		// { 'name': 'Iron', 'colors': [color("#FFBC77"), color("#957A53"), color("#151415"),] },
		{ 'name': 'qoa01p58', 'colors': [color("#FF4128"), color("#151721"),] },
		{ 'name': 'qoa01p59', 'colors': [color("#FFF5C7"), color("#DF656A"), color("#CB1226"),] },
		{ 'name': 'RandomPalette78', 'colors': [color("#D3B083"), color("#B09063"), color("#6D5C47"), color("#1A140E"),] },
		{ 'name': 'RandomPalette80', 'colors': [color("#F2D6A9"), color("#F89683"), color("#D8807F"), color("#CF514C"), color("#000000"),] },
		{ 'name': 'RandomPalette81', 'colors': [color("#25A8FC"), color("#ED0060"), color("#000025"),] },
		// { 'name': 'Mango', 'colors': [color("#FFD124"), color("#EB9215"), color("#0F1321"),] },
		{ 'name': 'RandomPalette84', 'colors': [color("#FDE4A2"), color("#36677A"), color("#746E00"), color("#0F0000"),] },
		// { 'name': 'Icycle', 'colors': [color("#FDE4A2"), color("#36677A"), color("#0F0000"),] },
		{ 'name': 'RandomPalette86', 'colors': [color("#FBDFBB"), color("#FD9DA0"), color("#C3667E"), color("#7F5182"), color("#040809"),] },
		{ 'name': 'RandomPalette87', 'colors': [color("#E59AD0"), color("#DB0020"), color("#00304B"),] },
		{ 'name': 'RandomPalette88', 'colors': [color("#FFDD5B"), color("#729556"), color("#885415"), color("#552500"), color("#262900"),] },
		{ 'name': 'RandomPalette89', 'colors': [color("#FFD430"), color("#E1672A"), color("#D4442A"), color("#CD2C37"), color("#C51846"), color("#0A1020"),] },
		{ 'name': 'RandomPalette90', 'colors': [color("#FFD430"), color("#E1672A"), color("#D4442A"), color("#C51846"), color("#0A1020"),] },
		// { 'name': 'Psychopsilociben', 'colors': [color("#FFD430"), color("#E1672A"), color("#C51846"), color("#0A1020"),] },
		{ 'name': 'RandomPalette94', 'colors': [color("#FDECBB"), color("#160D14"),] },
		// { 'name': 'Ravishing', 'colors': [color("#FFA7B4"), color("#F478A2"), color("#AA5A8E"), color("#89395F"), color("#310E23"),] },
		{ 'name': 'RandomPalette96', 'colors': [color("#FDFCFD"), color("#A8A8A8"), color("#5F5F5F"), color("#4A4A4A"), color("#080808"),] },
		{ 'name': 'RandomPalette97', 'colors': [color("#FCA100"), color("#E93B51"), color("#990000"), color("#2F0000"),] },
		{ 'name': 'RandomPalette98', 'colors': [color("#E6DDB2"), color("#000000"),] },
		{ 'name': 'qoa01p102', 'colors': [color("#CB1528"), color("#4D0F1B"), color("#100F11"),] },
		{ 'name': 'qoa01p103', 'colors': [color("#FFE0DB"), color("#DC7381"), color("#D01028"), color("#8A232F"),] },
		{ 'name': 'qoa01p104', 'colors': [color("#A89852"), color("#988C53"), color("#514A33"), color("#000000"),] },
		{ 'name': 'qoa01p107', 'colors': [color("#FF9889"), color("#D78786"), color("#CD635F"), color("#100C00"),] },
		{ 'name': 'qoa01p108', 'colors': [color("#FDC982"), color("#BD6B6A"), color("#B43931"), color("#8B0000"), color("#000000"),] },
		{ 'name': 'qoa01p110', 'colors': [color("#FDC982"), color("#BD6B6A"), color("#8B0000"),] },
		// { 'name': 'Blue Steel', 'colors': [color("#EFE7ED"), color("#6881C0"), color("#1E5090"),] },
		{ 'name': 'qoa01p112', 'colors': [color("#FF181F"), color("#A00F12"), color("#850B10"), color("#532D1F"), color("#422D1F"), color("#610407"), color("#490305"), color("#3A0203"),] },
		// { 'name': 'Blood Glow', 'colors': [color("#FF181F"), color("#850B10"), color("#532D1F"), color("#422D1F"), color("#610407"), color("#3A0203"),] },
		// { 'name': 'Dark Spell', 'colors': [color("#FF181F"), color("#422D1F"), color("#610407"), color("#3A0203"),] },
		// { 'name': 'Vampire', 'colors': [color("#CB1528"), color("#4D0F1B"), color("#100F11"),] },
		{ 'name': 'qoa01p116', 'colors': [color("#BBD5FD"), color("#7A94D4"), color("#000000"),] },
	]
	save_palettes = [
		{ 'name': 'dreamingcity', 'colors': [color("#E89B38"), color("#5CA3A6"), color("#020106"),] },
		{ 'name': 'solaris', 'colors': [color("#F1DFBD"), color("#EBD048"), color("#599891"), color("#6D9E3D"), color("#5D487A"),] },
		{ 'name': 'spaceChristmasIIIIII', 'colors': [color("#F5CAA3"), color("#F6B8AA"), color("#F698A5"), color("#F1899A"), color("#EA6D97"), color("#A05585"), color("#873C5F"), color("#3D2532"),] },
		{ 'name': 'spectrumIII', 'colors': [color("#DFB492"), color("#B46C79"), color("#76435D"), color("#276176"), color("#0B253D"),] },
		{ 'name': 'timeslipIIIV', 'colors': [color("#D0AB70"), color("#D08826"), color("#CB4855"), color("#B92424"), color("#280A00"),] },
		{ 'name': 'twilightsnowI', 'colors': [color("#F5963A"), color("#F5772F"), color("#F65D2C"), color("#EA4E2A"), color("#936F47"), color("#74613F"), color("#764941"), color("#64423D"), color("#3D2335"),] },
		{ 'name': 'Orange', 'colors': [color("#D4BC9D"), color("#E73B20"), color("#140F01"),] },
		{ 'name': 'spaceChristmasIII', 'colors': [color("#F3D0A7"), color("#F1899A"), color("#A05585"), color("#873C5F"), color("#3D2532"),] },
		{ 'name': 'squares', 'colors': [color("#92914C"), color("#6E6F67"), color("#92801A"), color("#933513"),] },
		{ 'name': 'spacestationpIIII', 'colors': [color("#EBC5DD"), color("#C297CC"), color("#52B5CE"), color("#4A3D7B"),] },
		{ 'name': 'timeslipIIII', 'colors': [color("#F5C5A9"), color("#D0942A"), color("#C65661"), color("#C53C55"), color("#B9293C"), color("#6F2825"),] },
		{ 'name': 'winternnI', 'colors': [color("#E89B4A"), color("#E47A3D"), color("#D35635"), color("#4C4E41"), color("#3E3138"), color("#2B1415"),] },
		{ 'name': 'Spring Pastel', 'colors': [color("#B9A955"), color("#C1552F"), color("#727B2B"), color("#4B5E20"),] },
		{ 'name': 'Spring Pastel II', 'colors': [color("#CDA755"), color("#9C8F3D"), color("#C1552F"), color("#4B5E20"), color("#19240B"),] },
		{ 'name': 'Plum', 'colors': [color("#E9D8CB"), color("#D0B3B7"), color("#B78299"), color("#A76886"), color("#7F4C6C"), color("#5F3755"), color("#31242A"),] },
		{ 'name': 'RisforrocketIIIIVUI', 'colors': [color("#D26E7B"), color("#D14253"), color("#C91532"), color("#88303C"), color("#35110F"),] },
		{ 'name': 'moonpoolIIIVI', 'colors': [color("#BF9FB2"), color("#BFB287"), color("#94627E"), color("#4B7E82"), color("#54697B"), color("#3C2834"),] },
		{ 'name': 'Space Flamingo', 'colors': [color("#EA9CB7"), color("#936DA6"), color("#BE5567"), color("#250000"),] },
		{ 'name': 'lovetunnelII', 'colors': [color("#C8A072"), color("#A51830"), color("#991418"), color("#62222F"),] },
		{ 'name': 'volcanoIII', 'colors': [color("#D68644"), color("#D03D67"), color("#D15932"), color("#AE5624"), color("#C73525"), color("#672834"), color("#1B0B11"),] },
		{ 'name': 'spectrum', 'colors': [color("#DFB492"), color("#E5827E"), color("#B58694"), color("#B46C79"), color("#9C576B"), color("#76435D"), color("#276176"), color("#0B253D"),] },
		{ 'name': 'timeslipIIIII', 'colors': [color("#F5C5A9"), color("#C65661"), color("#C53C55"), color("#B92936"), color("#6F2825"),] },
		{ 'name': 'Island Sunset', 'colors': [color("#F58473"), color("#D3B051"), color("#F5763F"), color("#E73B20"),] },
		{ 'name': 'earth2moonIIIVI', 'colors': [color("#E1CC7B"), color("#933043"), color("#6E333F"), color("#83282D"), color("#3A2630"),] },
		{ 'name': 'Radiation Poisoning', 'colors': [color("#DFD086"), color("#E3C476"), color("#B7AD73"), color("#B29961"), color("#7D6F38"), color("#555525"), color("#554619"), color("#444D1E"), color("#2C2908"),] },
		{ 'name': 'Regal Song', 'colors': [color("#B1C9D3"), color("#A0BCD2"), color("#B0A7BA"), color("#847499"), color("#435480"), color("#4B446E"), color("#594659"),] },
		{ 'name': 'Voluptuous Galaxy', 'colors': [color("#FFFCEC"), color("#FFF1CE"), color("#FFA3AA"), color("#FF8696"), color("#FF707E"), color("#FF458C"), color("#F70059"), color("#A80044"), color("#731D4D"), color("#6B001C"), color("#500D1F"),] },
		{ 'name': 'Pale Night', 'colors': [color("#BAB286"), color("#9F9D81"), color("#6A6C65"), color("#041217"),] },
		{ 'name': 'Hawaii', 'colors': [color("#E9E163"), color("#F4D939"), color("#F68058"), color("#E64093"), color("#C56291"), color("#EE8E2A"), color("#D64C5E"), color("#8C365E"),] },
		{ 'name': 'Spring Bloom', 'colors': [color("#EFE7E2"), color("#E8B7BD"), color("#D1CA4B"), color("#CE6E81"), color("#8BA84C"), color("#608743"), color("#3A3055"), color("#24211D"),] },
		{ 'name': 'Prime', 'colors': [color("#F4CE9C"), color("#64A3AC"), color("#286E84"), color("#961412"), color("#65060A"),] },
		//    {'name' : 'Other Realm', 'colors' : [color("#E79749"),color("#E47A3D"),color("#D35635"),color("#AD5535"),color("#7C5644"),color("#515346"),color("#6B4A2E"),color("#503528"),color("#362624"),]},
		// {'name' : 'Yeti Taint', 'colors' : [color("#AED7F3"),color("#8AC2DF"),color("#6DB2D9"),color("#59ABD3"),color("#49A4CD"),color("#319BC5"),color("#038AB7"),color("#027CA9"),color("#015F86"),]},
		{ 'name': 'Royal', 'colors': [color("#E2D396"), color("#325F98"), color("#58296D"), color("#140B04"),] },
		{ 'name': 'Bachelorette Party', 'colors': [color("#DEB8DC"), color("#B496CF"), color("#D269A9"), color("#AD53A3"), color("#3F94BF"), color("#E35627"), color("#2E339F"), color("#351A6D"),] },
		{ 'name': 'Queen of Angels', 'colors': [color("#DBD8F6"), color("#AAD9FB"), color("#BDA2C1"), color("#DB8DB1"), color("#CB7693"), color("#975868"), color("#7F5765"), color("#6C505B")] },
		{ 'name': 'Hellfire Galaxy', 'colors': [color("#B75555"), color("#B03C3C"), color("#863835"), color("#653C39"), color("#652520"), color("#3D2016"), color("#0E0B08"),] },
		{ 'name': 'Ancient Moons', 'colors': [color("#BF9B71"), color("#AE8455"), color("#B75555"), color("#B03C3C"), color("#652520"), color("#0E0B08"),] },
		{ 'name': 'Fertile Forest', 'colors': [color("#E9E18E"), color("#3B967F"), color("#008864"), color("#25331D"),] },
	]
	rare_palettes = [
		{ 'name': 'Noble Nebulae', 'colors': [color("#DFB492"), color("#E5827E"), color("#B58694"), color("#B46C79"), color("#9C576B"), color("#76435D"), color("#276176"), color("#0B253D"),] },
		{
			'name': 'Spider Wedding', 'colors': [color("#8E759C"), color("#7F7A9A"), color("#896392"), color("#7E6F8E"), color("#6F7C8F"), color("#795D85"), color("#815A77"), color("#636D77"), color("#5C617F"), color("#675877"), color("#6F536A"), color("#6A435E"), color("#4C5660"), color("#5A4065"), color("#545051"), color("#553D55"), color("#484757"), color("#4A2F40"), color("#3A2743"),],
			'light': [color("#000000"), color("#FFEAFF"), color("#FFFFFF")]
		},
		{ 'name': 'Heaven Song', 'colors': [color("#E7D4B2"), color("#CA6673"), color("#9E6D87"), color("#796B98"), color("#39819F"), color("#2F556E"), color("#223D4B"),] },
		{ 'name': 'Baby', 'colors': [color("#DEB8DC"), color("#B799CF"), color("#D269A9"), color("#3F94BF"), color("#3D4BB8"),] },

		//. {'name' : 'Karens Husbands Nightmare', 'colors' : [color("#F0EA91"),color("#A86EA3"),color("#965686"),color("#876355"),color("#78436E"),color("#505680"),color("#3D4260"),color("#612744"),color("#25253C"),]},
		//x {'name' : 'Summerwood', 'colors' : [color("#E2D894"),color("#E7D56F"),color("#A2833D"),color("#3D8669"),color("#3C7747"),color("#3F3C2D"),color("#1D281A"),color("#070202"),]},
		//. {'name' : 'Glacial Glow', 'colors' : [color("#D0FBF2"),color("#A0FBF3"),color("#8282A8"),color("#00D0CD"),color("#0697CC"),color("#077FA8"),]},
		//x {'name' : 'Ice Ball', 'colors' : [color("#BD6684"),color("#B4566D"),color("#B34556"),color("#943D42"),color("#374D86"),color("#2D3C70"),color("#2B3754"),color("#49303C"),color("#392B24")]},
		//x {'name' : 'Platinum', 'colors' : [color("#FFFCDF"),color("#F4E8BE"),color("#9A8F79"),color("#788C97"),color("#60626F"),color("#404040"),color("#212121"),]},
		//. {'name' : 'Celestial Savannah', 'colors' : [color("#E1B658"),color("#F3A326"),color("#C6784A"),color("#E86C22"),color("#A15F3C"),color("#26838A"),color("#8A5C20"),color("#AB141B"),color("#7A2022"),color("#643F15"),color("#284549")]},
		//. {'name' : 'Bloom Nebula', 'colors' : [color("#F5D18B"),color("#00806F"),color("#005859"),color("#520027"),]},
	]
	super_rare_palettes = [
		//x {'name' : 'Glory Nebulae', 'colors' : [color("#C1BA9D"),color("#BB7575"),color("#816469"),color("#984454"),color("#3E6278"),color("#374A68"),color("#383254"),color("#280F36"),]},
		{ 'name': 'Easter', 'colors': [color("#F6B9DA"), color("#EAB8E4"), color("#F5F29D"), color("#F4C3C8"), color("#F5CFB9"), color("#BBCBF4"), color("#DBAEEF"), color("#A7D9F4"), color("#F5DAA4"), color("#C8BCEF"), color("#D9F1A3"), color("#B0DFD6"), color("#B7EAB7"), color("#BFEFA4"),] },
		{ 'name': 'Firebird', 'colors': [color("#EDD89E"), color("#DEA023"), color("#F5191D"), color("#0F0C0C"),] },
		//x {'name' : "Gollum's Pool", 'colors' : [color("#8b8155"),color("#a59750"),color("#5e663d"),color("#322f0b"),color("#151a04"),color("#1b6c75"),]},
		//x {'name' : 'Vampire', 'colors' : [color("#C11218"),color("#170001"),]},

	]
	ultra_rare_palettes = [
		{ 'name': 'Mellow Nebulae', 'colors': [color("#DFB492"), color("#E5827E"), color("#B46C79"), color("#76435D"), color("#276176"), color("#0B253D"),] },

	]
	normie_palettes = [
		{ 'name': 'Mad Hatter', 'colors': [color("#C48461"), color("#999766"), color("#A69359"), color("#A99A45"), color("#B27759"), color("#8D8963"), color("#978555"), color("#9A8E44"), color("#A67D45"), color("#85795F"), color("#AD6A40"), color("#9A7E35"), color("#806D4D"), color("#A17423"), color("#6D6B5C"), color("#8A7232"), color("#916A25"), color("#7D5C3D"), color("#6C5C4C"), color("#82612B"), color("#6E552C"), color("#7B5419"), color("#8B5500"), color("#67481A"), color("#794B00"), color("#723600"), color("#5D2A00"), color("#2A2A2A"),] },
		{ 'name': 'Gemstone Nebulae', 'colors': [color("#F1DCC0"), color("#C43055"), color("#009FA2"), color("#492148"),] },
		{ 'name': 'Rainforest Galaxy', 'colors': [color("#F3EDBF"), color("#CDD05E"), color("#53834F"), color("#734566"), color("#31687D"), color("#42432A"), color("#0A0A0C"),] },
		{ 'name': 'Moon', 'colors': [color("#C2BDB0"), color("#868079"), color("#443E3E"), color("#3E3D31"), color("#040302"),] },
		{ 'name': 'Stardust', 'colors': [color("#E5827E"), color("#153D56"), color("#0B253D"),] },
		{ 'name': 'Sugar', 'colors': [color("#E3909F"), color("#C7829F"), color("#A25686"), color("#5F7F96"), color("#3B2733"),] },
		{ 'name': 'Neptune', 'colors': [color("#519FB7"), color("#6D3E93"), color("#0D6D99"), color("#374187"), color("#4F1F7F"), color("#0F3277"), color("#0B1A0B"),] },
		{ 'name': 'Insects', 'colors': [color("#DEA53D"), color("#2A6448"), color("#375524"),] },
		{ 'name': 'Yeti Taint', 'colors': [color("#D5C5AA"), color("#6D9FB3"), color("#258AB3"), color("#264C6D"),] },
		{ 'name': 'Soul Shambles', 'colors': [color("#929255"), color("#927F19"), color("#933513"), color("#7D3113"), color("#1C1D13"),] },

		//.    {'name' : 'Swamp Glow', 'colors' : [color("#DE8657"),color("#739F6D"),color("#548A68"),color("#3D4E52"),color("#2A2D37"),color("#171A24"),]},
		//.   {'name' : 'Wolverine', 'colors' : [color("#EBD048"),color("#C5BE42"),color("#599891"),color("#4D7E6E"),color("#23250F"),]},
		//. {'name' : 'Mirkwood Fungus', 'colors' : [color("#B0B87D"),color("#849680"),color("#6C8657"),color("#7F8918"),color("#506D51"),color("#5D751D"),color("#584139"),color("#304F16"),]},
		//. {'name' : 'Polar Reaches', 'colors' : [color("#8EAEC5"),color("#8296B7"),color("#6C7498"),color("#4A6A99"),color("#626381"),color("#465880"),color("#294462"),color("#353648"),color("#1B2445"),color("#0D182A"),color("#150C0D"),],
		//. {'name' : 'Eastern Galaxy', 'colors' : [color("#FFFFFF"),color("#525464"),color("#6F4355"),color("#494E65"),color("#6F364B"),color("#513D4B"),color("#264558"),]},
		//. {'name' : 'Iron Planet', 'colors' : [color("#BD9E86"),color("#DC322B"),color("#111114"),]},
		//.  'light': [color("#A6C3E5"),color("#6288AD"),]},
		//.   {'name' : 'Prom Queen', 'colors' : [color("#D2A4B5"),color("#8196AF"),color("#B8425A"),color("#903E64"),color("#6A3C67"),color("#37356A")]},
		//x {'name' : 'Neptune', 'colors' : [color("#3682AD"),color("#3187AA"),color("#6D3E93"),color("#5B388E"),color("#0D6D99"),color("#374187"),color("#0B6091"),color("#274B85"),color("#4F1F7F"),color("#3F1F7F"),color("#10427C"),color("#0F3277"),color("#0F2674"),]},
		//x {'name' : 'Human Casserole', 'colors' : [color("#E8DDE2"),color("#C4BACE"),color("#4B98B6"),color("#8C845C"),color("#457467"),color("#B8292E"),color("#492B68"),color("#180E1F"),]},
		//x    {'name' : 'Colour out of Space', 'colors' : [color("#E7CF9F"),color("#52807D"),color("#69394B"),]},
		//x {'name' : 'Tango Nebulae', 'colors' : [color("#FEFDFD"),color("#FCF0EF"),color("#FDE5E7"),color("#FCD1D2"),color("#FBBEC1"),color("#F6B7B3"),color("#F8ACAE"),color("#82BEB5"),color("#89B8B0"),color("#F6787E"),color("#98A8A2"),color("#F46064"),color("#F15255"),color("#E2585C"),color("#F1464D"),color("#E5414C"),color("#D73E45"),color("#CC3D42"),color("#BB363C"),color("#A83136"),color("#942D2F"),color("#7C2527"),color("#702124"),color("#491517"),color("#391213"),color("#181214"),color("#1A0909"),color("#0B0304"),]},
	]
	gchain_palettes = [
	]
	if (windowWidth / windowHeight < ASPECT) {
		W = windowWidth
		H = windowWidth / ASPECT
	} else {
		H = windowHeight
		W = windowHeight * ASPECT
	}
	console.log("W, H" + W + "," + H)
	createCanvas(W, H);
	// createCanvas(DIM, DIM);
	//   background(200);

	palettes = normie_palettes;
	let paletteTier = fxrand();
	let ULTRA = 0.01; //.01
	let SUPER = 0.04; //.04
	let RARE = 0.15; //.14
	if (paletteTier <= ULTRA) {
		palettes = ultra_rare_palettes;
	} else if (paletteTier <= SUPER) {
		palettes = super_rare_palettes;
	} else if (paletteTier <= RARE) {
		palettes = rare_palettes;
	} else {
		palettes = normie_palettes;
	}
	palettes = qoa_palettess
	//   palettes = ultra_rare_palettes;
	//   palettes = super_rare_palettes;
	//   palettes = rare_palettes;
	//   palettes = normie_palettes;
	// palettes = gchain_palettes;

	paletteInx = ibtw(0, palettes.length)
	palette = palettes[paletteInx]
	console.log("palette", palette)
	clrs = palettes[paletteInx]["colors"]
	// bgColor = rclr();
	bgColorIdx = ibtw(0, clrs.length)
	let bgColor = clrs[bgColorIdx]
	if (p(.5)) {
		bgColor = lighten(clrs[bgColorIdx], 30);
	} else {
		bgColor = darken(clrs[bgColorIdx], 30);
	}
	spaceMode = p(.25);
	let removeBackground = !spaceMode && p(.5);
	background(spaceMode ? 0 : bgColor);
	if (!spaceMode && removeBackground) {
		clrs.splice(bgColorIdx, 1)
	}
	const moonHash = fxrand()//

	hanging = p(.5);
	gradientFlipIndex = ibtw(0, 3);
	startAngleOptions = [0, PI / 2, PI, 3 * PI / 2];
	extraFourthAngles = [PI / 4, 3 * PI / 4, 5 * PI / 4, 7 * PI / 4];
	extraEightAngles = [PI / 8, 3 * PI / 8, 5 * PI / 8, 7 * PI / 8, 9 * PI / 8, 11 * PI / 8, 13 * PI / 8, 15 * PI / 8];
	startAngleOptions.push.apply(startAngleOptions, extraFourthAngles);
	startAngleOptions.push.apply(startAngleOptions, extraEightAngles);
	console.log("startAngles", startAngleOptions)
	startingAngles.push(startAngleOptions[ibtw(0, startAngleOptions.length)]);
	tAngles.push(rFrom(startAngleOptions));
	recursionDepth = 4;
	if (p(.05)) {
		recursionDepth = 2;
	} else if (p(.275)) {
		recursionDepth = 3;
	}
	triangleAimMode = 2
	if (p(.5)) {
		triangleAimMode = 1; //radial
	}
	let orbitalsPattern = ""
	let matchRadii = p(.5);
	let uniformAngle = p(.33);
	let uniformTangle = p(.00033);

	radialSymmetry = p(.10);
	FILO = p(.80);
	for (let i = 0; i < recursionDepth; i++) {
		scalars.push(fbtw(.1, .6));
		radii.push(matchRadii ? scalars[-1] : fbtw(.1, .6));
		orbitals.push(orbitalOptions[ibtw(0, orbitalOptions.length)]);
		startingAngles.push(uniformAngle ? startingAngles[0] : startAngleOptions[ibtw(0, startAngleOptions.length)]);
		tAngles.push(uniformTangle ? tAngles[0] : rFrom(startAngleOptions));
	}
	console.log("All tAngleS: " + tAngles)
	for (let i = orbitals.length - 1; i >= 0; i--) {
		orbitalsPattern += orbitals[i]
		if (i > 0) {
			orbitalsPattern += "-"
		}
	}

	window.$fxhashFeatures = {
		"Palette": palettes[paletteInx]["name"],
		// "Mode": hanging ? "Suspended" : "Floating",
		"Sky Mode": spaceMode ? "Space" : "Sky",
		"Orbital Pattern": orbitalsPattern,
		"Recusion Depth": int(recursionDepth),
		"Radial Symmetry": radialSymmetry ? "Yes" : "No",
		"Recursion Order": FILO ? "FILO" : "FIFO"
	}
}

function keyPressed() {
	if (keyCode == 83) {
		saveCanvas(fxhash, 'png');
	}
}
function draw() {

	// gradients.push(ringGradient());
	// gradients.push(ringGradient());
	// gradients.push(ringGradient());
	gradients.push(triangleGradient());
	gradients.push(ringGradient());
	gradients.push(triangleGradient());
	// image(gradients[0], 0, 0, DIM, DIM);
	console.log(window.$fxhashFeatures)
	mask = getMask(DIM);
	let center = [DIM / 2, DIM / 2]
	let rad = DIM / ibtw(2, 15);
	mask.triangle(...getTrianglePoints(center[0], center[1], rad, PI / 2))
	// mask.circle(center[0], center[1], rad);
	// console.log("recursionDepth in Draw: ", recursionDepth);
	// console.log("starting with ", scalars[recursionDepth - 1])
	if (!FILO) applyMask(gradients[0], mask);
	drawOrbitals(startingAngles[0], center, rad, recursionDepth);
	if (FILO) applyMask(gradients[0], mask);
	fxpreview();
	noLoop();
}
function getTrianglePoints(x, y, r, a) {

	return [x + r * cos(a), y + r * sin(a), x + r * cos(a + 2 * PI / 3), y + r * sin(a + 2 * PI / 3), x + r * cos(a + 4 * PI / 3), y + r * sin(a + 4 * PI / 3)]
}

function drawOrbitals(parentAngle, _center, _rad, _n) {
	if (_n <= 0) return;
	var currAngle = radialSymmetry ? parentAngle : startingAngles[_n - 1];
	var rotationRadians = (PI * 2) / orbitals[_n - 1];
	let radShift = _rad * .08
	let currRad = _rad
	let distShift = _rad * .1
	let currDist = _rad
	for (let o = 0; o < orbitals[_n - 1]; o++) {

		// let ox = _center[0] + _rad * cos(currAngle);
		// let oy = _center[1] + _rad * sin(currAngle);
		let ox = _center[0] + currDist * cos(currAngle);
		let oy = _center[1] + currDist * sin(currAngle);
		// let orad = _rad * scalars[_n - 1]
		let orad = currRad * scalars[_n - 1]
		let gIdx = _n % 2 == 1 ? gradientFlipIndex : 1;
		let newCenter = [ox, oy];
		if (!FILO) drawSingleOrbital(orad, newCenter, gIdx, _n);
		drawOrbitals(currAngle, newCenter, orad, _n - 1);
		if (FILO) drawSingleOrbital(orad, newCenter, gIdx, _n);
		currAngle += rotationRadians;
		currRad += radShift;
		currDist += distShift;
	}
}
function drawSingleOrbital(orad, _center, _gIdx, _depth) {
	let [ox, oy] = _center;
	// console.log("tAngles ", tAngles + " depth: " + _depth)
	// console.log("tAngles[_depth] ", tAngles[_depth])
	let a = tAngles[_depth]
	if (triangleAimMode == 1) {
		a = atan2(oy - DIM / 2, ox - DIM / 2)
	} else if (triangleAimMode == 2) {
		a = atan2(DIM / 2 - oy, DIM / 2 - ox)
	}

	if (orad < 20) {
		noStroke();
		fill(gradients[_gIdx].get(ox, oy));
		triangle(...getTrianglePoints(ox, oy, orad, a));
		// circle(ox, oy, orad)
	} else {
		let omask = getMask(DIM);
		omask.triangle(...getTrianglePoints(ox, oy, orad, a));
		// omask.circle(ox, oy, orad);
		applyMask(gradients[_gIdx], omask);
	}
}
function rFrom(l) {
	return l[ibtw(0, l.length)]
}
function getMask(DIM) {
	var mask = createGraphics(DIM, DIM);
	mask.noStroke();
	mask.fill(255);
	return mask;
}
function triangleGradient() {
	var gradientCanvas = createGraphics(DIM, DIM);
	const numRings = p(.05) ? clrs.length * ibtw(1, 4) : clrs.length * ibtw(5, 10);
	// console.log("numRings", numRings)
	var vertex = [ibtw(0, DIM), ibtw(0, DIM)];
	// console.log("gradient vertex", vertex)
	let startRadius = DIM * 5;
	// console.log("startRadius", startRadius)
	let ringWidth = floor(DIM / numRings) * ibtw(1, 6);
	ringWidth = min(DIM / 3, ringWidth);
	// console.log("ringWidth", ringWidth)
	let currRadius = startRadius;
	gradientCanvas.noStroke();
	var i = 0;
	let startAngle = rFrom(startAngleOptions)
	let currAngle = startAngle;
	let angleInc = (2 * PI) / 128;//16,32,52,104
	// for (let i = 0; i < numRings; i++) {
	while (currRadius > 0) {
		c1 = clrs[i % clrs.length];
		c2 = clrs[(i + 1) % clrs.length];
		let gradStartRadius = currRadius
		for (let r = 0; r < ringWidth; r++) {
			let diff = r / ringWidth;
			// console.log("diff", diff)
			currRadius = gradStartRadius - r;
			if (currRadius < 0) break;

			let c = lerpColor(c1, c2, diff);
			gradientCanvas.fill(c);
			// gradientCanvas.circle(vertex[0], vertex[1], currRadius, currRadius);
			gradientCanvas.triangle(...getTrianglePoints(vertex[0], vertex[1], currRadius, currAngle));
			// fill(c);
			// circle(vertex[0], vertex[1], currRadius);
			// console.log("currRaduis", currRadius)
		}
		i++;
		currAngle += angleInc;

	}
	return gradientCanvas;
}
function ringGradient() {
	var gradientCanvas = createGraphics(DIM, DIM);
	const numRings = clrs.length * ibtw(1, 4);
	// console.log("numRings", numRings)
	var vertex = [ibtw(0, DIM), ibtw(0, DIM)];
	// console.log("gradient vertex", vertex)
	let startRadius = DIM * 2.75;
	// console.log("startRadius", startRadius)
	let ringWidth = floor(DIM / numRings) * ibtw(1, 6);
	ringWidth = min(DIM / 3, ringWidth);
	// console.log("ringWidth", ringWidth)
	let currRadius = startRadius;
	gradientCanvas.noStroke();
	var i = 0;
	// for (let i = 0; i < numRings; i++) {
	while (currRadius > 0) {
		c1 = clrs[i % clrs.length];
		c2 = clrs[(i + 1) % clrs.length];
		let gradStartRadius = currRadius
		for (let r = 0; r < ringWidth; r++) {
			let diff = r / ringWidth;
			// console.log("diff", diff)
			currRadius = gradStartRadius - r;
			if (currRadius < 0) break;

			let c = lerpColor(c1, c2, diff);
			gradientCanvas.fill(c);
			gradientCanvas.circle(vertex[0], vertex[1], currRadius, currRadius);
			// fill(c);
			// circle(vertex[0], vertex[1], currRadius);
			// console.log("currRaduis", currRadius)
		}
		i++;

	}

	return gradientCanvas;
}
function initMask() {
	maskCanvas = createGraphics(DIM, DIM)
	maskCanvas.noStroke()
	maskCanvas.fill(255)
}
function applyMask(source, target) {
	let clone;
	(clone = source.get()).mask(target.get());
	image(clone, 0, 0);
}
function p(p) { return (xx() / 255.0) < p }
function rclr() {
	let idx = ibtw(0, clrs.length);

	if (idx >= clrs.length || idx < 0) return clrs[clrs.length - 1];
	return clrs[ibtw(0, clrs.length)]
}
function clr(c, a) {
	if (!c) return clr(clrs[0], a);
	return color(red(c), green(c), blue(c), a);
}
function xx() {
	var r = floor(fxrand() * 256)
	return r
}
function x() {
	var r = floor(fxrand() * 16);
	return r;
}
function ibtw(b, c) {
	let xxVar = xx();
	i = floor(b + (xxVar / 256.0) * abs(c - b))
	if (i >= c) return i;
	return i;
}
function fbtw(b, c) {
	f = (b + (xx() / 255.0) * abs(c - b)); return f;
}
function darken(c, n) {
	if (n == null) console.log("DARKEN PARM NOT SPECIFIED")
	return color(red(c) - n, green(c) - n, blue(c) - n)
}
function lighten(c, n) {
	if (n == null) console.log("LIGHTEN PARM NOT SPECIFIED")
	return color(red(c) + n, green(c) + n, blue(c) + n)
}
function hc(c) {
	return "#" + hex(red(c)).substring(6, 8) + hex(green(c)).substring(6, 8) + hex(blue(c)).substring(6, 8)
}

function biGradientCircle(x, y, startRadius, c1, c2, c3) {
	noStroke()
	let radius = startRadius;
	while (radius-- >= 0) {
		let diffa = (radius * 1.0) / (startRadius * 1.0);
		let c = lerpColor(c1, c2, diffa * diffa);
		fill(c);
		circle(x, y, radius);
	}
}
function fullGradientCircle(x, y) {

	let cnv = createGraphics(DIM, DIM)
	cnv.noStroke()
	var maxRadius = int(dist(x, y, x < DIM - x ? DIM : 0, y < DIM - y ? DIM : y)) + 5
	var bandCount = ibtw(1 * clrs.length, 3 * clrs.length + 1)
	var bandWidth = int((maxRadius + 5) / bandCount)
	let r = maxRadius;
	let cidx = 0;
	let c1 = clrs[cidx]
	let c2 = clrs[(cidx + 1) % clrs.length]
	console.log("c1:" + c1 + "c2" + c2)
	while (r >= 100) {
		bTally = 0;
		while (bTally <= bandWidth) {
			let diff = bTally / bandWidth
			let c = lerpColor(c1, c2, diff);
			cnv.fill(c)
			cnv.circle(x, y, r)
			bTally++;
			r--;
		}
		cidx = (cidx + 1) % clrs.length
		c1 = clrs[cidx]
		c2 = clrs[(cidx + 1) % clrs.length]
	}
	image(cnv, 0, 0)

}

function triGradientCircle(x, y, startRadius, c1, c2, c3) {
	noStroke()
	let radius = startRadius;
	while (radius >= 0) {
		let diffa = (radius * 1.0) / (startRadius * 1.0);
		let c0 = lerpColor(c1, c2, diffa * diffa);
		let diffb = (radius * 1.0) / (startRadius * 1.0);
		let c = lerpColor(c0, c3, diffb);
		fill(c);
		circle(x, y, radius);
		radius--;
	}
}

function singleSplitGradient(ymin, ymax, wmin, wmax) {
	let c1 = rclr();
	let c2 = rclr();
	let startY = ibtw(DIM * ymin, DIM * ymax);
	let currY = startY;
	let totalH = ibtw(DIM * wmin, DIM * wmax)
	barGradient(color(0, 0, 0), c1, totalH / 3, currY);
	currY += totalH / 3;
	barGradient(c1, c2, totalH / 3, int(currY));
	currY += totalH / 3;
	barGradient(c2, color(0, 0, 0), totalH / 3, int(currY));
}

function doubleSplitGradient(ymin, ymax, wmin, wmax) {
	let c1 = rclr();
	let c2 = rclr();
	let c3 = rclr();
	let startY = ibtw(DIM * ymin, DIM * ymax);
	let currY = startY;
	let totalH = ibtw(DIM * wmin, DIM * wmax)
	barGradient(color(0, 0, 0), c1, totalH / 4, currY);
	currY += totalH / 4;
	barGradient(c1, c2, totalH / 4, int(currY));
	currY += totalH / 4;
	barGradient(c2, c3, totalH / 4, int(currY));
	currY += totalH / 4;
	barGradient(c3, color(0, 0, 0), totalH / 4, int(currY));
}

function jailbars(c, w, fade, spacing, WIDTH, HEIGHT, sk) {
	console.log("jailbar width:" + w + ", WIDTH: " + WIDTH)
	var x = Math.floor(spacing / 2);
	c = rclr()
	while (x < WIDTH) {
		sk.strokeWeight(1);
		// let y_fade = Math.floor(random() * HEIGHT);
		// let rcolor;
		for (let i = 0; i <= fade; i++) {
			// rcolor = graphic.get(x + i, y_fade);
			sk.stroke(wAlpha(c, Math.floor(255 * cos((1 - (i / fade)) * PI))));
			sk.line(x + i, 0, x + i, HEIGHT);
			// rcolor = graphic.get(x + 2 * fade + w - i, y_fade);
			sk.stroke(wAlpha(c, Math.floor(255 * cos((1 - (i / fade)) * PI))));
			sk.line(x + 2 * fade + w - i, 0, x + 2 * fade + w - i, HEIGHT);
		}
		sk.fill(c);
		sk.noStroke();
		sk.rect(x + fade, 0, w, HEIGHT);
		x += 2 * fade + w + spacing;
	}
}
function wAlpha(c, a) {
	return color(red(c), green(c), blue(c), a);
}



