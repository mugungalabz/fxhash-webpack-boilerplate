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

// noprotect
function setup() {
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
	ab_palettes = [

		{ 'name': 'dorianIII', 'colors': [color("#D7B68A"), color("#7A6D62"), color("#5D5551"), color("#AE2824"), color("#131115"),] },
		{ 'name': 'earth2moonIII', 'colors': [color("#E1CC7B"), color("#933043"),] },
		{ 'name': 'whenworldscollideIV', 'colors': [color("#E0BCA4"), color("#AC3956"), color("#863C56"),] },
		{ 'name': 'whenworldscollideIVII', 'colors': [color("#E0BCA4"), color("#BA4D6E"), color("#AC3956"), color("#8F4963"), color("#873050"), color("#311B15"),] },
		{ 'name': 'robotdownIIIVI', 'colors': [color("#ECEFF3"), color("#E7CC74"), color("#C87093"), color("#2F6BAF"),] },
		{ 'name': 'moonpoolII', 'colors': [color("#B1888F"), color("#94627E"), color("#4B7E82"), color("#3C2834"),] },
		{ 'name': 'snowsetxII', 'colors': [color("#E3909F"), color("#E89F8A"), color("#E48780"), color("#C7829F"), color("#5F7F96"), color("#56243C"),] },
		{ 'name': 'snowsetxIII', 'colors': [color("#E3909F"), color("#C7829F"), color("#A25686"), color("#5F7F96"), color("#3B2733"),] },
		{ 'name': 'snowsetxIV', 'colors': [color("#E591A0"), color("#DA7D9A"), color("#B77094"), color("#A25686"), color("#563D48"),] },
		{ 'name': 'moonpoolIII', 'colors': [color("#B1888F"), color("#94627E"), color("#414355"), color("#3C2834"),] },
		{ 'name': 'moonpoolIIIV', 'colors': [color("#BF9FB2"), color("#BFB287"), color("#659F95"), color("#94627E"), color("#3C2834"), color("#282723"),] },
		{ 'name': 'supercolorIII', 'colors': [color("#DEB8DC"), color("#B799CF"), color("#D269A9"), color("#AD53A3"), color("#3F94BF"), color("#3D4BB8"), color("#351A6D"),] },
		{ 'name': 'spacestationpIIII', 'colors': [color("#EBC5DD"), color("#C297CC"), color("#52B5CE"), color("#4A3D7B"),] },
		{ 'name': 'martchronsII', 'colors': [color("#E4D0B3"), color("#9D9587"), color("#912513"), color("#3C0B04"), color("#010100"),] },
		{ 'name': 'workersII', 'colors': [color("#E1CC8B"), color("#E0A380"), color("#A42B31"),] },
		{ 'name': 'rrcoketII', 'colors': [color("#EBE8D9"), color("#AD5660"), color("#82363D"), color("#3C2425"),] },
		{ 'name': 'workersIII', 'colors': [color("#E1CC8B"), color("#A42B31"),] },
		{ 'name': 'dreamingcityIIIVI', 'colors': [color("#E7DBD0"), color("#599FA3"), color("#020106"),] },
		{ 'name': 'dreamsandghostsIIIVIIII', 'colors': [color("#DBDFBF"), color("#9A9A75"), color("#50523D"),] },
		{ 'name': 'dorianII', 'colors': [color("#D7B68A"), color("#C99E76"), color("#5D5551"), color("#AE2824"), color("#131115"),] },
		{ 'name': 'dorian', 'colors': [color("#D7B68A"), color("#5D5551"), color("#131115"),] },
		{ 'name': 'steppenII', 'colors': [color("#D5D5B5"), color("#B6B4A5"), color("#9E867B"), color("#796B56"), color("#2A0402"), color("#000000"),] },
		{ 'name': 'frillII', 'colors': [color("#E4C489"), color("#DFB462"), color("#D68755"), color("#D06A3C"),] },
		{ 'name': 'steppenIII', 'colors': [color("#D5D5B5"), color("#9E867B"), color("#2A0402"), color("#000000"),] },
		{ 'name': 'ChristmastreeI', 'colors': [color("#B75555"), color("#B03C3C"), color("#652520"), color("#0E0B08"),] },
		{ 'name': 'mycology', 'colors': [color("#BBB8A9"), color("#898781"), color("#7B7663"), color("#59564B"), color("#2C241B"),] },
		{ 'name': 'robotspace', 'colors': [color("#F4F4ED"), color("#BAB8B5"), color("#565960"), color("#393C4D"), color("#160C0B"),] },
		{ 'name': 'earth2mmoonII', 'colors': [color("#BAB286"), color("#9F9D81"), color("#6A6C65"), color("#041217"),] },
		{ 'name': 'clutch of vamps', 'colors': [color("#C2BDB0"), color("#868079"), color("#575654"), color("#3E3D31"), color("#040302"),] },
		{ 'name': 'fairyII', 'colors': [color("#AB7B87"), color("#9F656F"), color("#87404F"), color("#772539"), color("#56243C"),] },
		{ 'name': 'clutchofvampiresIII', 'colors': [color("#C2BDB0"), color("#443E3E"), color("#3E3D31"),] },
		{ 'name': 'japeIII', 'colors': [color("#EFE1BC"), color("#B88E37"), color("#554016"),] },
		{ 'name': 'matrixIV', 'colors': [color("#E9D8CB"), color("#D0B3B7"), color("#B78299"), color("#A76886"), color("#7F4C6C"), color("#5F3755"), color("#31242A"),] },
		{ 'name': 'matrixIVI', 'colors': [color("#E9D8CB"), color("#A76886"), color("#5F3755"), color("#31242A"),] },
		{ 'name': 'spectrumIIIV', 'colors': [color("#DFB492"), color("#B46C79"), color("#276176"),] },
		{ 'name': 'matrixII', 'colors': [color("#E9D8CB"), color("#A05569"), color("#804E6D"), color("#31242A"),] },
		{ 'name': 'spectrumII', 'colors': [color("#DFB492"), color("#E5827E"), color("#B46C79"), color("#76435D"), color("#276176"), color("#0B253D"),] },
		{ 'name': 'beatsoffieldIIIV', 'colors': [color("#DFD086"), color("#554619"),] },
		{ 'name': 'universeIIIVIII', 'colors': [color("#F3EDBF"), color("#42432A"),] },
		{ 'name': 'alienromance', 'colors': [color("#E2D3BE"), color("#D0AD9E"), color("#5A4156"), color("#0E1314"),] },
		{ 'name': 'singingcitadelIIIV', 'colors': [color("#E8B7BD"), color("#CE6E81"), color("#3A3055"),] },
		{ 'name': 'singingcitadelII', 'colors': [color("#EFE7E2"), color("#E8B7BD"), color("#CE6E81"), color("#3A3055"),] },
		{ 'name': 'colouroutofspaceIIIIV', 'colors': [color("#E7CF9F"), color("#52807D"), color("#69394B"), color("#141412"),] },
		{ 'name': 'colouroutofspaceIIIIVI', 'colors': [color("#E7CF9F"), color("#52807D"), color("#69394B"),] },
		{ 'name': 'ssscapeIIII', 'colors': [color("#BFB2A1"), color("#AC4A5E"), color("#8B3C5A"), color("#3C3866"),] },
		{ 'name': 'bumblebeeIII', 'colors': [color("#907B4D"), color("#76623C"), color("#0B0B0B"),] },
		{ 'name': 'nonsenseIIIVIIIII', 'colors': [color("#BB6EA9"), color("#B0559E"), color("#77386D"), color("#4F244D"), color("#370D28"),] },
		{ 'name': 'qoa01p04', 'colors': [color("#D41005"), color("#010000"),] },
		{ 'name': 'qoa01p48', 'colors': [color("#FEDC9B"), color("#694C06"),] },
		{ 'name': 'qoa01p02', 'colors': [color("#FFDF84"), color("#F07E9C"), color("#D9566B"),] },
		{ 'name': 'qoa01p24', 'colors': [color("#FFE8E6"), color("#DC5C81"), color("#DD1337"),] },
		{ 'name': 'RandomPalette78', 'colors': [color("#D3B083"), color("#B09063"), color("#6D5C47"), color("#1A140E"),] },
		{ 'name': 'RandomPalette86', 'colors': [color("#FBDFBB"), color("#FD9DA0"), color("#C3667E"), color("#7F5182"), color("#040809"),] },
		{ 'name': 'qoa01p55', 'colors': [color("#E7D9C2"), color("#D5839B"), color("#66265C"), color("#460033"),] },
		{ 'name': 'qoa01p35', 'colors': [color("#FBDC87"), color("#797540"), color("#22210A"),] },
		{ 'name': 'RandomPalette96', 'colors': [color("#FDFCFD"), color("#A8A8A8"), color("#5F5F5F"), color("#4A4A4A"), color("#080808"),] },
		{ 'name': 'qoa01p35', 'colors': [color("#FBDC87"), color("#797540"), color("#22210A"),] },
		{ 'name': 'qoa01p57', 'colors': [color("#FFBC77"), color("#957A53"), color("#151415"),] },
		{ 'name': 'RandomPalette79', 'colors': [color("#F2D6A9"), color("#F89683"), color("#D8807F"), color("#CF514C"),] },
		{ 'name': 'qoa01p106', 'colors': [color("#FFF3A0"), color("#FF9989"), color("#D78786"), color("#CD635F"), color("#100C00"),] },
		{ 'name': 'qoa01p110', 'colors': [color("#FDC982"), color("#BD6B6A"), color("#8B0000"),] },
		{ 'name': 'qoa01p107', 'colors': [color("#FF9889"), color("#D78786"), color("#CD635F"), color("#100C00"),] },
		{ 'name': 'RandomPalette94', 'colors': [color("#FDECBB"), color("#160D14"),] },
	]
	createCanvas(DIM, DIM);
	console.log("palette" + palette)
	palettes = normie_palettes;
	let paletteTier = fxrand();
	let ULTRA = 0.01; //.01
	let SUPER = 0.05; //.04..
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
	palettes = ab_palettes;
	//   palettes = super_rare_palettes;
	//   palettes = rare_palettes;
	//   palettes = normie_palettes;
	// palettes = gchain_palettes;

	paletteInx = ibtw(0, palettes.length)
	palette = palettes[paletteInx]
	console.log("palette", palette)
	colorMode(HSL)
	colors = getGlitchColorHSL(palette.n, "ANALOGOUS", { degree: palette.degrees, seedColor: [palette.startHue, 80 + int(random() * 20), 50] })
	clrs = palettes[paletteInx]["colors"]
	console.log("clrs:", clrs)

	// bgColor = rclr();
	bgColorIdx = ibtw(0, clrs.length)
	const moonHash = fxrand()//


	window.$fxhashFeatures = {
		"Palette": palettes[paletteInx]["name"],
		// "Mode": hanging ? "Suspended" : "Floating",
		// "Space Mode": spaceMode ? "Space" : "Sky",
	}
}

