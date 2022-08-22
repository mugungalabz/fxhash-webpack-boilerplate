function get_random_palette(palettes, palette_set) {
    console.log("Hello.. get_random_palletes()")
    console.log("Object.keys(): " + Object.keys(palettes))
    return palettes[palette_set][Math.floor(random() * palettes[palette_set].length)]
}
function get_palette() {
    console.log("Hello.. get_pallete()")
    palettes = get_palettes()
    console.log("Object.keys(): " + Object.keys(palettes))
    let paletteTier = fxrand();
    let ULTRA = 0.01; //.01
    let SUPER = 0.05; //.04..
    let RARE = 0.15; //.14
    if (paletteTier <= ULTRA) {

        return get_random_palette(palettes, "ultra_rare_palettes")
        // palettes = ultra_rare_palettes;
    } else if (paletteTier <= SUPER) {
        return get_random_palette(palettes, "super_rare_palettes")
        // palettes = super_rare_palettes;
    } else if (paletteTier <= RARE) {
        return get_random_palette(palettes, "rare_palettes")
        // palettes = rare_palettes;
    } else {
        return get_random_palette(palettes, "normie_palettes")
        // palettes = normie_palettes;
    }
    // palettes = ultra_rare_palettes;
    // palettes = super_rare_palettes;
    // palettes = rare_palettes;
    // palettes = normie_palettes;
    // palettes = gchain_palettes;

    // paletteInx = ibtw(0, palettes.length)
    // palette = palettes[paletteInx]
}

function get_palettes() {
    console.log("Hello.. get_palletes()")
    let palettes = {}
    palettes["save_palettes"] = [
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
    palettes["rare_palettes"] = [
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
    palettes["super_rare_palettes"] = [
        //x {'name' : 'Glory Nebulae', 'colors' : [color("#C1BA9D"),color("#BB7575"),color("#816469"),color("#984454"),color("#3E6278"),color("#374A68"),color("#383254"),color("#280F36"),]},
        { 'name': 'Easter', 'colors': [color("#F6B9DA"), color("#EAB8E4"), color("#F5F29D"), color("#F4C3C8"), color("#F5CFB9"), color("#BBCBF4"), color("#DBAEEF"), color("#A7D9F4"), color("#F5DAA4"), color("#C8BCEF"), color("#D9F1A3"), color("#B0DFD6"), color("#B7EAB7"), color("#BFEFA4"),] },
        { 'name': 'Firebird', 'colors': [color("#EDD89E"), color("#DEA023"), color("#F5191D"), color("#0F0C0C"),] },
        //x {'name' : "Gollum's Pool", 'colors' : [color("#8b8155"),color("#a59750"),color("#5e663d"),color("#322f0b"),color("#151a04"),color("#1b6c75"),]},
        //x {'name' : 'Vampire', 'colors' : [color("#C11218"),color("#170001"),]},

    ]
    palettes["ultra_rare_palettes"] = [
        { 'name': 'Mellow Nebulae', 'colors': [color("#DFB492"), color("#E5827E"), color("#B46C79"), color("#76435D"), color("#276176"), color("#0B253D"),] },

    ]
    palettes["normie_palettes"] = [
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
    return palettes
}