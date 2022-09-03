
function createSinSquareLines() {
    let sinShapes = []
    let row_height = HEIGHT / colors.length
    for (let i = 0; i < colors.length; i++) {
        currParms = {
            "palette": palette,
            "cIdx": i,
            "colorMode": "PALETTE",
            "clr": colors[i],
            "n": ibtw(minN, maxN),
            "mag": row_height / ibtw(3, 6),
            "cycles": ibtw(2, 4),
            "max_r": HEIGHT / rFrom([64, 48, 32, 24]),
            "min_r": HEIGHT / 512,
            "y_variance_mag": .5,
            "offset": random() * 2 * PI,
            "offsetSpeed": fbtw(PI / -8, PI / 8),
            "mode": "LINE",
            "endPoints": [
                0,
                (i + .5) * row_height + vary(HEIGHT, .3),
                WIDTH,
                (i + .5) * row_height + vary(HEIGHT, .3)
            ],
            "ripple": new RadialSpinParm(fbtw(PI / -8, PI / 8)),
        }
        totalSinSquares += currParms["n"]
        sinShapes.push(new SinSquare(currParms))
    }
    return sinShapes
}
function createSinSquareRings(parms) {
    let { mode, xRange, yRange, nFactor } = parms
    let h = abs(yRange[1] - yRange[0])
    let w = abs(xRange[1] - xRange[0])
    let row_height = h / colors.length
    let sinShapes = []
    for (let i = 0; i < colors.length; i++) {
        // for (let i = 0; i < 1; i++) {
        // let cycles = 
        let currParms = {
            "palette": palette,
            "xRange": xRange,
            "yRange": yRange,
            "h": h,
            "w": w,
            "nFactor": nFactor,
            "clr": colors[i],
            "cIdx": i,
            "colorMode": "PALETTE",
            "n": ibtw(minN, maxN),
            "cycles": ibtw(1, 15),
            // "max_r": HEIGHT / rFrom([64, 48, 32, 24]),
            // "max_r": h / rFrom(max_r_options),
            "min_r": h / 512,
            "y_variance_mag": fbtw(0, .5),//.5,
            "offset": new RadialSpinParm(fbtw(PI / -64, PI / 64)),
            "mode": "RING",
            "mag": new OscParm(
                "Mag",
                row_height / fbtw(.5, 3),
                fbtw(1, 1.3),
                ibtw(1, 5) * 120
            ),
            "radius": new OscParm(
                "Radius",
                row_height * (i),
                1,//(fbtw(.5, .75)),
                ibtw(1, 5) * 50
            ),
            "v_x": xRange[0] + w / 2,
            "v_y": yRange[0] + h / 2,
            "maxRadiusByi": p(1.5),
            "hueShift": new OscParm(
                "hueShift",
                200,
                .1,
                ibtw(1, 5) * 175

            ),
            "alpha": new AnnualParm(
                "alpha",
                [.05, .2],
                0,
                "COS",
                birthdayOffset
            )
        }
        totalSinSquares += currParms["n"]
        sinShapes.push(new SinSquare(currParms))
    }
    return sinShapes
}

function createSinSquareSpins(parms) {
    // let { mode, xRange, yRange, nFactor } = parms
    // let sinShapes = []
    // let h = abs(yRange[1] - yRange[0])
    // let w = abs(xRange[1] - xRange[0])
    // let row_height = h / colors.length
    for (let i = 0; i < colors.length; i++) {
        // for (let i = 0; i < 1; i++) {
        // for (let i = 0; i < 2; i++) {
        let max_r_options = [72, 64, 48,]
        let cycle_options = [1, 3]
        let mag_options = [1, 10]
        if (mode == "SMALL") {
            max_r_options = [HEIGHT, HEIGHT / 2, HEIGHT / 3,]
            // max_r_options = [256, 175, 148,]
            cycle_options = [1, 10]
            mag_options = [3, 16]
        }
        currParms = {
            "palette": palette,
            "xRange": xRange,
            "yRange": yRange,
            "h": h,
            "w": w,
            "nFactor": nFactor,
            "clr": colors[i],
            "colorMode": "PALETTE",
            "cIdx": i,
            "n": ibtw(minN, maxN) / nFactor,
            "cycles": ibtw(...cycle_options),
            "max_r": h / rFrom(max_r_options),
            "min_r": h / 512,
            "y_variance_mag": 0,//.15,
            "offset": random() * 2 * PI,
            "offsetSpeed": fbtw(PI / -8, PI / 8),
            "mode": "SPIN",
            "angles": [random() * TWOPI], //note, more angles get added to this list
            "ripple": new RadialSpinParm(fbtw(PI / -8, PI / 8)),
            "v_x": xRange[0] + w / 2,
            "v_y": yRange[0] + h / 2,
            "spinSpeeds": [fbtw(PI / -256, PI / 256), fbtw(PI / -256, PI / 256)],
            "mag": new OscParm(
                "magShift",
                row_height / ibtw(...mag_options),
                fbtw(.1, 2),
                ibtw(1, 5) * 75
            ),
            "hueShift": new OscParm(
                "hueShift",
                200,
                .1,
                ibtw(1, 5) * 75

            )
        }
        totalSinSquares += currParms["n"]
        sinShapes.push(new SinSquare(currParms))
    }
    return sinShapes
}