function keyPressed() {
	if (keyCode == 83) {
		saveCanvas(fxhash, 'png');
	}
}
function draw() {
	background(darken(rclr(), 15))
	fill(darken(rclr(), 10));
	background(rclr())
	fill(rclr())
	circle(DIM / 2, DIM / 2, DIM / 1.66);
	let pParms = {
		"density": 0.6,
		"drift": .1,
		"offset": 0.8,
		"padding": 0.25,
		"skipHoriz": false,
		"stroke": clrs[0],
		// "fill": clrs[0]
	}
	// parallelogram(0, 0, DIM, 0, DIM, DIM, 0, DIM, pParms);
	let w = DIM / 6;
	let d = w / 2
	// let h = w * 2.1; //was /1.33
	let h = w / 1.33; //was /1.33
	let x = 0 - fxrand() * w
	let y = d / 2;
	while (y < DIM + 1) {
		console.log("x:", x, "y:", y)
		// fill(0, 0, 0, 255)
		// circle(x, y, 10)
		let starty = y
		while (x < DIM) {
			pParms.stroke = clrs[0];
			// pParms.fill = darken(rclr(), 30);
			// console.log("x:", x)
			parallelogram(x, y, x + w / 2, y - d / 2, x + w, y, x + w / 2, y + d / 2, pParms);
			pParms.stroke = clrs[1];
			// pParms.fill = darken(rclr(), 30);
			parallelogram(x, y, x + w / 2, y + d / 2, x + w / 2, y + d / 2 + h, x, y + h, pParms);
			pParms.stroke = clrs[2];
			// pParms.fill = darken(rclr(), 30);
			parallelogram(x + w / 2, y + d / 2, x + w, y, x + w, y + h, x + w / 2, y + d / 2 + h, pParms);
			x += w;
		}
		y = starty + h + d / 2;
		x += w / 2;
		while (x > 0) {
			x %= w;
			x -= w;
		}
	}
	// }
	// colorMode(HSL)
	// for (let c of colors) { 
	// 	fill(c)
	// 	circle(random()*DIM, random()*DIM, random()*DIM/2)
	// }
	// console.log("first color: " + colors[0])
	// let angle = 3 * PI / 2;
	// let radius = DIM / 3
	// let vertex = { x: DIM / 2, y: DIM / 2 }
	// noStroke();
	// for (let i = 0; i < 200; i++) {
	// 	lineMist(colors[i % colors.length], random() * 5);
	// }
	// hairTriangle(vertex, angle, radius, radius * 10, colors[0])
	// // fill([colors[1][0], colors[1][1], colors[1][2], 1])
	// fill(0, 0, 0, .45)
	// noStroke()
	// triangle(
	// 	vertex.x + radius * cos(angle),
	// 	vertex.y + radius * sin(angle),
	// 	vertex.x + radius * cos(5 * PI / 6),
	// 	vertex.y + radius * sin(5 * PI / 6),
	// 	vertex.x + radius * cos(1 * PI / 6),
	// 	vertex.y + radius * sin(1 * PI / 6)
	// )

	// gradients.push(ringGradient());
	// gradients.push(ringGradient());
	// gradients.push(ringGradient());
	// // image(gradients[0], 0, 0, DIM, DIM);
	// console.log(window.$fxhashFeatures)
	// mask = getMask(DIM);
	// let center = [DIM / 2, DIM / 2]
	// let rad = DIM / ibtw(2, 5);
	// mask.circle(center[0],center[1],rad);
	// // console.log("recursionDepth in Draw: ", recursionDepth);
	// // console.log("starting with ", scalars[recursionDepth - 1])
	// if(!FILO) applyMask(gradients[0], mask);
	// drawOrbitals(startingAngles[0], center, rad, recursionDepth);
	// if(FILO) applyMask(gradients[0], mask);
	fxpreview();
	noLoop();
}
function lineMist(c, sw) {
	let x = random() * DIM * (1 / 2);// + DIM/4;
	let y = random() * DIM / 2 + DIM / 4;
	let len = random() * DIM;
	let lines = int(random() * 10 + 300);
	let n = 50;
	currSw = sw * random()
	currSwMultipler = .95 + random() * .1
	strokeWeight(currSw);
	c[3] = .2 + random() * .8
	stroke(c);
	let y1 = y
	let y2 = y
	let lCounter = 0;
	let rev = random() < .5;
	let lMultiplier = random() * .03 + .96
	let alphaMultiplier = random() * 3 + 1
	while (lCounter < lines) {
		line(x, y1, x + len, y1);
		if (lCounter > 0) line(x, y2, x + len, y2);
		// break;
		strokeWeight(random() * 4)
		y1 -= currSw;
		y2 += currSw;
		currSw *= currSwMultipler
		lCounter++;
		// c[3] = map(1-lCounter/lines, 0, 1, 0, 255);
		c[3] = Math.pow(lCounter / lines, alphaMultiplier)
		// console.log("color" + c)
		stroke(c)
		// x += random()*len*2-len/2
		x += random() * len / 20 - random() * len / (20 + random() * 20)
		len = (len * lMultiplier) + random() * .04
	}
	if (random() < .05) {
		c[3] = .05 + random() * .5
		stroke(c)
		line(x + len / 2, y1, x + len / 2, y2)
	}

}
function drawOrbitals(parentAngle, _center, _rad, _n) {
	if (_n <= 0) return;
	var currAngle = radialSymmetry ? parentAngle : startingAngles[_n - 1];
	var rotationRadians = (PI * 2) / orbitals[_n - 1];

	for (let o = 0; o < orbitals[_n - 1]; o++) {
		let ox = _center[0] + _rad * cos(currAngle);
		let oy = _center[1] + _rad * sin(currAngle);
		let orad = _rad * scalars[_n - 1]
		let gIdx = _n % 2 == 1 ? gradientFlipIndex : 1;
		let newCenter = [ox, oy];
		if (!FILO) drawSingleOrbital(orad, newCenter, gIdx);
		drawOrbitals(currAngle, newCenter, orad, _n - 1);
		if (FILO) drawSingleOrbital(orad, newCenter, gIdx);
		currAngle += rotationRadians;
	}
}
function drawSingleOrbital(orad, _center, _gIdx) {
	let [ox, oy] = _center;
	if (orad < 20) {
		noStroke();
		fill(gradients[_gIdx].get(ox, oy));
		circle(ox, oy, orad)
	} else {
		let omask = getMask(DIM);
		omask.circle(ox, oy, orad);
		applyMask(gradients[_gIdx], omask);
	}
}
function getMask(DIM) {
	var mask = createGraphics(DIM, DIM);
	mask.noStroke();
	mask.fill(255);
	return mask;
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

function getGlitchColorHSL(n, mode, options) {
	hslColors = [];
	colorMode(HSL)
	hslColors.push(options.seedColor ? options.seedColor : [random() * 360, 80 + int(random() * 20), 50])
	console.log("start hue:" + hslColors[0][0]);
	let degreeDiff;
	switch (mode) {
		case "ANALOGOUS":
			degreeDiff = options.degree ? options.degree : 360 / 12;
			// hslColors.push([random()*360,80+int(random()*20),50])
			for (let i = 0; i < n - 1; i++) {
				hslColors.push([(hslColors[i][0] + degreeDiff) % 360, hslColors[i][1], hslColors[i][2]])
			}
			break;
		case "SPLIT":
			degreeDiff = 360 / n;
			for (let i = 0; i < n - 1; i++) {
				hslColors.push([(hslColors[i][0] + degreeDiff) % 360, hslColors[i][1], hslColors[i][2]])
			}
			break;
		case "DIAD":
			hslColors.push([(hslColors[0][0] + 60) % 360, hslColors[0][1], hslColors[0][2]])
			break;
		case "COMPLIMENTARY":
			hslColors.push([(hslColors[0][0] + 180) % 360, hslColors[0][1], hslColors[0][2]])
			break;
		case "FETCH_COMPLIMENTARY":
			hslColors = [];
			degreeDiff = options.degree ? options.degree : 360 / 12;
			console.log("hue fulcrum: " + options.fulcrum)
			let fulcrum = (options.fulcrum + 180) % 360
			let hueStart = (fulcrum + degreeDiff * (n - 1) / 2) % (360);
			for (let i = 0; i < n; i++) {
				hslColors.push([hueStart, 100, 50]);
				hueStart += degreeDiff;
			}
			break;
		case "SPLIT_COMPLIMENTARY":
			hslColors.push([(hslColors[0][0] + 210) % 360, hslColors[0][1], hslColors[0][2]]);
			hslColors.push([(hslColors[0][0] + 150) % 360, hslColors[0][1], hslColors[0][2]]);
			break;
		case "RANDOM":
		default:
			for (let i = 0; i < n - 1; i++) {
				hslColors.push(hslVals = [random() * 360, 80 + int(random() * 20), 50])
			}
			break;
	}
	console.log("HSLColors creeated:" + hslColors)
	// hslVals = [random()*360,80+int(random()*20),50]
	// hslVals[0] = int(random()*360);
	return hslColors;
}
function getAngleBetweenPoints(p1, p2) {
	return atan2(p2.y - p1.y, p2.x - p1.x);
}

function getIntersectionOfTwoLines(l1, l2) {
	let x1 = l1.p1.x;
	let y1 = l1.p1.y;
	let x2 = l1.p2.x;
	let y2 = l1.p2.y;
	let x3 = l2.p1.x;
	let y3 = l2.p1.y;
	let x4 = l2.p2.x;
	let y4 = l2.p2.y;
	let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
	let numeratorI = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
	let numeratorII = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);;
	return ({ x: numeratorI / denominator, y: numeratorII / denominator })
	// let denominator = (l1.p1.x-l1.p2.x)*(l2.p1.y-l2.p2.y) - (l1.p1.y-l1.p2.y)*(l2.p1.x-l2.p2.x)
	// let numeratorI = (l1.p1.x*l1.p2.y-l1.p1.y*l1.p2.x)*(l2.p1.x-l2.p2.x) - (l1.p1.x-l1.p2.x)*(l2.p1.x*l2.p2.y-l2.p1.y*l2.p2.x);
	// let numeratorII = (l1.p1.x*l1.p2.y-l1.p1.y*l1.p2.x)*(l2.p1.y-l2.p2.y) - (l1.p1.y-l1.p2.y)*(l2.p1.x*l2.p2.y-l2.p1.y*l2.p2.x);;
	// return({x:numeratorI/denominator, y:numeratorII/denominator})
}
function hairTriangle(vertex, angle, innerRadius, outerRadius, c) {
	console.log("Drawing hair triangle")
	noFill()
	strokeWeight(1)
	stroke(255)
	let innerCorners = [
		vertex.x + innerRadius * cos(angle),
		vertex.y + innerRadius * sin(angle),
		vertex.x + innerRadius * cos((angle + 2 * PI / 3) % (2 * PI)),
		vertex.y + innerRadius * sin((angle + 2 * PI / 3) % (2 * PI)),
		vertex.x + innerRadius * cos((angle + 4 * PI / 3) % (2 * PI)),
		vertex.y + innerRadius * sin((angle + 4 * PI / 3) % (2 * PI)),
	]
	let corners = [
		vertex.x + outerRadius * cos(angle),
		vertex.y + outerRadius * sin(angle),
		vertex.x + outerRadius * cos((angle + 2 * PI / 3) % (2 * PI)),
		vertex.y + outerRadius * sin((angle + 2 * PI / 3) % (2 * PI)),
		vertex.x + outerRadius * cos((angle + 4 * PI / 3) % (2 * PI)),
		vertex.y + outerRadius * sin((angle + 4 * PI / 3) % (2 * PI)),
	]

	hairlineThroughVertex(
		vertex,
		{ x: corners[2], y: corners[3] },
		{ x: corners[0], y: corners[1] },
		{ x: innerCorners[2], y: innerCorners[3] },
		{ x: innerCorners[0], y: innerCorners[1] },
		outerRadius,
		c
	)
	hairlineThroughVertex(
		vertex,
		{ x: corners[4], y: corners[5] },
		{ x: corners[0], y: corners[1] },
		{ x: innerCorners[4], y: innerCorners[5] },
		{ x: innerCorners[0], y: innerCorners[1] },
		outerRadius,
		c
	)

}
function randomPointInCircle(vertex, r) {
	let radius = random() * r;
	let angle = random() * 2 * PI;
	return (
		{
			x: vertex.x + cos(angle) * radius,
			y: vertex.y + sin(angle) * radius
		}
	);
}

