function get_random_palette(palettes, palette_set) {
    let pVal = random() * palettes[palette_set].length
    console.log("pVal: " + pVal + "len: " + palettes[palette_set].length)
    let paletteIdx = Math.floor(pVal)
    console.log("paletteIdx: " + paletteIdx)
    let selectedPalette = palettes[palette_set][paletteIdx]
    for (let i in selectedPalette["colors"]) {
        let c = selectedPalette["colors"][i]
        // print("type of color: " + typeof c)
        // console.log("color: " + selectedPalette["colors"][i])
        // console.log("lightnesS: " + lightness(selectedPalette["colors"][i]))
        // console.log("cJONS before: " + JSON.stringify(c))
        if (typeof c == "string") {
            let cc = color(c)
            selectedPalette["colors"][i] = color(hue(cc), saturation(cc), lightness(cc))
        }
        // console.log("cJONS after: " + JSON.stringify(selectedPalette["colors"][i]))
        if (saturation(selectedPalette["colors"][i]) < 70 && lightness(selectedPalette["colors"][i]) > 30) {
            // console.log("increase saturation ")
            selectedPalette["colors"][i] = saturate(selectedPalette["colors"][i], 90)
            // console.log("cJONS satur: " + JSON.stringify(selectedPalette["colors"][i]))
        }
        // console.log("tostring: " + selectedPalette["colors"][i].toString("hsla"))
    }
    return selectedPalette
}
function get_palette() {
    palettes = get_palettes()
    let paletteTier = fxrand();
    let ULTRA = 0.00; //.01
    let SUPER = 0.00; //.04..
    let RARE = 0.00; //.14
    if (paletteTier <= ULTRA) {

        return get_random_palette(palettes, "save_palettes")
        // return get_random_palette(palettes, "ultra_rare_palettes")
        // palettes = ultra_rare_palettes;
    } else if (paletteTier <= SUPER) {
        return get_random_palette(palettes, "super_rare_palettes")
        // return get_random_palette(palettes, "Earthen")
        // palettes = super_rare_palettes;
    } else if (paletteTier <= RARE) {
        // return get_random_palette(palettes, "aug22")
        // return get_random_palette(palettes, "Dystopian")
        return get_random_palette(palettes, "normie_palettes")
        // palettes = rare_palettes;
    } else {
        // return get_random_palette(palettes, "Exotic")
        return get_random_palette(palettes, "sinCube")
        // return get_random_palette(palettes, "qoa_palettess")
        // return get_random_palette(palettes, "save_palettes")
        // return get_random_palette(palettes, "Earthen")
        // return get_random_palette(palettes, "Navajo")
        // return get_random_palette(palettes, "aug22")
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
    colorMode(HSL)
    let palettes = {}
    const visionsThemes = ["Earthen", "Mystical", "Exotic", "Dystopian", "Polar", "Navajo", "Metallic"]
    palettes["man_palettes"] = [
        { 'name': "Blues", 'colors': ["#04062F", "#0E2973", "#0059FF", "#67CAFF", "#BFD2FF"] }
    ]
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
    palettes["aug22"] = [
        // { 'name': 'hawaiiagain', 'colors': ["#CDCDCD", "#EAB14B", "#E7883D", "#C73978",] },
        // { 'name': 'hawaiiagainII', 'colors': ["#CDCDCD", "#E99E62", "#EAB14B", "#C73978", "#DE6036", "#D23B61", "#9F377C",] },
        // { 'name': 'gold', 'colors': ["#EFCA6E", "#D2A657", "#B9883D", "#AB823E", "#A0763D", "#A06D31",] },
        // { 'name': 'goldII', 'colors': ["#EFCA6E", "#CF9E48", "#A0763D", "#AF6F2C", "#876E44",] },
        // { 'name': 'goldIII', 'colors': ["#EFCA6E", "#CF9E48", "#A0763D", "#AF6F2C",] },
        // { 'name': 'goldIV', 'colors': ["#EFCA6E", "#CF9E48", "#AF6F2C",] },
        // { 'name': 'golddark', 'colors': ["#EFCA6E", "#D2A657", "#B9883D", "#96703D", "#885921", "#603D11", "#3D2508", "#1C1302",] },
        // { 'name': 'golddarkII', 'colors': ["#EFCA6E", "#B9883D", "#96703D", "#603D11", "#1C1302",] },
        // { 'name': 'golddarkIII', 'colors': ["#EFCA6E", "#B9883D", "#96703D", "#1C1302",] },
        // { 'name': 'bronze', 'colors': ["#DDD1B8", "#8D6D31", "#121011",] },
        // { 'name': 'forestbronze', 'colors': ["#C08B3D", "#3D5627", "#101803",] },
        // { 'name': 'forestbronzeII', 'colors': ["#C08B3D", "#A07032", "#606E41", "#6F4F17", "#3D5627", "#1D250C",] },
        // { 'name': 'forestbronzeIII', 'colors': ["#C08B3D", "#A88B44", "#708656", "#A07032", "#565825", "#603E11", "#2E4025", "#1D250C", "#0E1304",] },
        // { 'name': 'forestbronzeIV', 'colors': ["#C08B3D", "#A88B44", "#708656", "#565825", "#2E4025", "#1D250C",] },
        // { 'name': 'forestbronzeV', 'colors': ["#C08B3D", "#A88B44", "#708656", "#2E4025",] },
        // { 'name': 'brazil', 'colors': ["#C08B3D", "#708656", "#A07032", "#3D5627", "#0E1304",] },
        // { 'name': 'ufodisc', 'colors': ["#DFD3AE", "#D2C298", "#786F92", "#346F7A", "#244969", "#244056", "#092024",] },
        // { 'name': 'ufodiscII', 'colors': ["#DFD3AE", "#D2C298", "#786F92", "#346F7A", "#244969", "#092024",] },
        // { 'name': 'ufodiscIII', 'colors': ["#DFD3AE", "#786F92", "#346F7A", "#244969", "#242521",] },
        // { 'name': 'ufodiscIV', 'colors': ["#DFD3AE", "#786F92", "#346F7A", "#244969",] },
        // { 'name': 'ufodiscV', 'colors': ["#DFD3AE", "#346F7A", "#244969",] },
        // { 'name': 'pusikat', 'colors': ["#DAD083", "#EDBC7F", "#D2CA6D", "#DCB76E", "#E99E6E", "#D28056", "#B96A3D", "#D2473D", "#B95633", "#C34430", "#252525", "#282511",] },
        // { 'name': 'pusikatII', 'colors': ["#DAD083", "#D2CA6D", "#E99E6E", "#D28056", "#D2473D", "#C34430", "#282511",] },
        // { 'name': 'pusikatIII', 'colors': ["#DAD083", "#E99E6E", "#D2473D", "#C34430", "#282511",] },
        // { 'name': 'pusikatIV', 'colors': ["#D2CA6D", "#E99E6E", "#CA7349", "#D2473D", "#BA3D25", "#4D4B25", "#252525",] },
        // { 'name': 'pusikatMin', 'colors': ["#D2CA6D", "#D2473D", "#252525",] },
        // { 'name': 'gatsby', 'colors': ["#E6DCBD", "#D2A93A", "#3D2508",] },
        // { 'name': 'gatsbyII', 'colors': ["#E6DCBD", "#E0BA40", "#D2A93A", "#6A5017", "#573D10", "#452E0B", "#30230C",] },
        // { 'name': 'gatsbyIII', 'colors': ["#E6DCBD", "#E0BA40", "#6A5017", "#30230C",] },
        // { 'name': 'sanfran', 'colors': ["#F3E393", "#EDC763", "#E7AA50", "#E2883C", "#58441C", "#3D2508",] },
        // { 'name': 'butterfly', 'colors': ["#D79437", "#B9863A", "#9D6C29", "#766630", "#605725", "#563D11", "#241F0C",] },
        // { 'name': 'butterflyII', 'colors': ["#D2983D", "#6F6029", "#241F0C",] },
        // { 'name': 'holmes', 'colors': ["#EFC97E", "#74909F", "#2B4A66",] },
        // { 'name': 'holmesII', 'colors': ["#EFC97E", "#B9A16A", "#566356", "#2B4A66",] },
        // { 'name': 'lifeb4', 'colors': ["#F5F4CB", "#D49E39", "#E23B58", "#E35028",] },
        // { 'name': 'lifeb4II', 'colors': ["#F5F4CB", "#F1D776", "#E9A0A3", "#97C4C7", "#BFD08B", "#D49E39", "#62959C", "#E23B58", "#BA3749", "#DE3823", "#659334",] },
        // { 'name': 'lifeb4III', 'colors': ["#F5F4CB", "#EFD1C5", "#64A4B8", "#D49E39", "#E1466E", "#E35028", "#DE3823", "#5C8A2C",] },
        // { 'name': 'lifeb4IV', 'colors': ["#F5F4CB", "#EFD1C5", "#64A4B8", "#D49E39", "#E1466E", "#E23B58", "#E35028", "#DE3823", "#5C8A2C", "#335515", "#250301",] },
        // { 'name': 'lifeb4V', 'colors': ["#F5F4CB", "#64A4B8", "#D49E39", "#E1466E", "#E35028", "#DE3823", "#5C8A2C",] },
        // { 'name': 'lifeb4VI', 'colors': ["#F5F4CB", "#64A4B8", "#D49E39", "#E1466E", "#DE3823",] },
        // { 'name': 'lifeb4VII', 'colors': ["#F5F4CB", "#64A4B8", "#D49E39", "#E1466E",] },
        // { 'name': 'lifeb4VIII', 'colors': ["#F5F4CB", "#64A4B8", "#E1466E",] },
        // { 'name': 'mopop', 'colors': ["#EAE3C5", "#4A99AC", "#33778F",] },
        // { 'name': 'mopopII', 'colors': ["#E8F4F5", "#E19A9F", "#E6B741", "#4A99AC", "#A5A246", "#D9713C",] },
        // { 'name': 'mopopIII', 'colors': ["#E0DFC5", "#E19A9F", "#E6B741", "#4A99AC", "#A5A246", "#D9713C",] },
        // { 'name': 'umapopfest', 'colors': ["#E0D3CA", "#DF7C98", "#E18E35", "#367DAE", "#DD5028", "#439359",] },
        // { 'name': 'umapopfestII', 'colors': ["#E0D3CA", "#DF7C98", "#D68C6F", "#E18E35", "#367DAE", "#DD5028", "#120100",] },
        // { 'name': 'umapopfestIII', 'colors': ["#E0D3CA", "#DF7C98", "#D68C6F", "#E18E35", "#367DAE", "#120100",] },
        // { 'name': 'umapopfestIV', 'colors': ["#E0D3CA", "#DF7C98", "#E18E35", "#367DAE",] },
        // { 'name': 'africa', 'colors': ["#DFD6CA", "#ECBB40", "#E2403D", "#27221F",] },
        // { 'name': 'buddy', 'colors': ["#97883D", "#C95B29", "#25211F",] },
        // { 'name': 'bauhaus', 'colors': ["#E8E2DD", "#D6919F", "#C78065", "#C85530",] },
        // { 'name': 'bauhausII', 'colors': ["#E8E2DD", "#D6919F", "#C85530", "#232122",] },
        // { 'name': 'mimosa', 'colors': ["#CEA780", "#B9762E", "#976D3A", "#825625", "#4E4C40",] },
        // { 'name': 'mimosaII', 'colors': ["#CEA780", "#B9762E", "#825625", "#4E4C40",] },
        // { 'name': 'mimosaIII', 'colors': ["#CEA780", "#B9762E",] },
        // { 'name': 'bw', 'colors': ["#EEE8C2", "#17150F",] },
        // { 'name': 'bwpink', 'colors': ["#EEE8C2", "#D2707E", "#56534B", "#34302A", "#17150F",] },
        // { 'name': 'bwpinkII', 'colors': ["#EEE8C2", "#E9C747", "#D2707E", "#17150F",] },
        // { 'name': 'wessex', 'colors': ["#D7AD56", "#9F9056", "#6E8B6E", "#61754B", "#37565C", "#253D3E", "#0B1015",] },
        // { 'name': 'wessexII', 'colors': ["#D7AD56", "#9F9056", "#6E8B6E", "#37565C", "#0B1015",] },
        // { 'name': 'wessexIII', 'colors': ["#D7AD56", "#9F9056", "#6E8B6E", "#37565C",] },
        // { 'name': 'wessexIV', 'colors': ["#BFB37B", "#D7AD56", "#AD985A", "#6A876E", "#4C6E6E", "#253D3E", "#313019", "#0B1015",] },
        // { 'name': 'wessexV', 'colors': ["#D7AD56", "#AD985A", "#6A876E", "#3D5657", "#313019",] },
        // { 'name': 'lime', 'colors': ["#D6A03F", "#A7933D", "#131A16",] },
        // { 'name': 'ronin', 'colors': ["#D6A03F", "#A7933D", "#CE4055", "#408787", "#CD3D28", "#131A16",] },
        // { 'name': 'roninII', 'colors': ["#9FA1A0", "#D6A03F", "#D27637", "#A7933D", "#CE4055", "#408787", "#131A16",] },
        // { 'name': 'roninIII', 'colors': ["#D59F3E", "#D27637", "#A7933D", "#CE4055", "#408787", "#CD3D28", "#131A16",] },
        // { 'name': 'organered', 'colors': ["#F5EEE8", "#F6E8C2", "#F6D89F", "#F69B38", "#F27F31", "#E94632", "#D0392B", "#AB2620", "#140101",] },
        // { 'name': 'organeredII', 'colors': ["#F6E8C2", "#F6D08E", "#F69B38", "#E94632", "#AB2620", "#140101",] },
        // { 'name': 'pinks', 'colors': ["#E24480", "#878787", "#AE2987",] },
        // { 'name': 'pinksII', 'colors': ["#B8B9C1", "#E24480", "#878787", "#3178C1", "#AE2987",] },
        // { 'name': 'pinksIII', 'colors': ["#B8B9C1", "#E24480", "#3178C1", "#AE2987",] },
        // { 'name': 'stonedme', 'colors': ["#E9AC9C", "#D5722E", "#CA5648", "#56130C",] },
        // { 'name': 'stonedmeII', 'colors': ["#EDC88C", "#E9AC9C", "#C17C56", "#D5722E", "#CA5648", "#56130C",] },
        // { 'name': 'stonedmeIII', 'colors': ["#EDC88C", "#E9AC9C", "#C17C56", "#D5722E", "#CA5648", "#914837", "#83281B", "#56130C",] },
        // { 'name': 'stonedmeIV', 'colors': ["#EDC88C", "#D5722E", "#CA5648", "#83281B",] },
        // { 'name': 'stonedmeV', 'colors': ["#EDC88C", "#D5722E", "#CA5648",] },
        // { 'name': 'swamp', 'colors': ["#9F9856", "#576B36", "#465925", "#152F0C",] },
        // { 'name': 'swampII', 'colors': ["#9F9856", "#A42517", "#465925",] },
        // { 'name': 'swampIII', 'colors': ["#9F9856", "#576B36", "#A42517", "#152F0C",] },
        // { 'name': 'diodes', 'colors': ["#EBDBB8", "#DDBB45", "#DA7330", "#D2563A", "#A83530", "#56192A",] },
        // { 'name': 'wizardoz', 'colors': ["#D4D750", "#4F9D51", "#587F4F", "#962A3B", "#7B2E2C", "#0C1D2E",] },
        // { 'name': 'wizardozII', 'colors': ["#D4D750", "#4F9D51", "#962A3B", "#0C1D2E",] },
        // { 'name': 'wizardozIII', 'colors': ["#D4D750", "#4F9D51", "#962A3B",] },
        // { 'name': 'miltonII', 'colors': ["#B9A46C", "#878159", "#58675E", "#3D4D45",] },
        // { 'name': 'miltonIII', 'colors': ["#B9A46C", "#878056", "#3D4D45", "#020C0C",] },
        // { 'name': 'orange', 'colors': ["#B6A888", "#D14F25", "#261C10",] },
        // { 'name': 'mylidfe', 'colors': ["#CE9E3C", "#546F90", "#D24829",] },
        // { 'name': 'mylidfeII', 'colors': ["#E9DCB8", "#CE9E3C", "#546F90", "#D24829",] },
        // { 'name': 'stain', 'colors': ["#E9DCB8", "#F2DEA3", "#EDD08A", "#EDBF9A", "#EBB28C", "#E8A280", "#935446", "#7A5053",] },
        // { 'name': 'stainII', 'colors': ["#E9DCB8", "#F2DEA3", "#E8A280", "#935446", "#7A5053",] },
        // { 'name': 'stainIII', 'colors': ["#E9DCB8", "#CE9E3C", "#67829F", "#D24829",] },
        // { 'name': 'germany', 'colors': ["#E1923C", "#D23630", "#211E1F",] },
        // { 'name': 'space', 'colors': ["#61B496", "#E7833D", "#AB3356", "#0B1014",] },
        // { 'name': 'tennyson', 'colors': ["#E9B761", "#567E69", "#253825", "#000100",] },
        // { 'name': 'tennysonill', 'colors': ["#D2B759", "#AC8933", "#7D6E3D", "#886D2D", "#78602A", "#80551B", "#3E0F04", "#160B01",] },
        // { 'name': 'tennysonillI', 'colors': ["#D2B759", "#AC8933", "#78602A", "#80551B", "#3E0F04", "#160B01",] },
        // { 'name': 'tennysonillII', 'colors': ["#D2B759", "#AC8933", "#78602A", "#3E0F04", "#160B01",] },
        // { 'name': 'tennysonillIII', 'colors': ["#D2B759", "#AC8933", "#3E0F04", "#160B01",] },
        // { 'name': 'tennysonillIIIV', 'colors': ["#D2B759", "#AC8933", "#160B01",] },
        // { 'name': 'jazzaldia', 'colors': ["#E4CCBB", "#A581C6", "#D85228", "#B4303F",] },
        // { 'name': 'jazzaldiaII', 'colors': ["#EDD9D0", "#A581C6", "#7F75D1", "#CA4669", "#D85228", "#57489F", "#B4303F", "#242F57",] },
        // { 'name': 'jazzaldiaIII', 'colors': ["#EDD9D0", "#A581C6", "#7F75D1", "#D85228", "#B4303F", "#242F57",] },
        // { 'name': 'jazzaldiaIIII', 'colors': ["#EDD9D0", "#E4CCBB", "#BDA0DA", "#A581C6", "#7F75D1", "#57489F", "#242F57",] },
        // { 'name': 'worldaffairs', 'colors': ["#F3F3F1", "#E35030", "#252B27",] },
        // { 'name': 'takeiteasy', 'colors': ["#D8B58E", "#E56E5E", "#D4963D", "#806E4C", "#B95525", "#953D17", "#3D3116",] },
        // { 'name': 'takeiteasyII', 'colors': ["#D8B58E", "#E56E5E", "#D4963D", "#953D17",] },
        // { 'name': 'takeiteasyIII', 'colors': ["#D8B58E", "#B99F7C", "#E56E5E", "#D4963D", "#B95525", "#953D17", "#535636",] },
        // { 'name': 'path', 'colors': ["#E9D09F", "#DBB777", "#B98D37", "#567C68", "#9D6B26", "#647332",] },
        // { 'name': 'pathII', 'colors': ["#E9D09F", "#B98D37", "#B3662D", "#567C68", "#667634", "#6B2210",] },
        // { 'name': 'cadence', 'colors': ["#ECCDB2", "#E392A6", "#191919",] },
        // { 'name': 'cadenceII', 'colors': ["#ECCDB2", "#E392A6", "#DE7F3B", "#191919",] },
        // { 'name': 'jazz', 'colors': ["#F3EEC0", "#E9D69D", "#D4A440", "#604221", "#060709",] },
        // { 'name': 'jazzposter', 'colors': ["#EBECE8", "#DD6EE4", "#F4E94E", "#E56C3C", "#000000",] },
        // { 'name': 'jazzposterII', 'colors': ["#DD6EE4", "#F4E94E", "#E56C3C", "#000000",] },
        // { 'name': 'bug', 'colors': ["#D7B68C", "#D28633", "#78703D", "#B93D25", "#150B01",] },
        // { 'name': 'bugII', 'colors': ["#D7B68C", "#D28633", "#78703D", "#B93D25",] },
        // { 'name': 'counterpoint', 'colors': ["#DCCBA4", "#6E9BA5", "#D24C25", "#151819",] },
        // { 'name': 'counterpointII', 'colors': ["#6E9BA5", "#D24C25", "#151819",] },
        // { 'name': 'unplesanat', 'colors': ["#D98430", "#D74127", "#0C0C0C",] },
        // { 'name': 'unplesanatII', 'colors': ["#D98430", "#D74127", "#3D143D", "#0C0C0C",] },
        // { 'name': 'unplesanatIII', 'colors': ["#E7D1AE", "#D98430", "#D74127", "#3D143D", "#0C0C0C",] },
        // { 'name': 'sasquatch', 'colors': ["#E2DBC7", "#D5C277", "#D7AB47", "#E4657C", "#3D4145",] },
        // { 'name': 'humblepie', 'colors': ["#E7BC47", "#AE9B6E", "#A6873A", "#1A1813",] },
        // { 'name': 'humblepieII', 'colors': ["#E8E3D3", "#E7BC47", "#1A1813",] },
        // { 'name': 'humblepieIII', 'colors': ["#E8E3D3", "#E7BC47", "#A6873A", "#1A1813",] },
        // { 'name': 'nobor', 'colors': ["#C2A16E", "#879B8C", "#D28144", "#6E6D40", "#0C0C0C",] },
        // { 'name': 'noborII', 'colors': ["#C2A16E", "#879B8C", "#D28144", "#6E6D40", "#243036", "#0C0C0C",] },
        // { 'name': 'noborIII', 'colors': ["#879B8C", "#D28144", "#6E6D40", "#243036", "#0C0C0C",] },
        // { 'name': 'noborIIII', 'colors': ["#879B8C", "#6E6D40", "#243036",] },
        // { 'name': 'mlady', 'colors': ["#DF782E", "#3F626E", "#0D0B01",] },
        // { 'name': 'mladyII', 'colors': ["#9E947A", "#DD752D", "#56838D", "#3F626E", "#6F5925", "#423D31", "#211616",] },
        // { 'name': 'mladyIII', 'colors': ["#9E947A", "#DD752D", "#56838D", "#6F5925", "#211616",] },
        // { 'name': 'flow', 'colors': ["#C6C6C6", "#D2CA4F", "#4BA2BB", "#C78746", "#C6563D", "#5FA93D", "#0F0F0F",] },
        // { 'name': 'flowII', 'colors': ["#D2CA4F", "#4BA2BB", "#C78746", "#C6563D", "#5FA93D",] },
        // { 'name': 'flowIII', 'colors': ["#D2CA4F", "#4BA2BB", "#C6563D", "#5FA93D",] },
        // { 'name': 'wilde', 'colors': ["#E3D7BC", "#DEB745", "#1D2220",] },
        // { 'name': 'organecurve', 'colors': ["#F0D588", "#E26E2C", "#AA411C",] },
        // { 'name': 'organecurveII', 'colors': ["#F0D588", "#EDBC4F", "#E38932", "#E26E2C", "#AA411C",] },
        // { 'name': 'bauhausclassic', 'colors': ["#E0D5B9", "#E1B63D", "#2562AD", "#A63A31", "#191717",] },
        // { 'name': 'bauhausclassicII', 'colors': ["#E0D5B9", "#E1B63D", "#2562AD", "#A63A31",] },
        // { 'name': 'bauhausclassicIII', 'colors': ["#E1B63D", "#2562AD", "#A63A31", "#191717",] },
        // { 'name': 'catchair', 'colors': ["#F4F0CE", "#E3853C", "#793816", "#251A0C",] },
        // { 'name': 'catchairII', 'colors': ["#F4F0CE", "#EFD849", "#E3853C", "#DC592A", "#793816", "#251A0C",] },
        // { 'name': 'catchairIII', 'colors': ["#F4F0CE", "#EFD849", "#E3853C", "#DC592A",] },
        // { 'name': 'catchairIV', 'colors': ["#EFD849", "#EDC944", "#D7BB43", "#DE9B37", "#E3853C", "#E17734", "#DC592A", "#9B4E1E", "#883D16", "#533D0F", "#240B02",] },
        // { 'name': 'catchairV', 'colors': ["#EFD849", "#D7BB43", "#DE9B37", "#E17734", "#DC592A", "#533D0F", "#240B02",] },
        // { 'name': 'catchairVI', 'colors': ["#EFD849", "#D7BB43", "#DE9B37", "#E17734", "#DC592A", "#240B02",] },
        // { 'name': 'catchairVII', 'colors': ["#EFD849", "#E17734", "#DC592A", "#240B02",] },
    ]
    palettes["qoa_palettess"] = [
        // { 'name': 'FlamingoQoa', 'colors': [color("#F2D6A9"), color("#F89683"), color("#D8807F"), color("#CF514C"),] },
        // { 'name': 'Rose Garden', 'colors': [color("#FFF8F5"), color("#F06E99"), color("#F02232"),] },
        // { 'name': 'HawaiiQoa', 'colors': [color("#FE6579"), color("#FEAE00"), color("#F72447"), color("#694E50"),] },
        // { 'name': 'MiamiQoa', 'colors': [color("#FFFFDC"), color("#CB5A7A"), color("#5D276C"), color("#000000"),] },
        // { 'name': 'Thrall Soul', 'colors': [color("#A89852"), color("#514A33"), color("#000000"),] },
        // { 'name': 'Innocence', 'colors': [color("#FFDF84"), color("#F07E9C"), color("#D9566B"),] },
        // { 'name': 'Starburst', 'colors': [color("#FFCB00"), color("#FFA100"), color("#FF6C14"), color("#F44219"), color("#E40045"),] },
        // { 'name': 'Bouquet', 'colors': [color("#F8E1CB"), color("#C2586F"), color("#BB315C"), color("#AD152E"), color("#590E14"),] },
        // { 'name': 'Beehive', 'colors': [color("#FEDC2C"), color("#EFCA46"), color("#D8AD23"), color("#251C02"),] },
        // { 'name': "Tiger's Eye", 'colors': [color("#F7EA27"), color("#DC6D0C"), color("#1A1003"),] },
        // { 'name': 'Reich', 'colors': [color("#FAF5D9"), color("#EA0000"), color("#000000"),] },
        // { 'name': 'ReichRedWhite', 'colors': [color("#FAF5D9"), color("#EA0000"), color("#000000"),] },
        // { 'name': 'Candle Glow', 'colors': [color("#FBE66E"), color("#1F1D15"),] },
        // { 'name': 'Spring Sky', 'colors': [color("#FF92BA"), color("#BE569D"), color("#4695D3"), color("#9A316A"), color("#370029"),] },
        // { 'name': 'Glow', 'colors': [color("#97FABE"), color("#D58CC3"), color("#63276D"), color("#003941"),] },
        // { 'name': 'Devil Elf', 'colors': [color("#FFFFF1"), color("#E00000"), color("#003000"), color("#000000"),] },
        // { 'name': 'Nation', 'colors': [color("#FFFFF1"), color("#E00000"), color("#000000"),] },
        // { 'name': 'SteelQOA', 'colors': [color("#FAE4B8"), color("#754B0D"), color("#02020C"),] },
        // { 'name': "90's", 'colors': [color("#F375CF"), color("#04BBFC"), color("#000000"),] },
        // { 'name': 'Newborn', 'colors': [color("#FFF0C7"), color("#B36497"), color("#0095BB"), color("#00597E"),] },
        // { 'name': 'Ghoul', 'colors': [color("#E4EEC7"), color("#0E0E0E"),] },
        // { 'name': 'Solar Flare', 'colors': [color("#FBDC87"), color("#797540"), color("#22210A"),] },
        // { 'name': 'Moth', 'colors': [color("#FBDC87"), color("#797540"), color("#22210A"),] },
        // { 'name': 'Machine', 'colors': [color("#FDD596"), color("#D40000"), color("#000000"),] },
        // { 'name': 'Static', 'colors': [color("#FBFCDF"), color("#B1AF99"), color("#706F5B"), color("#2A290E"),] },
        // { 'name': 'Tropic Fruit', 'colors': [color("#FCEA38"), color("#F8822A"), color("#EE2A3A"), color("#030A21"),] },
        // { 'name': 'Shriek', 'colors': [color("#FFDBAA"), color("#E9003B"), color("#8D133A"), color("#D80000"),] },
        // { 'name': 'Funfetti', 'colors': [color("#FFD596"), color("#FF7295"), color("#4491B6"), color("#981C61"), color("#3D132C"),] },
        // { 'name': 'Lilac', 'colors': [color("#FFD69F"), color("#FF728B"), color("#9B2975"), color("#7A0040"),] },
        // { 'name': 'Goldrush', 'colors': [color("#FEDC9B"), color("#694C06"),] },
        // { 'name': 'Icecap', 'colors': [color("#FEEECB"), color("#75B4BF"), color("#095F83"), color("#00327C"),] },
        // { 'name': 'Vogue', 'colors': [color("#FFFFA0"), color("#FF9682"), color("#DF7F7D"), color("#D3463F"), color("#A41400"), color("#000000"),] },
        // { 'name': 'Lush', 'colors': [color("#E7D9C2"), color("#D5839B"), color("#66265C"), color("#460033"),] },
        // { 'name': 'Iron', 'colors': [color("#FFBC77"), color("#957A53"), color("#151415"),] },
        // { 'name': 'Perfume', 'colors': [color("#F2D6A9"), color("#F89683"), color("#D8807F"), color("#CF514C"), color("#000000"),] },
        // { 'name': 'Rave', 'colors': [color("#25A8FC"), color("#ED0060"), color("#000025"),] },
        // { 'name': 'Mango', 'colors': [color("#FFD124"), color("#EB9215"), color("#0F1321"),] },
        // { 'name': 'Metallurgy', 'colors': [color("#FDE4A2"), color("#36677A"), color("#746E00"), color("#0F0000"),] },
        // { 'name': 'Icycle', 'colors': [color("#FDE4A2"), color("#36677A"), color("#0F0000"),] },
        // { 'name': 'RandomPalette86', 'colors': [color("#FBDFBB"), color("#FD9DA0"), color("#C3667E"), color("#7F5182"), color("#040809"),] },
        // { 'name': 'Flank Attack', 'colors': [color("#E59AD0"), color("#DB0020"), color("#00304B"),] },
        // { 'name': 'Gemstone', 'colors': [color("#FFD430"), color("#E1672A"), color("#D4442A"), color("#CD2C37"), color("#C51846"), color("#0A1020"),] },
        // { 'name': 'Radiance', 'colors': [color("#FFD430"), color("#E1672A"), color("#D4442A"), color("#C51846"), color("#0A1020"),] },
        // { 'name': 'Psychopsilociben', 'colors': [color("#FFD430"), color("#E1672A"), color("#C51846"), color("#0A1020"),] },
        // { 'name': 'Ghost', 'colors': [color("#FDECBB"), color("#160D14"),] },
        // { 'name': 'Ravishing', 'colors': [color("#FFA7B4"), color("#F478A2"), color("#AA5A8E"), color("#89395F"), color("#310E23"),] },
        // { 'name': 'Plutinum', 'colors': [color("#FDFCFD"), color("#A8A8A8"), color("#5F5F5F"), color("#4A4A4A"), color("#080808"),] },
        // { 'name': 'Tribal Victory Dance', 'colors': [color("#FCA100"), color("#E93B51"), color("#990000"), color("#2F0000"),] },
        // { 'name': 'Blood Ritual', 'colors': [color("#CB1528"), color("#4D0F1B"), color("#100F11"),] },
        // { 'name': 'Valentine', 'colors': [color("#FFE0DB"), color("#DC7381"), color("#D01028"), color("#8A232F"),] },
        // { 'name': 'Mesmerize', 'colors': [color("#FDC982"), color("#BD6B6A"), color("#B43931"), color("#8B0000"), color("#000000"),] },
        // { 'name': 'Blue Steel', 'colors': [color("#EFE7ED"), color("#6881C0"), color("#1E5090"),] },
        // { 'name': 'Blood Glow', 'colors': [color("#FF181F"), color("#850B10"), color("#532D1F"), color("#422D1F"), color("#610407"), color("#3A0203"),] },
        // { 'name': 'Dark Spell', 'colors': [color("#FF181F"), color("#422D1F"), color("#610407"), color("#3A0203"),] },
        // { 'name': 'Vampire', 'colors': [color("#CB1528"), color("#4D0F1B"), color("#100F11"),] },
        // { 'name': 'Frozen', 'colors': [color("#BBD5FD"), color("#7A94D4"), color("#000000"),] },
        // { 'name': 'Jazz Club', 'colors': [color("#BD6684"), color("#B4566D"), color("#B34556"), color("#943D42"), color("#374D86"), color("#2D3C70"), color("#2B3754"), color("#49303C"), color("#392B24")] },
        // { 'name': 'Celestial Savannah', 'colors': [color("#E1B658"), color("#F3A326"), color("#C6784A"), color("#E86C22"), color("#A15F3C"), color("#26838A"), color("#8A5C20"), color("#AB141B"), color("#7A2022"), color("#643F15"), color("#284549")] },
        // { 'name': 'Bloom Nebula', 'colors': [color("#F5D18B"), color("#00806F"), color("#005859"), color("#520027"),] },
        // { 'name': 'Raven', 'colors': [color("#E89B38"), color("#5CA3A6"), color("#020106"),] },
        // { 'name': 'Dream Pool', 'colors': [color("#BF9FB2"), color("#BFB287"), color("#94627E"), color("#4B7E82"), color("#54697B"), color("#3C2834"),] },
        // { 'name': 'Space Flamingo', 'colors': [color("#EA9CB7"), color("#936DA6"), color("#BE5567"), color("#250000"),] },
        // { 'name': 'Heartbreak', 'colors': [color("#C8A072"), color("#A51830"), color("#991418"), color("#62222F"),] },

    ]
    palettes["save_palettes"] = [
        // { 'name': 'dreamingcity', 'colors': [color("#E89B38"), color("#5CA3A6"), color("#020106"),] },
        // { 'name': 'solaris', 'colors': [color("#F1DFBD"), color("#EBD048"), color("#599891"), color("#6D9E3D"), color("#5D487A"),] },
        // { 'name': 'spaceChristmasIIIIII', 'colors': [color("#F5CAA3"), color("#F6B8AA"), color("#F698A5"), color("#F1899A"), color("#EA6D97"), color("#A05585"), color("#873C5F"), color("#3D2532"),] },
        // { 'name': 'spectrumIII', 'colors': [color("#DFB492"), color("#B46C79"), color("#76435D"), color("#276176"), color("#0B253D"),] },
        // { 'name': 'timeslipIIIV', 'colors': [color("#D0AB70"), color("#D08826"), color("#CB4855"), color("#B92424"), color("#280A00"),] },
        // { 'name': 'twilightsnowI', 'colors': [color("#F5963A"), color("#F5772F"), color("#F65D2C"), color("#EA4E2A"), color("#936F47"), color("#74613F"), color("#764941"), color("#64423D"), color("#3D2335"),] },
        // { 'name': 'Orange', 'colors': [color("#D4BC9D"), color("#E73B20"), color("#140F01"),] },
        // { 'name': 'spaceChristmasIII', 'colors': [color("#F3D0A7"), color("#F1899A"), color("#A05585"), color("#873C5F"), color("#3D2532"),] },
        // { 'name': 'squares', 'colors': [color("#92914C"), color("#6E6F67"), color("#92801A"), color("#933513"),] },
        // { 'name': 'spacestationpIIII', 'colors': [color("#EBC5DD"), color("#C297CC"), color("#52B5CE"), color("#4A3D7B"),] },
        // { 'name': 'timeslipIIII', 'colors': [color("#F5C5A9"), color("#D0942A"), color("#C65661"), color("#C53C55"), color("#B9293C"), color("#6F2825"),] },
        // { 'name': 'winternnI', 'colors': [color("#E89B4A"), color("#E47A3D"), color("#D35635"), color("#4C4E41"), color("#3E3138"), color("#2B1415"),] },
        // { 'name': 'Spring Pastel', 'colors': [color("#B9A955"), color("#C1552F"), color("#727B2B"), color("#4B5E20"),] },
        // { 'name': 'Spring Pastel II', 'colors': [color("#CDA755"), color("#9C8F3D"), color("#C1552F"), color("#4B5E20"), color("#19240B"),] },
        // { 'name': 'Plum', 'colors': [color("#E9D8CB"), color("#D0B3B7"), color("#B78299"), color("#A76886"), color("#7F4C6C"), color("#5F3755"), color("#31242A"),] },
        // { 'name': 'RisforrocketIIIIVUI', 'colors': [color("#D26E7B"), color("#D14253"), color("#C91532"), color("#88303C"), color("#35110F"),] },
        // { 'name': 'moonpoolIIIVI', 'colors': [color("#BF9FB2"), color("#BFB287"), color("#94627E"), color("#4B7E82"), color("#54697B"), color("#3C2834"),] },
        // { 'name': 'Space Flamingo', 'colors': [color("#EA9CB7"), color("#936DA6"), color("#BE5567"), color("#250000"),] },
        // { 'name': 'lovetunnelII', 'colors': [color("#C8A072"), color("#A51830"), color("#991418"), color("#62222F"),] },
        // { 'name': 'volcanoIII', 'colors': [color("#D68644"), color("#D03D67"), color("#D15932"), color("#AE5624"), color("#C73525"), color("#672834"), color("#1B0B11"),] },
        // { 'name': 'spectrum', 'colors': [color("#DFB492"), color("#E5827E"), color("#B58694"), color("#B46C79"), color("#9C576B"), color("#76435D"), color("#276176"), color("#0B253D"),] },
        // { 'name': 'timeslipIIIII', 'colors': [color("#F5C5A9"), color("#C65661"), color("#C53C55"), color("#B92936"), color("#6F2825"),] },
        // { 'name': 'Island Sunset', 'colors': [color("#F58473"), color("#D3B051"), color("#F5763F"), color("#E73B20"),] },
        // { 'name': 'earth2moonIIIVI', 'colors': [color("#E1CC7B"), color("#933043"), color("#6E333F"), color("#83282D"), color("#3A2630"),] },
        // { 'name': 'Radiation Poisoning', 'colors': [color("#DFD086"), color("#E3C476"), color("#B7AD73"), color("#B29961"), color("#7D6F38"), color("#555525"), color("#554619"), color("#444D1E"), color("#2C2908"),] },
        // { 'name': 'Regal Song', 'colors': [color("#B1C9D3"), color("#A0BCD2"), color("#B0A7BA"), color("#847499"), color("#435480"), color("#4B446E"), color("#594659"),] },
        // { 'name': 'Voluptuous Galaxy', 'colors': [color("#FFFCEC"), color("#FFF1CE"), color("#FFA3AA"), color("#FF8696"), color("#FF707E"), color("#FF458C"), color("#F70059"), color("#A80044"), color("#731D4D"), color("#6B001C"), color("#500D1F"),] },
        // { 'name': 'Pale Night', 'colors': [color("#BAB286"), color("#9F9D81"), color("#6A6C65"), color("#041217"),] },
        // { 'name': 'Hawaii', 'colors': [color("#E9E163"), color("#F4D939"), color("#F68058"), color("#E64093"), color("#C56291"), color("#EE8E2A"), color("#D64C5E"), color("#8C365E"),] },
        // { 'name': 'Spring Bloom', 'colors': [color("#EFE7E2"), color("#E8B7BD"), color("#D1CA4B"), color("#CE6E81"), color("#8BA84C"), color("#608743"), color("#3A3055"), color("#24211D"),] },
        // { 'name': 'Prime', 'colors': [color("#F4CE9C"), color("#64A3AC"), color("#286E84"), color("#961412"), color("#65060A"),] },
        //    {'name' : 'Other Realm', 'colors' : [color("#E79749"),color("#E47A3D"),color("#D35635"),color("#AD5535"),color("#7C5644"),color("#515346"),color("#6B4A2E"),color("#503528"),color("#362624"),]},
        // {'name' : 'Yeti Taint', 'colors' : [color("#AED7F3"),color("#8AC2DF"),color("#6DB2D9"),color("#59ABD3"),color("#49A4CD"),color("#319BC5"),color("#038AB7"),color("#027CA9"),color("#015F86"),]},
        // { 'name': 'Royal', 'colors': [color("#E2D396"), color("#325F98"), color("#58296D"), color("#140B04"),] },
        // { 'name': 'Bachelorette Party', 'colors': [color("#DEB8DC"), color("#B496CF"), color("#D269A9"), color("#AD53A3"), color("#3F94BF"), color("#E35627"), color("#2E339F"), color("#351A6D"),] },
        // { 'name': 'Queen of Angels', 'colors': [color("#DBD8F6"), color("#AAD9FB"), color("#BDA2C1"), color("#DB8DB1"), color("#CB7693"), color("#975868"), color("#7F5765"), color("#6C505B")] },
        // { 'name': 'Hellfire Galaxy', 'colors': [color("#B75555"), color("#B03C3C"), color("#863835"), color("#653C39"), color("#652520"), color("#3D2016"), color("#0E0B08"),] },
        // { 'name': 'Ancient Moons', 'colors': [color("#BF9B71"), color("#AE8455"), color("#B75555"), color("#B03C3C"), color("#652520"), color("#0E0B08"),] },
        // { 'name': 'Fertile Forest', 'colors': [color("#E9E18E"), color("#3B967F"), color("#008864"), color("#25331D"),] },
    ]
    palettes["rare_palettes"] = [
        // { 'name': 'Noble Nebulae', 'colors': [color("#DFB492"), color("#E5827E"), color("#B58694"), color("#B46C79"), color("#9C576B"), color("#76435D"), color("#276176"), color("#0B253D"),] },
        {
            'name': 'Spider Wedding', 'colors': [color("#8E759C"), color("#7F7A9A"), color("#896392"), color("#7E6F8E"), color("#6F7C8F"), color("#795D85"), color("#815A77"), color("#636D77"), color("#5C617F"), color("#675877"), color("#6F536A"), color("#6A435E"), color("#4C5660"), color("#5A4065"), color("#545051"), color("#553D55"), color("#484757"), color("#4A2F40"), color("#3A2743"),],
            'light': [color("#000000"), color("#FFEAFF"), color("#FFFFFF")]
        },
        // { 'name': 'Heaven Song', 'colors': [color("#E7D4B2"), color("#CA6673"), color("#9E6D87"), color("#796B98"), color("#39819F"), color("#2F556E"), color("#223D4B"),] },
        // { 'name': 'Baby', 'colors': [color("#DEB8DC"), color("#B799CF"), color("#D269A9"), color("#3F94BF"), color("#3D4BB8"),] },

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
        // { 'name': 'Easter', 'colors': [color("#F6B9DA"), color("#EAB8E4"), color("#F5F29D"), color("#F4C3C8"), color("#F5CFB9"), color("#BBCBF4"), color("#DBAEEF"), color("#A7D9F4"), color("#F5DAA4"), color("#C8BCEF"), color("#D9F1A3"), color("#B0DFD6"), color("#B7EAB7"), color("#BFEFA4"),] },
        // { 'name': 'Firebird', 'colors': [color("#EDD89E"), color("#DEA023"), color("#F5191D"), color("#0F0C0C"),] },
        //x {'name' : "Gollum's Pool", 'colors' : [color("#8b8155"),color("#a59750"),color("#5e663d"),color("#322f0b"),color("#151a04"),color("#1b6c75"),]},
        //x {'name' : 'Vampire', 'colors' : [color("#C11218"),color("#170001"),]},

    ]
    palettes["ultra_rare_palettes"] = [
        { 'name': 'Mellow Nebulae', 'colors': [color("#DFB492"), color("#E5827E"), color("#B46C79"), color("#76435D"), color("#276176"), color("#0B253D"),] },

    ]
    palettes["normie_palettes"] = [
        // { 'name': 'Mad Hatter', 'colors': [color("#C48461"), color("#999766"), color("#A69359"), color("#A99A45"), color("#B27759"), color("#8D8963"), color("#978555"), color("#9A8E44"), color("#A67D45"), color("#85795F"), color("#AD6A40"), color("#9A7E35"), color("#806D4D"), color("#A17423"), color("#6D6B5C"), color("#8A7232"), color("#916A25"), color("#7D5C3D"), color("#6C5C4C"), color("#82612B"), color("#6E552C"), color("#7B5419"), color("#8B5500"), color("#67481A"), color("#794B00"), color("#723600"), color("#5D2A00"), color("#2A2A2A"),] },
        { 'name': 'Gemstone Nebulae', 'colors': [color("#F1DCC0"), color("#C43055"), color("#009FA2"), color("#492148"),] },
        // { 'name': 'Rainforest Galaxy', 'colors': [color("#F3EDBF"), color("#CDD05E"), color("#53834F"), color("#734566"), color("#31687D"), color("#42432A"), color("#0A0A0C"),] },
        // { 'name': 'Moon', 'colors': [color("#C2BDB0"), color("#868079"), color("#443E3E"), color("#3E3D31"), color("#040302"),] },
        // { 'name': 'Stardust', 'colors': [color("#E5827E"), color("#153D56"), color("#0B253D"),] },
        // { 'name': 'Sugar', 'colors': [color("#E3909F"), color("#C7829F"), color("#A25686"), color("#5F7F96"), color("#3B2733"),] },
        // { 'name': 'Neptune', 'colors': [color("#519FB7"), color("#6D3E93"), color("#0D6D99"), color("#374187"), color("#4F1F7F"), color("#0F3277"), color("#0B1A0B"),] },
        // { 'name': 'Insects', 'colors': [color("#DEA53D"), color("#2A6448"), color("#375524"),] },
        // { 'name': 'Yeti Taint', 'colors': [color("#D5C5AA"), color("#6D9FB3"), color("#258AB3"), color("#264C6D"),] },
        // { 'name': 'Soul Shambles', 'colors': [color("#929255"), color("#927F19"), color("#933513"), color("#7D3113"), color("#1C1D13"),] },

        // { 'name': 'Swamp Glow', 'colors': [color("#DE8657"), color("#739F6D"), color("#548A68"), color("#3D4E52"), color("#2A2D37"), color("#171A24"),] },
        { 'name': 'Wolverine', 'colors': [color("#EBD048"), color("#C5BE42"), color("#599891"), color("#4D7E6E"), color("#23250F"),] },
        { 'name': 'Mirkwood Fungus', 'colors': [color("#B0B87D"), color("#849680"), color("#6C8657"), color("#7F8918"), color("#506D51"), color("#5D751D"), color("#584139"), color("#304F16"),] },
        // { 'name': 'Polar Reaches', 'colors': [color("#8EAEC5"), color("#8296B7"), color("#6C7498"), color("#4A6A99"), color("#626381"), color("#465880"), color("#294462"), color("#353648"), color("#1B2445"), color("#0D182A"), color("#150C0D"),] },
        // { 'name': 'Eastern Galaxy', 'colors': [color("#FFFFFF"), color("#525464"), color("#6F4355"), color("#494E65"), color("#6F364B"), color("#513D4B"), color("#264558"),] },
        // { 'name': 'Iron Planet', 'colors': [color("#BD9E86"), color("#DC322B"), color("#111114"),] },
        // { 'name': 'Prom Queen', 'colors': [color("#D2A4B5"), color("#8196AF"), color("#B8425A"), color("#903E64"), color("#6A3C67"), color("#37356A")] },
        // { 'name': 'Neptune', 'colors': [color("#3682AD"), color("#3187AA"), color("#6D3E93"), color("#5B388E"), color("#0D6D99"), color("#374187"), color("#0B6091"), color("#274B85"), color("#4F1F7F"), color("#3F1F7F"), color("#10427C"), color("#0F3277"), color("#0F2674"),] },
        // { 'name': 'Human Casserole', 'colors': [color("#E8DDE2"), color("#C4BACE"), color("#4B98B6"), color("#8C845C"), color("#457467"), color("#B8292E"), color("#492B68"), color("#180E1F"),] },
        // { 'name': 'Colour out of Space', 'colors': [color("#E7CF9F"), color("#52807D"), color("#69394B"),] },
        // { 'name': 'Tango Nebulae', 'colors': [color("#FEFDFD"), color("#FCF0EF"), color("#FDE5E7"), color("#FCD1D2"), color("#FBBEC1"), color("#F6B7B3"), color("#F8ACAE"), color("#82BEB5"), color("#89B8B0"), color("#F6787E"), color("#98A8A2"), color("#F46064"), color("#F15255"), color("#E2585C"), color("#F1464D"), color("#E5414C"), color("#D73E45"), color("#CC3D42"), color("#BB363C"), color("#A83136"), color("#942D2F"), color("#7C2527"), color("#702124"), color("#491517"), color("#391213"), color("#181214"), color("#1A0909"), color("#0B0304"),] },
    ]
    visionsPalettes = [
        [
            // {
            //     'name': "Merkingdom",
            //     'colors': ["#A3DDED", "#B9B98E", "#46A193", "#609F7A", "#31A1A3", "#006B64"
            //     ]
            // },
            // {
            //     'name': "Mirkwood",
            //     'colors': ["#B0B87D",
            //         "#9BC296",
            //         "#6C8657",
            //         "#506D51",
            //         "#977667",
            //         "#584139",
            //         "#304F16"
            //     ]
            // },
            // {
            //     'name': "Deep Mirkwood",
            //     'colors': [
            //         "#B0B87D",
            //         "#849680",
            //         "#6C8657",
            //         "#7F8918",
            //         "#506D51",
            //         "#5D751D",
            //         "#584139",
            //         "#304F16"
            //     ],
            //     "p": [
            //         [
            //             7,
            //             3
            //         ],
            //         [
            //             6,
            //             3
            //         ]
            //     ],
            //     "w": [4],
            //     "s": [[0, 2, 3]],
            //     "c": [
            //         [
            //             1,
            //             6
            //         ]
            //     ]
            // },
            // {
            //     'name': "Spring Bloom",
            //     'colors': ["#F3B1A8", "#7CB7B9", "#869F4A", "#5D631E", "#5E3124", "#2E0A00"
            //     ], "w": [1], "s": [[5, 0, 1], [1, 0, 5]], "o": [0, 1, 5], "l": [0, 5], "p": [[5, 1]]

            // },
            // {
            //     'name': "Chlorophyll",
            //     'colors': ["#BFD28A", "#89C1C7", "#B68F9D", "#94C072", "#A0C108", "#716880", "#639A04"
            //     ]
            // },
            // {
            //     'name': "Jungle",
            //     'colors': ["#D0924B", "#C37C6B", "#AA561B", "#566851", "#6D6718"
            //     ]
            // }
        ],
        [
            // {
            //     'name': "Guardian Angel",
            //     'colors': ["#97C4F1", "#BCB2D4", "#B899A3", "#7897B1", "#A46870"]
            // },
            // {
            //     'name': "Enchantment",
            //     'colors': ["#FFA784", "#DECB7D", "#D1847D", "#A3A07E", "#878878", "#DD6E22", "#D6521C", "#907C30"
            //     ]
            // },
            // {
            //     'name': "Afterlife",
            //     'colors': ["#a2cae3", "#91a4cc", "#7faec1", "#7c9cc8", "#758db3", "#a360a4", "#9b6d85", "#9b4172"
            //     ]
            // },
            // {
            //     'name': "Psychedelic",
            //     'colors': ["#A9DBCA", "#CE8470", "#A6A637", "#9D5B59", "#46806B", "#6A4283", "#797B15"]

            // },
            // {
            //     'name': "Faerie Pool",
            //     'colors': ["#E5ABB5", "#C079A1", "#53A1A7", "#48243B"
            //     ]
            // },
            // {
            //     'name': "Petrified Rainbow",
            //     'colors': ["#FCDE96", "#5886C4", "#73328F", "#756054", "#88732B", "#651237"
            //     ]
            // },
            // {
            //     'name': "Emerald",
            //     'colors': [
            //         "#5A847A",
            //         "#946257",
            //         "#6B2F25",
            //         "#0C5649",
            //         "#2B343D",
            //         "#332429",
            //         "#2F1111",
            //         "#1F2809"
            //     ]
            // },
            // {
            //     'name': "Mad Hatter",
            //     'colors': ["#FCA678", "#C3C484", "#D4BE70", "#D8C753", "#E5966F", "#B3B181", "#C5B753", "#D59F53", "#DF844A", "#A17423", "#8A7232", "#9A7E35"
            //     ], "s": [[4, 5, 3], [3, 5, 10], [3, 0, 5]],
            //     "l": [4, 1, 3, 5, 6, 9], "w": [11, 8, 4], "o": [0, 4, 8, 9, 11], "p": [[9, 3], [5, 4]]
            // },
            // {
            //     'name': "Northern Lights",
            //     'colors': ["#C7A1DC", "#B0A9D9", "#C187CE", "#98ACC9", "#AA7FBC", "#B67AA7", "#8797A6", "#7E86B3", "#8F78A7", "#955883", "#667686", "#7D548E", "#736D6F", "#616079", "#663956", "#4D2B5C"
            //     ]
            // }
        ],
        [
            // {
            //     'name': "Paradise",
            //     'colors': ["#F198A8", "#F6A891", "#F28E87", "#D389A8", "#62859E", "#581B3A"
            //     ]
            // },
            // {
            //     'name': "Dandelion",
            //     'colors': [
            //         "#F0DB80",
            //         "#EFD53A",
            //         "#C7AF31",
            //         "#CAAC00",
            //         "#AE8827",
            //         "#B28F00",
            //         "#787F20"
            //     ]
            // },
            // {
            //     'name': "Meadow",
            //     'colors': ["#FFE052", "#CBAF8D", "#F9D800", "#E5CD12", "#ECC700", "#C97E5E", "#9B8B7B", "#C89700"
            //     ]
            // },
            // {
            //     'name': "Rosepetal",
            //     'colors': [
            //         "#C16DA9",
            //         "#732758",
            //         "#D6C9FF",
            //         "#C6B9EF"
            //     ]
            // },
            // {
            //     'name': "Flamingo",
            //     'colors': ["#FAC0CA", "#DF6B85", "#280F53"
            //     ]
            // },
            // {
            //     'name': "Hex",
            //     'colors': ["#F8D100", "#DE8650", "#260F05"
            //     ],
            //     "s": [[0, 2, 1], [2, 0, 1]]
            // },
            // {
            //     'name': "Sunspot",
            //     'colors': [
            //         "#DEC2C1",
            //         "#F5E18B",
            //         "#D7C654",
            //         "#C79989",
            //         "#CAAC00",
            //         "#464F00",
            //         "#1C0B04"
            //     ]
            // },
            // {
            //     'name': "Lavender",
            //     'colors': [
            //         "#E9D8CB",
            //         "#D0B3B7",
            //         "#B78299",
            //         "#A76886",
            //         "#7F4C6C",
            //         "#5F3755",
            //         "#31242A"
            //     ]
            // },
            // {
            //     'name': "Tropical Island",
            //     'colors': [
            //         "#FFDF84",
            //         "#F07E9C",
            //         "#D9566B"
            //     ]
            // },
            // {
            //     'name': "Peach",
            //     'colors': [
            //         "#F2D6A9",
            //         "#F89683",
            //         "#D8807F",
            //         "#CF514C"
            //     ]
            // }
        ],
        [
            // {
            //     'name': "Ghost",
            //     'colors': [
            //         "#C2BDB0",
            //         "#868079",
            //         "#575654",
            //         "#3E3D31",
            //         "#040302"
            //     ]
            // },
            {
                'name': "Grimoire",
                'colors': [
                    "#907B4D",
                    "#76623C",
                    "#0B0B0B"
                ]
            },
            // {
            //     'name': "Pale Rider",
            //     'colors': [
            //         "#DBDFBF",
            //         "#9A9A75",
            //         "#50523D"
            //     ]
            // },
            // {
            //     'name': "Burial Grounds",
            //     'colors': [
            //         "#D7B68A",
            //         "#5D5551",
            //         "#131115"
            //     ]
            // },
            // {
            //     'name': "Oilspill",
            //     'colors': [
            //         "#7A7B7F",
            //         "#585C5D",
            //         "#201E29"
            //     ]
            // },
            // {
            //     'name': "Fumes",
            //     'colors': [
            //         "#939A67",
            //         "#414632",
            //         "#232719"
            //     ]
            // },
            // {
            //     'name': "Vampire",
            //     'colors': [
            //         "#BBB8A9",
            //         "#898781",
            //         "#7B7663",
            //         "#59564B",
            //         "#2C241B"
            //     ]
            // },
            // {
            //     'name': "Omen",
            //     'colors': [
            //         "#D3B083",
            //         "#B09063",
            //         "#6D5C47",
            //         "#1A140E"
            //     ]
            // },
            // {
            //     'name': "Despair",
            //     'colors': [
            //         "#C2BDB0",
            //         "#443E3E",
            //         "#3E3D31"
            //     ]
            // },
            // {
            //     'name': "Witch Bog",
            //     'colors': ["#98C9E1", "#899FBE", "#807A93", "#53535D", "#3E2B32"
            //     ]
            // },
            // {
            //     'name': "Ash",
            //     'colors': [
            //         "#BEBBAC",
            //         "#AFB0AA",
            //         "#969590",
            //         "#888F99",
            //         "#2D272B"
            //     ]
            // }
        ],
        [
            // {
            //     'name': "Storm",
            //     'colors': ["#FACDA4", "#858192", "#341A56"
            //     ]
            // },
            {
                'name': "Wizard Spell",
                'colors': ["#BCD6E3", "#A9C7E0", "#84749E", "#31497E", "#3B3169", "#4D354F"
                ]
            },
            // {
            //     'name': "Violet",
            //     'colors': [
            //         "#ACC4D0",
            //         "#877CA4",
            //         "#4B446E"
            //     ]
            // },
            // {
            //     'name': "Arctic",
            //     'colors': ["#DAD1C0", "#ADACAA", "#5F7E9A", "#467691", "#1B4B79"
            //     ]
            // },
            // {
            //     'name': "Ocean",
            //     'colors': ["#E0D9CB", "#527D97", "#2E537E", "#3A2E4C"
            //     ]
            // },
            // {
            //     'name': "Atlantis",
            //     'colors': ["#ADBEED", "#95C6EE", "#94C6CA", "#4A7AC2", "#65868A", "#6957A5", "#135A88", "#313670"
            //     ]
            // }
        ],
        [
            // {
            //     'name': "Mountain",
            //     'colors': ["#CDC5BE", "#7190B7", "#5F889E", "#5F384E"
            //     ]
            // },
            // {
            //     'name': "Sky",
            //     'colors': [
            //         "#A6C3E5",
            //         "#6288AD",
            //         "#4A6A99",
            //         "#294462",
            //         "#0D182A"
            //     ]
            // },
            // {
            //     'name': "Wendigo",
            //     'colors': ["#BEBEBE", "#9DADBF", "#7D91AD", "#605D6F"
            //     ]
            // },
            // {
            //     'name': "Heart of Animus",
            //     'colors': [
            //         "#E4D8AE",
            //         "#9A8F79",
            //         "#788C97",
            //         "#60626F",
            //         "#404040",
            //         "#212121"
            //     ]
            // },
            // {
            //     'name': "Clouds",
            //     'colors': ["#BBBDC0", "#9BB0C7", "#7AA6C7", "#7795C6", "#584972"
            //     ]
            // },
            // {
            //     'name': "Dreamcatcher",
            //     'colors': ["#9DC5E0", "#82BBCE", "#B1909E", "#8E849C", "#85545F", "#65414E", "#244963", "#172743"
            //     ], "s": [[0, 3, 4], [7, 5, 0]], "w": [0, 1, 6]
            // },
            // {
            //     'name': "Rain Dance",
            //     'colors': ["#BCBEC3", "#ADB9C6", "#9DB1C7", "#859EBF", "#6BA8C6", "#7995C4", "#725C7B", "#666275", "#51416B", "#3E386E"
            //     ], "s": [[1, 9, 5]], "w": [4, 5, 9]
            // },
            // {
            //     'name': "Ancient land",
            //     'colors': ["#DFB99B", "#DCA282", "#C47A5F", "#AB6453"
            //     ], "s": [[0, 1, 3]]
            // }
        ],
        [
            // {
            //     'name': "Alchemy",
            //     'colors': ["#BAE2E8", "#A79719", "#8A7E03", "#5C5001"
            //     ]
            // },
            // {
            //     'name': "Aged Bronze",
            //     'colors': [
            //         "#FEDC9B",
            //         "#694C06"
            //     ]
            // },
            // {
            //     'name': "Steel",
            //     'colors': ["#F5F6EF", "#C8C7C5", "#5C616B", "#3D4158", "#1A0D0B"
            //     ]
            // },
            // {
            //     'name': "Brass",
            //     'colors': [
            //         "#DFD086",
            //         "#554619"
            //     ]
            // },
            // {
            //     'name': "Graphite",
            //     'colors': ["#B6B6B6", "#9C9C9B", "#838280", "#696865", "#4D4D4B", "#30302F", "#131210"
            //     ]
            // },
            // {
            //     'name': "Platinum",
            //     'colors': [
            //         "#CDCAC1",
            //         "#7A7B7F",
            //         "#585C5D",
            //         "#201E29"
            //     ]
            // },
            // {
            //     'name': "Copper",
            //     'colors': [
            //         "#A37026",
            //         "#7C4D12",
            //         "#6B4A14"
            //     ]
            // }
        ]
    ]
    sinnCubePalettes = [
        { 'name': 'Spring Pastel II', 'colors': [color("#CDA755"), color("#9C8F3D"), color("#C1552F"), color("#4B5E20"), color("#19240B"),] },
        { 'name': 'Nation', 'colors': [color("#FFFFF1"), color("#E00000"), color("#000000"),] },

    ]
    sinCubePalettes = [
        {
            'name': "Hex",
            'colors': ["#F8D100", "#DE8650", "#260F05"
            ],
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
            'name': "Platinum",
            'colors': [
                "#CDCAC1",
                "#7A7B7F",
                "#585C5D",
                "#201E29"
            ]
        },
        {
            'name': "Copper",
            'colors': [
                "#A37026",
                "#7C4D12",
                "#6B4A14"
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
            ]
        },
        {
            'name': "Clouds",
            'colors': ["#BBBDC0", "#9BB0C7", "#7AA6C7", "#7795C6", "#584972"
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
            ]
        },
        {
            'name': "Alchemy",
            'colors': ["#BAE2E8", "#A79719", "#8A7E03", "#5C5001"
            ]
        },
        {
            'name': "Petrified Rainbow",
            'colors': ["#FCDE96", "#5886C4", "#73328F", "#756054", "#88732B", "#651237"
            ]
        },
        {
            'name': "Dreamcatcher",
            'colors': ["#9DC5E0", "#82BBCE", "#B1909E", "#8E849C", "#85545F", "#65414E", "#244963", "#172743"
            ], "s": [[0, 3, 4], [7, 5, 0]], "w": [0, 1, 6]
        },
        {
            'name': "Northern Lights",
            'colors': ["#C7A1DC", "#B0A9D9", "#C187CE", "#98ACC9", "#AA7FBC", "#B67AA7", "#8797A6", "#7E86B3", "#8F78A7", "#955883", "#667686", "#7D548E", "#736D6F", "#616079", "#663956", "#4D2B5C"
            ]
        },
        {
            'name': "Rain Dance",
            'colors': ["#BCBEC3", "#ADB9C6", "#9DB1C7", "#859EBF", "#6BA8C6", "#7995C4", "#725C7B", "#666275", "#51416B", "#3E386E"
            ], "s": [[1, 9, 5]], "w": [4, 5, 9]
        },
        {
            'name': "Faerie Pool",
            'colors': ["#E5ABB5", "#C079A1", "#53A1A7", "#48243B"
            ]
        },
        {
            'name': "Wendigo",
            'colors': ["#BEBEBE", "#9DADBF", "#7D91AD", "#605D6F"
            ]
        },
        {
            'name': "Psychedelic",
            'colors': ["#A9DBCA", "#CE8470", "#A6A637", "#9D5B59", "#46806B", "#6A4283", "#797B15"]

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
            'name': "Spring Bloom",
            'colors': ["#F3B1A8", "#7CB7B9", "#869F4A", "#5D631E", "#5E3124", "#2E0A00"
            ], "w": [1], "s": [[5, 0, 1], [1, 0, 5]], "o": [0, 1, 5], "l": [0, 5], "p": [[5, 1]]

        },
        {
            'name': "Merkingdom",
            'colors': ["#A3DDED", "#B9B98E", "#46A193", "#609F7A", "#31A1A3", "#006B64"
            ]
        },
        { 'name': 'spacestationpIIII', 'colors': [color("#EBC5DD"), color("#C297CC"), color("#52B5CE"), color("#4A3D7B"),] },
        { 'name': 'Space Flamingo', 'colors': [color("#EA9CB7"), color("#936DA6"), color("#BE5567"), color("#250000"),] },
        { 'name': 'Insects', 'colors': [color("#DEA53D"), color("#2A6448"), color("#375524"),] },
        { 'name': 'Spring Pastel II', 'colors': [color("#CDA755"), color("#9C8F3D"), color("#C1552F"), color("#4B5E20"), color("#19240B"),] },
        { 'name': 'Bloom Nebula', 'colors': [color("#F5D18B"), color("#00806F"), color("#005859"), color("#520027"),] },
        { 'name': 'Devil Elf', 'colors': [color("#FFFFF1"), color("#E00000"), color("#003000"), color("#000000"),] },
        // { 'name': 'Beehive', 'colors': [color("#FEDC2C"), color("#EFCA46"), color("#D8AD23"), color("#251C02"),] },
        { 'name': 'Dark Spell', 'colors': [color("#FF181F"), color("#422D1F"), color("#610407"), color("#3A0203"),] },
        { 'name': 'Blood Glow', 'colors': [color("#FF181F"), color("#850B10"), color("#532D1F"), color("#422D1F"), color("#610407"), color("#3A0203"),] },
        { 'name': 'Tribal Victory Dance', 'colors': [color("#FCA100"), color("#E93B51"), color("#990000"), color("#2F0000"),] },
        { 'name': 'Nation', 'colors': [color("#FFFFF1"), color("#E00000"), color("#000000"),] },
        { 'name': 'Plutinum', 'colors': [color("#FDFCFD"), color("#A8A8A8"), color("#5F5F5F"), color("#4A4A4A"), color("#080808"),] },
        { 'name': 'Rave', 'colors': [color("#25A8FC"), color("#ED0060"), color("#000025"),] },
        { 'name': 'Nation', 'colors': [color("#FFFFF1"), color("#E00000"), color("#000000"),] },
        { 'name': 'Gemstone', 'colors': [color("#FFD430"), color("#E1672A"), color("#D4442A"), color("#CD2C37"), color("#C51846"), color("#0A1020"),] },
        { 'name': 'Bouquet', 'colors': [color("#F8E1CB"), color("#C2586F"), color("#BB315C"), color("#AD152E"), color("#590E14"),] },
        { 'name': 'Pale Night', 'colors': [color("#BAB286"), color("#9F9D81"), color("#6A6C65"), color("#041217"),] },
        { 'name': 'Voluptuous Galaxy', 'colors': [color("#FFFCEC"), color("#FFF1CE"), color("#FFA3AA"), color("#FF8696"), color("#FF707E"), color("#FF458C"), color("#F70059"), color("#A80044"), color("#731D4D"), color("#6B001C"), color("#500D1F"),] },
        { 'name': 'Prime', 'colors': [color("#F4CE9C"), color("#64A3AC"), color("#286E84"), color("#961412"), color("#65060A"),] },
        { 'name': 'Spring Pastel', 'colors': [color("#B9A955"), color("#C1552F"), color("#727B2B"), color("#4B5E20"),] },
        { 'name': 'spacestationpIIII', 'colors': [color("#EBC5DD"), color("#C297CC"), color("#52B5CE"), color("#4A3D7B"),] },
        { 'name': 'ronin', 'colors': ["#D6A03F", "#A7933D", "#CE4055", "#408787", "#CD3D28", "#131A16",] },
        { 'name': 'ufodiscIV', 'colors': ["#DFD3AE", "#786F92", "#346F7A", "#244969",] },
        { 'name': 'space', 'colors': ["#61B496", "#E7833D", "#AB3356", "#0B1014",] },
        { 'name': 'lifeb4VIII', 'colors': ["#F5F4CB", "#64A4B8", "#E1466E",] },
        { 'name': 'mopopII', 'colors': ["#E8F4F5", "#E19A9F", "#E6B741", "#4A99AC", "#A5A246", "#D9713C",] },
        { 'name': 'swamp', 'colors': ["#9F9856", "#576B36", "#465925", "#152F0C",] },
        { 'name': 'wessexIV', 'colors': ["#BFB37B", "#D7AD56", "#AD985A", "#6A876E", "#4C6E6E", "#253D3E", "#313019", "#0B1015",] },
        { 'name': 'mlady', 'colors': ["#DF782E", "#3F626E", "#0D0B01",] },
        { 'name': 'Fertile Forest', 'colors': [color("#E9E18E"), color("#3B967F"), color("#008864"), color("#25331D"),] },
        { 'name': 'forestbronze', 'colors': ["#C08B3D", "#3D5627", "#101803",] },
        { 'name': 'Soul Shambles', 'colors': [color("#929255"), color("#927F19"), color("#933513"), color("#7D3113"), color("#1C1D13"),] },
        { 'name': 'Radiation Poisoning', 'colors': [color("#DFD086"), color("#E3C476"), color("#B7AD73"), color("#B29961"), color("#7D6F38"), color("#555525"), color("#554619"), color("#444D1E"), color("#2C2908"),] },
        { 'name': 'forestbronzeIII', 'colors': ["#C08B3D", "#A88B44", "#708656", "#A07032", "#565825", "#603E11", "#2E4025", "#1D250C", "#0E1304",] },
        { 'name': 'Baby', 'colors': [color("#DEB8DC"), color("#B799CF"), color("#D269A9"), color("#3F94BF"), color("#3D4BB8"),] },
        { 'name': 'ufodiscII', 'colors': ["#DFD3AE", "#D2C298", "#786F92", "#346F7A", "#244969", "#092024",] },
        { 'name': 'pinksII', 'colors': ["#B8B9C1", "#E24480", "#878787", "#3178C1", "#AE2987",] },
        { 'name': 'orange', 'colors': ["#B6A888", "#D14F25", "#261C10",] },
        { 'name': 'wessexII', 'colors': ["#D7AD56", "#9F9056", "#6E8B6E", "#37565C", "#0B1015",] },
        { 'name': 'swampIII', 'colors': ["#9F9856", "#576B36", "#A42517", "#152F0C",] },
        { 'name': 'miltonII', 'colors': ["#B9A46C", "#878159", "#58675E", "#3D4D45",] },
        { 'name': 'miltonIII', 'colors': ["#B9A46C", "#878056", "#3D4D45", "#020C0C",] },
        { 'name': 'Noble Nebulae', 'colors': [color("#DFB492"), color("#E5827E"), color("#B58694"), color("#B46C79"), color("#9C576B"), color("#76435D"), color("#276176"), color("#0B253D"),] },
        { 'name': 'mladyII', 'colors': ["#9E947A", "#DD752D", "#56838D", "#3F626E", "#6F5925", "#423D31", "#211616",] },
        { 'name': 'golddarkII', 'colors': ["#EFCA6E", "#B9883D", "#96703D", "#603D11", "#1C1302",] },
        { 'name': 'catchairIV', 'colors': ["#EFD849", "#EDC944", "#D7BB43", "#DE9B37", "#E3853C", "#E17734", "#DC592A", "#9B4E1E", "#883D16", "#533D0F", "#240B02",] },
        { 'name': 'tennysonill', 'colors': ["#D2B759", "#AC8933", "#7D6E3D", "#886D2D", "#78602A", "#80551B", "#3E0F04", "#160B01",] },
        { 'name': 'Space Flamingo', 'colors': [color("#EA9CB7"), color("#936DA6"), color("#BE5567"), color("#250000"),] },
        { 'name': 'pinksIII', 'colors': ["#B8B9C1", "#E24480", "#3178C1", "#AE2987",] },
        { 'name': 'brazil', 'colors': ["#C08B3D", "#708656", "#A07032", "#3D5627", "#0E1304",] },
        { 'name': 'Raven', 'colors': [color("#E89B38"), color("#5CA3A6"), color("#020106"),] },
        { 'name': 'germany', 'colors': ["#E1923C", "#D23630", "#211E1F",] },
        { 'name': 'Thrall Soul', 'colors': [color("#A89852"), color("#514A33"), color("#000000"),] },
        { 'name': 'Bloom Nebula', 'colors': [color("#F5D18B"), color("#00806F"), color("#005859"), color("#520027"),] },
        { 'name': "Tiger's Eye", 'colors': [color("#F7EA27"), color("#DC6D0C"), color("#1A1003"),] },
        { 'name': 'counterpoint', 'colors': ["#DCCBA4", "#6E9BA5", "#D24C25", "#151819",] },
        { 'name': 'pusikatMin', 'colors': ["#D2CA6D", "#D2473D", "#252525",] },
        { 'name': 'Stardust', 'colors': [color("#E5827E"), color("#153D56"), color("#0B253D"),] },
        { 'name': 'unplesanatIII', 'colors': ["#E7D1AE", "#D98430", "#D74127", "#3D143D", "#0C0C0C",] },
        { 'name': 'butterflyII', 'colors': ["#D2983D", "#6F6029", "#241F0C",] },
        { 'name': 'counterpointII', 'colors': ["#6E9BA5", "#D24C25", "#151819",] },
        { 'name': 'bwpinkII', 'colors': ["#EEE8C2", "#E9C747", "#D2707E", "#17150F",] },
        { 'name': 'roninIII', 'colors': ["#D59F3E", "#D27637", "#A7933D", "#CE4055", "#408787", "#CD3D28", "#131A16",] },
        { 'name': 'Spring Sky', 'colors': [color("#FF92BA"), color("#BE569D"), color("#4695D3"), color("#9A316A"), color("#370029"),] },
        { 'name': 'Heartbreak', 'colors': [color("#C8A072"), color("#A51830"), color("#991418"), color("#62222F"),] },
        { 'name': 'RandomPalette86', 'colors': [color("#FBDFBB"), color("#FD9DA0"), color("#C3667E"), color("#7F5182"), color("#040809"),] },
        { 'name': 'Psychopsilociben', 'colors': [color("#FFD430"), color("#E1672A"), color("#C51846"), color("#0A1020"),] },
        { 'name': 'Static', 'colors': [color("#FBFCDF"), color("#B1AF99"), color("#706F5B"), color("#2A290E"),] },
        { 'name': 'Dream Pool', 'colors': [color("#BF9FB2"), color("#BFB287"), color("#94627E"), color("#4B7E82"), color("#54697B"), color("#3C2834"),] },
        { 'name': 'Prom Queen', 'colors': [color("#D2A4B5"), color("#8196AF"), color("#B8425A"), color("#903E64"), color("#6A3C67"), color("#37356A")] },
        { 'name': "90's", 'colors': [color("#F375CF"), color("#04BBFC"), color("#000000"),] },
        { 'name': 'Colour out of Space', 'colors': [color("#E7CF9F"), color("#52807D"), color("#69394B"),] },
        { 'name': 'Rave', 'colors': [color("#25A8FC"), color("#ED0060"), color("#000025"),] },
        { 'name': 'Flank Attack', 'colors': [color("#E59AD0"), color("#DB0020"), color("#00304B"),] },
        { 'name': 'Yeti Taint', 'colors': [color("#D5C5AA"), color("#6D9FB3"), color("#258AB3"), color("#264C6D"),] },
        { 'name': 'Blood Ritual', 'colors': [color("#CB1528"), color("#4D0F1B"), color("#100F11"),] },
        { 'name': 'Mesmerize', 'colors': [color("#FDC982"), color("#BD6B6A"), color("#B43931"), color("#8B0000"), color("#000000"),] },
        { 'name': 'Moon', 'colors': [color("#C2BDB0"), color("#868079"), color("#443E3E"), color("#3E3D31"), color("#040302"),] },
        { 'name': 'squares', 'colors': [color("#92914C"), color("#6E6F67"), color("#92801A"), color("#933513"),] },

        { 'name': 'Metallurgy', 'colors': [color("#FDE4A2"), color("#36677A"), color("#746E00"), color("#0F0000"),] },


    ]
    palettes["sinCube"] = sinCubePalettes
    for (let i in visionsThemes) {
        palettes[visionsThemes[i]] = visionsPalettes[i]
    }
    return palettes
}