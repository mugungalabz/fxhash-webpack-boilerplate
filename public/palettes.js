function get_random_palette(palettes, palette_set) {
    return palettes[palette_set][Math.floor(random() * palettes[palette_set].length)]
}
function get_palette() {
    palettes = get_palettes()
    let paletteTier = fxrand();
    let ULTRA = 0.01; //.01
    let SUPER = 0.05; //.04..
    let RARE = 0.15; //.14
    if (paletteTier <= ULTRA) {

        return get_random_palette(palettes, "Earthen")
        // return get_random_palette(palettes, "ultra_rare_palettes")
        // palettes = ultra_rare_palettes;
    } else if (paletteTier <= SUPER) {
        // return get_random_palette(palettes, "super_rare_palettes")
        return get_random_palette(palettes, "Metallic")
        // palettes = super_rare_palettes;
    } else if (paletteTier <= RARE) {
        // return get_random_palette(palettes, "rare_palettes")
        return get_random_palette(palettes, "normie_palettes")
        // palettes = rare_palettes;
    } else {
        return get_random_palette(palettes, "save_palettes")
        // return get_random_palette(palettes, "normie_palettes")
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
    let palettes = {}
    palettes["handmade"] = [
        {
            'name': 'Retro Jungle', 'colors': [
                "#DCB235",
                "#E2652B",
                "#A03535",
                "#4BA97C",
                "#2D9196",
                "#416AA0",
            ]
        }
    ]
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
        // { 'name': 'Spring Pastel II', 'colors': [color("#CDA755"), color("#9C8F3D"), color("#C1552F"), color("#4B5E20"), color("#19240B"),] },
        { 'name': 'Plum', 'colors': [color("#E9D8CB"), color("#D0B3B7"), color("#B78299"), color("#A76886"), color("#7F4C6C"), color("#5F3755"), color("#31242A"),] },
        { 'name': 'RisforrocketIIIIVUI', 'colors': [color("#D26E7B"), color("#D14253"), color("#C91532"), color("#88303C"), color("#35110F"),] },
        { 'name': 'moonpoolIIIVI', 'colors': [color("#BF9FB2"), color("#BFB287"), color("#94627E"), color("#4B7E82"), color("#54697B"), color("#3C2834"),] },
        { 'name': 'Space Flamingo', 'colors': [color("#EA9CB7"), color("#936DA6"), color("#BE5567"), color("#250000"),] },
        { 'name': 'lovetunnelII', 'colors': [color("#C8A072"), color("#A51830"), color("#991418"), color("#62222F"),] },
        { 'name': 'volcanoIII', 'colors': [color("#D68644"), color("#D03D67"), color("#D15932"), color("#AE5624"), color("#C73525"), color("#672834"), color("#1B0B11"),] },
        // { 'name': 'spectrum', 'colors': [color("#DFB492"), color("#E5827E"), color("#B58694"), color("#B46C79"), color("#9C576B"), color("#76435D"), color("#276176"), color("#0B253D"),] },
        { 'name': 'timeslipIIIII', 'colors': [color("#F5C5A9"), color("#C65661"), color("#C53C55"), color("#B92936"), color("#6F2825"),] },
        { 'name': 'Island Sunset', 'colors': [color("#F58473"), color("#D3B051"), color("#F5763F"), color("#E73B20"),] },
        { 'name': 'earth2moonIIIVI', 'colors': [color("#E1CC7B"), color("#933043"), color("#6E333F"), color("#83282D"), color("#3A2630"),] },
        { 'name': 'Radiation Poisoning', 'colors': [color("#DFD086"), color("#E3C476"), color("#B7AD73"), color("#B29961"), color("#7D6F38"), color("#555525"), color("#554619"), color("#444D1E"), color("#2C2908"),] },
        { 'name': 'Regal Song', 'colors': [color("#B1C9D3"), color("#A0BCD2"), color("#B0A7BA"), color("#847499"), color("#435480"), color("#4B446E"), color("#594659"),] },
        { 'name': 'Voluptuous Galaxy', 'colors': [color("#FFFCEC"), color("#FFF1CE"), color("#FFA3AA"), color("#FF8696"), color("#FF707E"), color("#FF458C"), color("#F70059"), color("#A80044"), color("#731D4D"), color("#6B001C"), color("#500D1F"),] },
        { 'name': 'Pale Night', 'colors': [color("#BAB286"), color("#9F9D81"), color("#6A6C65"), color("#041217"),] },
        { 'name': 'Hawaii', 'colors': [color("#E9E163"), color("#F4D939"), color("#F68058"), color("#E64093"), color("#C56291"), color("#EE8E2A"), color("#D64C5E"), color("#8C365E"),] },
        // { 'name': 'Spring Bloom', 'colors': [color("#EFE7E2"), color("#E8B7BD"), color("#D1CA4B"), color("#CE6E81"), color("#8BA84C"), color("#608743"), color("#3A3055"), color("#24211D"),] },
        { 'name': 'Prime', 'colors': [color("#F4CE9C"), color("#64A3AC"), color("#286E84"), color("#961412"), color("#65060A"),] },
        //    {'name' : 'Other Realm', 'colors' : [color("#E79749"),color("#E47A3D"),color("#D35635"),color("#AD5535"),color("#7C5644"),color("#515346"),color("#6B4A2E"),color("#503528"),color("#362624"),]},
        // {'name' : 'Yeti Taint', 'colors' : [color("#AED7F3"),color("#8AC2DF"),color("#6DB2D9"),color("#59ABD3"),color("#49A4CD"),color("#319BC5"),color("#038AB7"),color("#027CA9"),color("#015F86"),]},
        { 'name': 'Royal', 'colors': [color("#E2D396"), color("#325F98"), color("#58296D"), color("#140B04"),] },
        { 'name': 'Bachelorette Party', 'colors': [color("#DEB8DC"), color("#B496CF"), color("#D269A9"), color("#AD53A3"), color("#3F94BF"), color("#E35627"), color("#2E339F"), color("#351A6D"),] },
        // { 'name': 'Queen of Angels', 'colors': [color("#DBD8F6"), color("#AAD9FB"), color("#BDA2C1"), color("#DB8DB1"), color("#CB7693"), color("#975868"), color("#7F5765"), color("#6C505B")] },
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
        // { 'name': 'Insects', 'colors': [color("#DEA53D"), color("#2A6448"), color("#375524"),] },
        { 'name': 'Yeti Taint', 'colors': [color("#D5C5AA"), color("#6D9FB3"), color("#258AB3"), color("#264C6D"),] },
        { 'name': 'Soul Shambles', 'colors': [color("#929255"), color("#927F19"), color("#933513"), color("#7D3113"), color("#1C1D13"),] },

        // { 'name': 'Swamp Glow', 'colors': [color("#DE8657"), color("#739F6D"), color("#548A68"), color("#3D4E52"), color("#2A2D37"), color("#171A24"),] },
        { 'name': 'Wolverine', 'colors': [color("#EBD048"), color("#C5BE42"), color("#599891"), color("#4D7E6E"), color("#23250F"),] },
        { 'name': 'Mirkwood Fungus', 'colors': [color("#B0B87D"), color("#849680"), color("#6C8657"), color("#7F8918"), color("#506D51"), color("#5D751D"), color("#584139"), color("#304F16"),] },
        { 'name': 'Polar Reaches', 'colors': [color("#8EAEC5"), color("#8296B7"), color("#6C7498"), color("#4A6A99"), color("#626381"), color("#465880"), color("#294462"), color("#353648"), color("#1B2445"), color("#0D182A"), color("#150C0D"),] },
        { 'name': 'Eastern Galaxy', 'colors': [color("#FFFFFF"), color("#525464"), color("#6F4355"), color("#494E65"), color("#6F364B"), color("#513D4B"), color("#264558"),] },
        { 'name': 'Iron Planet', 'colors': [color("#BD9E86"), color("#DC322B"), color("#111114"),] },
        { 'name': 'Prom Queen', 'colors': [color("#D2A4B5"), color("#8196AF"), color("#B8425A"), color("#903E64"), color("#6A3C67"), color("#37356A")] },
        { 'name': 'Neptune', 'colors': [color("#3682AD"), color("#3187AA"), color("#6D3E93"), color("#5B388E"), color("#0D6D99"), color("#374187"), color("#0B6091"), color("#274B85"), color("#4F1F7F"), color("#3F1F7F"), color("#10427C"), color("#0F3277"), color("#0F2674"),] },
        { 'name': 'Human Casserole', 'colors': [color("#E8DDE2"), color("#C4BACE"), color("#4B98B6"), color("#8C845C"), color("#457467"), color("#B8292E"), color("#492B68"), color("#180E1F"),] },
        { 'name': 'Colour out of Space', 'colors': [color("#E7CF9F"), color("#52807D"), color("#69394B"),] },
        { 'name': 'Tango Nebulae', 'colors': [color("#FEFDFD"), color("#FCF0EF"), color("#FDE5E7"), color("#FCD1D2"), color("#FBBEC1"), color("#F6B7B3"), color("#F8ACAE"), color("#82BEB5"), color("#89B8B0"), color("#F6787E"), color("#98A8A2"), color("#F46064"), color("#F15255"), color("#E2585C"), color("#F1464D"), color("#E5414C"), color("#D73E45"), color("#CC3D42"), color("#BB363C"), color("#A83136"), color("#942D2F"), color("#7C2527"), color("#702124"), color("#491517"), color("#391213"), color("#181214"), color("#1A0909"), color("#0B0304"),] },
    ]
    const visionsThemes = ["Earthen", "Mystical", "Exotic", "Dystopian", "Polar", "Navajo", "Metallic"]
    visionsPalettes = [
        [
            {
                'name': "Merkingdom",
                'colors': ["#A3DDED", "#B9B98E", "#46A193", "#609F7A", "#31A1A3", "#006B64"
                ],
                "w": [0, 2],
                "p": [
                    [
                        1,
                        2
                    ]
                ],
                "c": [
                    [
                        4,
                        0
                    ]
                ]
            },
            {
                'name': "Mirkwood",
                'colors': ["#B0B87D",
                    "#9BC296",
                    "#6C8657",
                    "#506D51",
                    "#977667",
                    "#584139",
                    "#304F16"
                ],
                "p": [
                    [
                        3,
                        0
                    ]
                ],
                "w": [2],
                "s": [[3, 2, 0]],
                "c": [
                    [
                        4,
                        1
                    ],
                    [
                        1,
                        4
                    ]
                ]
            },
            {
                'name': "Deep Mirkwood",
                'colors': [
                    "#B0B87D",
                    "#849680",
                    "#6C8657",
                    "#7F8918",
                    "#506D51",
                    "#5D751D",
                    "#584139",
                    "#304F16"
                ],
                "p": [
                    [
                        7,
                        3
                    ],
                    [
                        6,
                        3
                    ]
                ],
                "w": [4],
                "s": [[0, 2, 3]],
                "c": [
                    [
                        1,
                        6
                    ]
                ]
            },
            {
                'name': "Spring Bloom",
                'colors': ["#F3B1A8", "#7CB7B9", "#869F4A", "#5D631E", "#5E3124", "#2E0A00"
                ], "w": [1], "s": [[5, 0, 1], [1, 0, 5]], "o": [0, 1, 5], "l": [0, 5], "p": [[5, 1]]

            },
            {
                'name': "Chlorophyll",
                'colors': ["#BFD28A", "#89C1C7", "#B68F9D", "#94C072", "#A0C108", "#716880", "#639A04"
                ],
                "p": [
                    [
                        2,
                        1
                    ],
                    [
                        5,
                        3
                    ],
                    [
                        6,
                        5
                    ],
                    [
                        6,
                        4
                    ]
                ],
                "w": [2, 3, 1],
                "l": [4, 1, 6],
                "s": [[5, 1, 0], [6, 3, 1], [4, 3, 1]],
                "b": [2, 3],
                "c": [
                    [
                        0,
                        6
                    ],
                    [
                        0,
                        5
                    ],
                    [
                        2,
                        0
                    ]
                ]
            },
            {
                'name': "Jungle",
                'colors': ["#D0924B", "#C37C6B", "#AA561B", "#566851", "#6D6718"
                ],
                "p": [
                    [
                        3,
                        2
                    ],
                    [
                        1,
                        3
                    ],
                    [
                        0,
                        2
                    ]
                ],
                "s": [[3, 0, 2], [2, 0, 1]],
                "c": [
                    [
                        2,
                        3
                    ],
                    [
                        0,
                        2
                    ]
                ]
            }
        ],
        [
            {
                'name': "Guardian Angel",
                'colors': ["#97C4F1", "#BCB2D4", "#B899A3", "#7897B1", "#A46870"],
                "p": [
                    [
                        4,
                        0
                    ],
                    [
                        3,
                        1
                    ]
                ],
                "s": [
                    [
                        0,
                        2,
                        3
                    ]
                ],
                "c": [
                    [
                        4,
                        0
                    ],
                    [
                        3,
                        2
                    ]
                ]
            },
            {
                'name': "Enchantment",
                'colors': ["#FFA784", "#DECB7D", "#D1847D", "#A3A07E", "#878878", "#DD6E22", "#D6521C", "#907C30"
                ],
                "c": [
                    [
                        1,
                        7
                    ],
                    [
                        7,
                        1
                    ]
                ],
                "p": [
                    [
                        4,
                        0
                    ],
                    [
                        6,
                        5
                    ],
                    [
                        4,
                        1
                    ]
                ],
                "w": [2],
                "l": [0],
                "s": [
                    [
                        6,
                        7,
                        0
                    ],
                    [
                        5,
                        2,
                        0
                    ],
                    [
                        3,
                        5,
                        0
                    ],
                    [
                        7,
                        0,
                        2
                    ]
                ]
            },
            {
                'name': "Afterlife",
                'colors': ["#a2cae3", "#91a4cc", "#7faec1", "#7c9cc8", "#758db3", "#a360a4", "#9b6d85", "#9b4172"
                ],
                "s": [
                    [
                        0,
                        5,
                        3
                    ],
                    [
                        0,
                        5,
                        2
                    ]
                ],
                "s": [[0, 5, 3]],
                "w": [5, 3, 0],
                "p": [
                    [
                        1,
                        5
                    ],
                    [
                        7,
                        0
                    ]
                ]
            },
            {
                'name': "Psychedelic",
                'colors': ["#A9DBCA", "#CE8470", "#A6A637", "#9D5B59", "#46806B", "#6A4283", "#797B15"
                ],
                "p": [
                    [
                        0,
                        4
                    ],
                    [
                        6,
                        2
                    ]
                ],
                "s": [
                    [
                        5,
                        1,
                        0
                    ],
                    [
                        0,
                        4,
                        5
                    ],
                    [
                        2,
                        0,
                        4
                    ],
                    [
                        4,
                        2,
                        1
                    ]
                ],
                "c": [
                    [
                        3,
                        0
                    ]
                ]
            },
            {
                'name': "Faerie Pool",
                'colors': ["#E5ABB5", "#C079A1", "#53A1A7", "#48243B"
                ],
                "p": [
                    [
                        3,
                        1
                    ]
                ],
                "w": [2],
                "c": [
                    [
                        0,
                        3
                    ]
                ],
                "s": [
                    [
                        3,
                        1,
                        2
                    ],
                    [
                        0,
                        3,
                        2
                    ]
                ]
            },
            {
                'name': "Petrified Rainbow",
                'colors': ["#FCDE96", "#5886C4", "#73328F", "#756054", "#88732B", "#651237"
                ],
                "p": [
                    [
                        4,
                        5
                    ]
                ],
                "w": [1],
                "c": [
                    [
                        3,
                        4
                    ],
                    [
                        2,
                        1
                    ]
                ],
                "s": [
                    [
                        5,
                        2,
                        1
                    ],
                    [
                        0,
                        1,
                        3
                    ]
                ]
            },
            {
                'name': "Emerald",
                'colors': [
                    "#5A847A",
                    "#946257",
                    "#6B2F25",
                    "#0C5649",
                    "#2B343D",
                    "#332429",
                    "#2F1111",
                    "#1F2809"
                ],
                "p": [
                    [
                        6,
                        1
                    ],
                    [
                        4,
                        2
                    ],
                    [
                        3,
                        5
                    ]
                ],
                "c": [
                    [
                        2,
                        1
                    ]
                ]
            },
            {
                'name': "Mad Hatter",
                'colors': ["#FCA678", "#C3C484", "#D4BE70", "#D8C753", "#E5966F", "#B3B181", "#C5B753", "#D59F53", "#DF844A", "#A17423", "#8A7232", "#9A7E35"
                ], "s": [[4, 5, 3], [3, 5, 10], [3, 0, 5]],
                "l": [4, 1, 3, 5, 6, 9], "w": [11, 8, 4], "o": [0, 4, 8, 9, 11], "p": [[9, 3], [5, 4]]
            },
            {
                'name': "Northern Lights",
                'colors': ["#C7A1DC", "#B0A9D9", "#C187CE", "#98ACC9", "#AA7FBC", "#B67AA7", "#8797A6", "#7E86B3", "#8F78A7", "#955883", "#667686", "#7D548E", "#736D6F", "#616079", "#663956", "#4D2B5C"
                ],
                "p": [
                    [
                        15,
                        0
                    ],
                    [
                        10,
                        5
                    ],
                    [
                        7,
                        0
                    ],
                    [
                        13,
                        7
                    ]
                ],
                "s": [
                    [
                        5,
                        7,
                        6
                    ],
                    [
                        8,
                        15,
                        2
                    ]
                ],
                "c": [
                    [
                        14,
                        3
                    ]
                ]
            }
        ],
        [
            {
                'name': "Paradise",
                'colors': ["#F198A8", "#F6A891", "#F28E87", "#D389A8", "#62859E", "#581B3A"
                ],
                "p": [
                    [
                        5,
                        3
                    ],
                    [
                        4,
                        5
                    ]
                ],
                "w": [3, 4],
                "s": [
                    [
                        4,
                        2,
                        3
                    ]
                ],
                "c": [
                    [
                        3,
                        4
                    ],
                    [
                        4,
                        0
                    ]
                ]
            },
            {
                'name': "Dandelion",
                'colors': [
                    "#F0DB80",
                    "#EFD53A",
                    "#C7AF31",
                    "#CAAC00",
                    "#AE8827",
                    "#B28F00",
                    "#787F20"
                ],
                "w": [0],
                "l": [1]
            },
            {
                'name': "Meadow",
                'colors': ["#FFE052", "#CBAF8D", "#F9D800", "#E5CD12", "#ECC700", "#C97E5E", "#9B8B7B", "#C89700"
                ]
            },
            {
                'name': "Rosepetal",
                'colors': [
                    "#C16DA9",
                    "#732758",
                    "#D6C9FF",
                    "#C6B9EF"
                ],
                "p": [
                    [
                        1,
                        2
                    ]
                ],
                "s": [
                    [
                        1,
                        2,
                        3
                    ]
                ]
            },
            {
                'name': "Flamingo",
                'colors': ["#FAC0CA", "#DF6B85", "#280F53"
                ]
            },
            {
                'name': "Hex",
                'colors': ["#F8D100", "#DE8650", "#260F05"
                ],
                "s": [[0, 2, 1], [2, 0, 1]]
            },
            {
                'name': "Sunspot",
                'colors': [
                    "#DEC2C1",
                    "#F5E18B",
                    "#D7C654",
                    "#C79989",
                    "#CAAC00",
                    "#464F00",
                    "#1C0B04"
                ]
            },
            {
                'name': "Lavender",
                'colors': [
                    "#E9D8CB",
                    "#D0B3B7",
                    "#B78299",
                    "#A76886",
                    "#7F4C6C",
                    "#5F3755",
                    "#31242A"
                ],
                "w": [0, 1],
                "s": [
                    [
                        1,
                        2,
                        3
                    ]
                ]
            },
            {
                'name': "Tropical Island",
                'colors': [
                    "#FFDF84",
                    "#F07E9C",
                    "#D9566B"
                ]
            },
            {
                'name': "Peach",
                'colors': [
                    "#F2D6A9",
                    "#F89683",
                    "#D8807F",
                    "#CF514C"
                ],
                "s": [
                    [
                        1,
                        2,
                        3
                    ]
                ]
            }
        ],
        [
            {
                'name': "Ghost",
                'colors': [
                    "#C2BDB0",
                    "#868079",
                    "#575654",
                    "#3E3D31",
                    "#040302"
                ],
                "p": [
                    [
                        4,
                        1
                    ]
                ],
                "s": [[2, 4, 0], [0, 3, 4]],
                "c": [
                    [
                        1,
                        4
                    ]
                ]
            },
            {
                'name': "Grimoire",
                'colors': [
                    "#907B4D",
                    "#76623C",
                    "#0B0B0B"
                ],
                "p": [
                    [
                        2,
                        0
                    ],
                    [
                        1,
                        2
                    ]
                ]
            },
            {
                'name': "Pale Rider",
                'colors': [
                    "#DBDFBF",
                    "#9A9A75",
                    "#50523D"
                ]
            },
            {
                'name': "Burial Grounds",
                'colors': [
                    "#D7B68A",
                    "#5D5551",
                    "#131115"
                ],
                "p": [
                    [
                        2,
                        0
                    ]
                ],
                "c": [
                    [
                        2,
                        1
                    ]
                ]
            },
            {
                'name': "Oilspill",
                'colors': [
                    "#7A7B7F",
                    "#585C5D",
                    "#201E29"
                ]
            },
            {
                'name': "Fumes",
                'colors': [
                    "#939A67",
                    "#414632",
                    "#232719"
                ]
            },
            {
                'name': "Vampire",
                'colors': [
                    "#BBB8A9",
                    "#898781",
                    "#7B7663",
                    "#59564B",
                    "#2C241B"
                ]
            },
            {
                'name': "Omen",
                'colors': [
                    "#D3B083",
                    "#B09063",
                    "#6D5C47",
                    "#1A140E"
                ],
                "c": [
                    [
                        1,
                        2
                    ],
                    [
                        3,
                        1
                    ]
                ],
                "p": [
                    [
                        3,
                        0
                    ]
                ]
            },
            {
                'name': "Despair",
                'colors': [
                    "#C2BDB0",
                    "#443E3E",
                    "#3E3D31"
                ]
            },
            {
                'name': "Witch Bog",
                'colors': ["#98C9E1", "#899FBE", "#807A93", "#53535D", "#3E2B32"
                ], "s": [[2, 4, 0], [0, 2, 4]],
                "p": [
                    [
                        4,
                        0
                    ],
                    [
                        0,
                        4
                    ]
                ]
            },
            {
                'name': "Ash",
                'colors': [
                    "#BEBBAC",
                    "#AFB0AA",
                    "#969590",
                    "#888F99",
                    "#2D272B"
                ],
                "p": [
                    [
                        4,
                        3
                    ]
                ],
                "c": [
                    [
                        2,
                        4
                    ]
                ]
            }
        ],
        [
            {
                'name': "Storm",
                'colors': ["#FACDA4", "#858192", "#341A56"
                ],
                "s": [[0, 1, 2]],
                "c": [
                    [
                        1,
                        0
                    ]
                ]
            },
            {
                'name': "Wizard Spell",
                'colors': ["#BCD6E3", "#A9C7E0", "#84749E", "#31497E", "#3B3169", "#4D354F"
                ],
                "p": [
                    [
                        1,
                        3
                    ]
                ],
                "s": [
                    [
                        1,
                        3,
                        2
                    ],
                    [
                        4,
                        2,
                        0
                    ]
                ],
                "c": [
                    [
                        0,
                        5
                    ]
                ]
            },
            {
                'name': "Violet",
                'colors': [
                    "#ACC4D0",
                    "#877CA4",
                    "#4B446E"
                ]
            },
            {
                'name': "Arctic",
                'colors': ["#DAD1C0", "#ADACAA", "#5F7E9A", "#467691", "#1B4B79"
                ]
            },
            {
                'name': "Ocean",
                'colors': ["#E0D9CB", "#527D97", "#2E537E", "#3A2E4C"
                ]
            },
            {
                'name': "Atlantis",
                'colors': ["#ADBEED", "#95C6EE", "#94C6CA", "#4A7AC2", "#65868A", "#6957A5", "#135A88", "#313670"
                ],
                "w": [3, 6],
                "l": [0, 1, 2]
            }
        ],
        [
            {
                'name': "Mountain",
                'colors': ["#CDC5BE", "#7190B7", "#5F889E", "#5F384E"
                ],
                "p": [
                    [
                        2,
                        0
                    ]
                ]
            },
            {
                'name': "Sky",
                'colors': [
                    "#A6C3E5",
                    "#6288AD",
                    "#4A6A99",
                    "#294462",
                    "#0D182A"
                ],
                "p": [
                    [
                        2,
                        0
                    ],
                    [
                        4,
                        2
                    ]
                ],
                "s": [[0, 4, 3]],
                "c": [
                    [
                        2,
                        1
                    ],
                    [
                        4,
                        0
                    ]
                ]
            },
            {
                'name': "Wendigo",
                'colors': ["#BEBEBE", "#9DADBF", "#7D91AD", "#605D6F"
                ],
                "p": [
                    [
                        2,
                        0
                    ]
                ],
                "c": [
                    [
                        0,
                        3
                    ]
                ]
            },
            {
                'name': "Heart of Animus",
                'colors': [
                    "#E4D8AE",
                    "#9A8F79",
                    "#788C97",
                    "#60626F",
                    "#404040",
                    "#212121"
                ],
                "p": [
                    [
                        5,
                        0
                    ],
                    [
                        1,
                        5
                    ]
                ],
                "w": [2, 3, 5],
                "c": [
                    [
                        0,
                        5
                    ]
                ],
                "s": [
                    [
                        2,
                        5,
                        0
                    ]
                ]
            },
            {
                'name': "Clouds",
                'colors': ["#BBBDC0", "#9BB0C7", "#7AA6C7", "#7795C6", "#584972"
                ],
                "p": [
                    [
                        4,
                        0
                    ]
                ],
                "c": [
                    [
                        1,
                        4
                    ]
                ]
            },
            {
                'name': "Dreamcatcher",
                'colors': ["#9DC5E0", "#82BBCE", "#B1909E", "#8E849C", "#85545F", "#65414E", "#244963", "#172743"
                ], "s": [[0, 3, 4], [7, 5, 0]], "w": [0, 1, 6]
            },
            {
                'name': "Rain Dance",
                'colors': ["#BCBEC3", "#ADB9C6", "#9DB1C7", "#859EBF", "#6BA8C6", "#7995C4", "#725C7B", "#666275", "#51416B", "#3E386E"
                ], "s": [[1, 9, 5]], "w": [4, 5, 9]
            },
            {
                'name': "Ancient land",
                'colors': ["#DFB99B", "#DCA282", "#C47A5F", "#AB6453"
                ], "s": [[0, 1, 3]]
            }
        ],
        [
            {
                'name': "Alchemy",
                'colors': ["#BAE2E8", "#A79719", "#8A7E03", "#5C5001"
                ],
                "p": [
                    [
                        2,
                        3
                    ],
                    [
                        3,
                        1
                    ]
                ],
                "s": [[1, 2, 0]],
                "w": [0, 1],
                "c": [
                    [
                        1,
                        2
                    ]
                ]
            },
            {
                'name': "Aged Bronze",
                'colors': [
                    "#FEDC9B",
                    "#694C06"
                ],
                "b": [1]
            },
            {
                'name': "Steel",
                'colors': ["#F5F6EF", "#C8C7C5", "#5C616B", "#3D4158", "#1A0D0B"
                ],
                "p": [
                    [
                        4,
                        1
                    ]
                ],
                "c": [
                    [
                        1,
                        4
                    ]
                ]
            },
            {
                'name': "Brass",
                'colors': [
                    "#DFD086",
                    "#554619"
                ],
                "p": [
                    [
                        1,
                        0
                    ]
                ],
                "c": [
                    [
                        1,
                        0
                    ]
                ]
            },
            {
                'name': "Graphite",
                'colors': ["#B6B6B6", "#9C9C9B", "#838280", "#696865", "#4D4D4B", "#30302F", "#131210"
                ],
                "p": [
                    [
                        5,
                        1
                    ],
                    [
                        6,
                        0
                    ]
                ],
                "s": [[0, 1, 6], [6, 4, 0]],
                "c": [
                    [
                        6,
                        0
                    ]
                ]
            },
            {
                'name': "Platinum",
                'colors': [
                    "#CDCAC1",
                    "#7A7B7F",
                    "#585C5D",
                    "#201E29"
                ],
                "p": [
                    [
                        0,
                        3
                    ],
                    [
                        3,
                        0
                    ]
                ],
                "c": [
                    [
                        3,
                        0
                    ],
                    [
                        1,
                        3
                    ]
                ]
            },
            {
                'name': "Copper",
                'colors': [
                    "#A37026",
                    "#7C4D12",
                    "#6B4A14"
                ]
            }
        ]
    ]
    sinCubePalettes = [
        {
            'name': "Hex",
            'colors': ["#F8D100", "#DE8650", "#260F05"
            ],
        },
        { 'name': 'spacestationpIIII', 'colors': [color("#EBC5DD"), color("#C297CC"), color("#52B5CE"), color("#4A3D7B"),] },
        { 'name': 'Space Flamingo', 'colors': [color("#EA9CB7"), color("#936DA6"), color("#BE5567"), color("#250000"),] },
        { 'name': 'Insects', 'colors': [color("#DEA53D"), color("#2A6448"), color("#375524"),] },
        { 'name': 'Spring Pastel II', 'colors': [color("#CDA755"), color("#9C8F3D"), color("#C1552F"), color("#4B5E20"), color("#19240B"),] },

    ]
    for (let i in visionsThemes) {
        palettes[visionsThemes[i]] = visionsPalettes[i]
    }
    return palettes
}