function hairlineThroughVertex(vertex, p1, p2, innerp1, innerp2, radii, c) {
	let distance = dist(p1.x, p1.y, p2.x, p2.y)
	// circle(p1.x, p1.y, 4)
	// circle(p2.x, p2.y, 4)
	let currDist = 0;
	let guidelineAngle = getAngleBetweenPoints({ x: p1.x, y: p1.y }, { x: p2.x, y: p2.y })
	console.log("guidelineAngle:", guidelineAngle)
	stroke(colors[2])
	let lCnt = 0;
	stroke(colors[Math.floor(random() * colors.length)][0], 20 + random(60), 20 + random(60), .35)
	strokeWeight(10)
	while (currDist < distance) {
		// console.log("corners[0]" + corners[0])
		stroke(colors[Math.floor(random() * colors.length)][0], 20 + random(60), 20 + random(60), .35)
		let currX = p1.x + currDist * cos(guidelineAngle)
		let currY = p1.y + currDist * sin(guidelineAngle)
		// circle(currX, currY, 5)
		// console.log("hairline: " + currX + "," + currY)
		let innerPoint = getIntersectionOfTwoLines(
			{
				p1: { x: innerp1.x, y: innerp1.y },
				p2: { x: innerp2.x, y: innerp2.y }
			},
			{
				p1: { x: vertex.x, y: vertex.y },
				p2: { x: currX, y: currY }
			});
		// console.log("curr: " + currX + "," + currY + " : " + "inner:" + innerPoint.x + "," + innerPoint.y);

		// line(currX, currY, innerPoint.x, innerPoint.y)
		lLine(
			{ x: currX, y: currY },
			innerPoint,
			35, [colors[Math.floor(random() * colors.length)][0], 20 + random(60), 20 + random(60), .35],
			// "STANDARD"
			// "BUNDLE_OF_THATCH",{}
			"RING",
			{
				density: .3,
				ringVariance: (0, 1)
			}
			// "GRAINY",
			// {
			// 	density : .05,
			// 	scatter: true
			// },
			// "SPIKEY",
			// {}
		);
		// line(currX, currY, vertex[0], vertex[1])
		currDist += 80;
		lCnt++;
		// if(lCnt > 20) break;
	}
}

function lLine(p1, p2, thickness, c, mode, options) {
	switch (mode) {
		case "STANDARD": standardLine(p1, p2, thickness, c, options);
			break;
		case "BUNDLE_OF_THATCH": thatchLine(p1, p2, thickness, c, options);
			break;
		case "RING": ringLine(p1, p2, thickness, c, options);
			break;
		case "GRAINY":
			options["dots"] = true;
			ringLine(p1, p2, thickness, c, options);
			break;
		case "SPIKEY":
			spikeyLine(p1, p2, thickness, c, options)
			break;
		default:
			console.log("MODE not handled for lLine: " + mode);
			break;
	}
}

function ringLine(p1, p2, thickness, c, options) {
	console.log("ringline options:", options)
	if (!options.density) {
		console.log("RINGLINE DEFAULT DENSITY")
		options["density"] = DEFAULT_DENSITY;
	}
	let angle = getAngleBetweenPoints(p1, p2);
	let d = dist(p1.x, p1.y, p2.x, p2.y);
	let area = d * thickness;
	let p = options.density * (options.dots ? area : d);
	// console.log("p,", p);
	if (options.fill) {
		fill(options.fill);
	} else {
		noFill();
	}
	if (options.dots) {
		noStroke();
		fill(c);
	}
	strokeWeight(1);
	stroke(c);
	fill([c[0], c[1], c[2], .04]);
	for (let i = 0; i < p; i++) {
		let b = options.scatter ? random() * thickness : 0;
		let m = random() * d;
		let v = {
			x: p1.x + cos(angle) * m + cos(angle + PI / 2) * b,
			y: p1.y + sin(angle) * m + sin(angle + PI / 2) * b,
		}
		let radius = options.ringVariance ? random(options.ringVariance[0], options.ringVariance[1]) * thickness : thickness;
		if (options.dots) radius = .2;
		circle(v.x, v.y, radius);
	}
}

function thatchLine(p1, p2, thickness, c, options) {
	for (let i = 0; i < thickness * 3; i++) {
		// r1 = randomPointInCircle(p1, sWeight);
		// r2 = randomPointInCircle(p2, sWeight);
		standardLine(
			randomPointInCircle(p1, thickness),
			randomPointInCircle(p2, thickness),
			1, c);
	}
}
function standardLine(p1, p2, thickness, c, options) {
	// console.log("standard line color:", c);
	strokeWeight(thickness);
	stroke(c);
	line(p1.x, p1.y, p2.x, p2.y);
}

function parallelogram(x1, y1, x2, y2, x3, y3, x4, y4, parms) {
	//calculate edge distances and angles
	let d1 = dist(x1, y1, x2, y2);
	let d2 = dist(x2, y2, x3, y3);
	let a1 = angleBetweenTwoPoints(x1, y1, x2, y2);
	let a2 = angleBetweenTwoPoints(x2, y2, x3, y3);
	if (parms.fill) {
		fill(parms.fill);
		beginShape();
		vertex(x1, y1)
		vertex(x2, y2)
		vertex(x3, y3)
		vertex(x4, y4)
		endShape(CLOSE);
	}
	if (parms.stroke) {
		stroke(parms.stroke);
	}
	// stroke(rclr());
	if (!parms.skipVert) {
		let numLines = round(d1 * parms.density)
		for (let i = 0; i < numLines; i++) {
			randomLine(x1, y1, d1, d2, a1, a2, parms.drift, parms.offset, parms.padding);
		}
	}
	if (!parms.skipHoriz) {
		let numLines = round(d2 * parms.density)
		for (let i = 0; i < numLines; i++) {
			randomLine(x2, y2, d2, d1, a2, a1 + PI, parms.drift, parms.offset, parms.padding);
		}

	}
}
function randomLine(x1, y1, d1, d2, a1, a2, drift, offset, padding) {
	strokeWeight(random());
	let d = random() * (d1 * (1 - padding)) + d1 * padding / 2 //include padding in starting pos
	let offseta = offset * d2 * random();
	let xa = x1 + cos(a1) * d + cos(a2) * offseta
	let ya = y1 + sin(a1) * d + sin(a2) * offseta
	d += random() * drift * d - drift / 2 * d;
	d = max(d, d1 * (padding / 2)); d = min(d, d1 * (1 - padding / 2)); //don't drift outside padding
	let offsetb = offset * d2 * random();
	let xb = x1 + cos(a1) * d + cos(a2) * (d2 - offsetb)
	let yb = y1 + sin(a1) * d + sin(a2) * (d2 - offsetb)
	line(xa, ya, xb, yb);
}

function parallelLine(x, y, d1, d2, a1, a2) {
	let d = random() * d1;
	let xa = x + cos(a1) * d;
	let ya = y + sin(a1) * d;
	line(xa, ya, xa + cos(a2) * d2, ya + sin(a2) * d2);
}

function angleBetweenTwoPoints(x1, y1, x2, y2) {
	return atan2(y2 - y1, x2 - x1);
}


