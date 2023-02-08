

class SinSquare {
    constructor(parms) {
        for (let k of Object.keys(parms)) {
            eval("this." + k + " = parms['" + k + "']")
        }
        // console.log("constructor radius (val)" + this.radius.val)
        // console.log("constructor this.radius.val: " + this.radius)
        // console.log("constructor this.mag.val: " + this.mag)
        let max_r_range = [DIM / 256, DIM / 72]
        if (colors.length >= 20) {
            max_r_range = [DIM / 72, DIM / 64]
        } else if (colors.length >= 10) {
            max_r_range = [DIM / 64, DIM / 48]
        }
        if (this.radius.val < HEIGHT / 10) {
            if (this.cycles > 8) {
                max_r_range[1] = Math.min(max_r_range[1], DIM / 64)
            } else if (this.cycles > 5) {
                max_r_range[1] = Math.min(max_r_range[1], DIM / 64)
            } else {
                max_r_range[1] = Math.min(max_r_range[1], DIM / 48)
            }
        } else if (this.radius.val < HEIGHT / 3) {
            max_r_range[1] = Math.min(max_r_range[1], DIM / 36)
        }
        max_r_range[0] /= this.nFactor
        max_r_range[1] /= this.nFactor
        this.max_r = new OscParm(
            "Max Radius",
            fbtw(...max_r_range),
            fbtw(.5, 2),
            ibtw(1, 5) * 10
        )
        if (this.mode == "LINE") {
            this.dist = dist(...this.endPoints)
            this.grade = angleBetweenPoints(...this.endPoints)
            this.cycDist = this.dist / this.cycles
        } else if (this.mode == "RING") {
            this.cycAngle = 2 * PI / this.cycles
            this.minMag = this.mag
            this.maxMag = this.mag * (1 + this.magVariance)
            this.magIncrement = max((this.maxMag - this.minMag) / this.magSpeed, 1);


            // console.log("New OscParm: " + this.max_r.val)

        } else if (this.mode == "SPIN") {
            let angle = atan((this.h / 2) / (this.w / 2))
            this.radius = (this.h / 2 / sin(angle)) * .5//.5
            this.anchorPoints = [[this.v_x + cos(this.angles[0]) * this.radius, this.v_y + sin(this.angles[0]) * this.radius]]
            this.angles.push((this.angles[0] + PI / 2 + random() * PI / 2) % (2 * PI))
            this.anchorPoints.push([this.v_x + cos(this.angles[1]) * this.radius, this.v_y + sin(this.angles[1]) * this.radius])
        }
    }
    getVertex() {
        if (this.ov) {
            console.log("OV: " + this.vertex.val)
            return this.vertex.val
        }
        // console.log("not OV: " + this.vertex)
        return this.vertex
    }
    draw() {
        if (this.mode == "LINE") {
            noStroke()
            for (let i = 0; i < this.n; i++) {
                let d = random() * this.dist
                let xbase = this.endPoints[0] + cos(this.grade) * d
                let ybase = this.endPoints[1] + sin(this.grade) * d
                let sin_angle = (map(d % this.cycDist, 0, this.cycDist, 0, 2 * PI) + this.offset.val)
                let curr_sin = sin(sin_angle % (2 * PI))
                let height_sin = sin((sin_angle + this.ripple.val) % (2 * PI))
                if (height_sin > 2 * PI || height_sin < -1) {
                    console.log("height_sin: " + height_sin)
                }
                let curr_y_variance = this.y_variance_mag * curr_sin
                if (curr_sin < 0) {
                    curr_y_variance *= (2 * (1 - curr_sin))
                }
                let y = ybase + curr_sin * this.mag.val + vary(this.mag.val, curr_y_variance)
                let curr_height = height_sin * height_sin * this.max_r.val
                // if (curr_sin < 0) {
                //     curr_height /= (1 * (1 - height_sin))
                //     // y += curr_sin * this.
                //     mag * 1.5
                // }
                if (curr_height > HEIGHT) {
                    console.log("height_sin: " + height_sin)
                    console.log("max_r: " + this.max_r.val)
                    console.log("curr_x/y: " + xbase + "/" + y + "/" + curr_height)
                }
                // console.log("x,y,h: " + xbase + "/" + y + "/" + curr_height)
                let currColors = this.getColors(this.palette, this.cIdx, this.alpha.val)
                glitchSquare(currColors, xbase, y, curr_height + this.min_r)
            }
            this.ripple.increment()
            this.offset.increment()
            this.max_r.increment()
            // this.offset = (this.offset - this.offsetSpeed + 2 * PI) % (2 * PI)
        } else if (this.mode == "RING") {
            noStroke()
            for (let i = 0; i < this.n; i++) {


                let d = random() * 2 * PI
                let cycle_num = Math.floor(d / this.cycAngle)
                // console.log("cycle_num:" + cycle_num)
                // console.log('this.cubeRadii[cycle_num]: ' + this.cubeRadii[cycle_num])
                // console.log('this.max_r.val: ' + this.max_r.val)
                // console.log('max_r.val: ' + max_r)
                // let max_r = this.max_r.val
                let cycPct = (d * 1) % this.cycAngle //pct through a cycle
                let curr_sin = sin((map(cycPct, 0, this.cycAngle, 0, 2 * PI) + this.offset.val) % (2 * PI))
                let curr_y_variance = this.y_variance_mag * curr_sin
                if (curr_sin < 0) {
                    curr_y_variance *= (2 * (1 - curr_sin))
                }
                let v = this.getVertex()
                // console.log("v0, v1" + v[0] + "/" + v[1])
                // console.log("this.radius.val : " + this.radius.val)
                // console.log("this.mag.val : " + this.mag.val)
                let curr_x = v[0] + cos(d) * this.radius.val + (this.mag.val + vary(this.mag.val, curr_y_variance)) * cos(d) * curr_sin
                let curr_y = v[1] + sin(d) * this.radius.val + (this.mag.val + vary(this.mag.val, curr_y_variance)) * sin(d) * curr_sin
                // let curr_x = this.vertex.val[0] + cos(d) * this.radius.val + (this.mag.val + vary(this.mag.val, curr_y_variance)) * cos(d) * curr_sin
                // let curr_y = this.vertex.val[1] + sin(d) * this.radius.val + (this.mag.val + vary(this.mag.val, curr_y_variance)) * sin(d) * curr_sin
                // let curr_height = curr_sin * curr_sin * this.max_r.val
                let curr_height = curr_sin * this.max_r.val
                if (curr_sin < 0) {
                    curr_height /= (10 * (1 - curr_sin))
                    // curr_y += curr_sin * this.mag.val * 1.5
                }
                // console.log("curr_x/y: " + curr_x + "/" + curr_y + "/" + curr_height)
                let currColors = this.getColors(this.palette, this.cIdx, this.alpha.val)
                // console.log("curr_x/y: " + curr_x + "/" + curr_y + "/" + curr_height)
                glitchSquare(currColors, curr_x, curr_y, curr_height + this.min_r)
            }
            // this.offset = (this.offset - this.offsetSpeed + 2 * PI) % (2 * PI)
            this.offset.increment()
            this.mag.increment()
            this.radius.increment()
            this.max_r.increment()
            this.hueShift.increment()
            if (this.ov) this.vertex.increment()

            // console.log("Hues: " + oldHueShift + "," + this.hueShift.val)
        } else if (this.mode == "SPIN") {
            noStroke()
            for (let i = 0; i < this.n; i++) {
                // console.log(" this.anchorPoints:" + this.anchorPoints)
                // console.log(" this.anchorPoints[0]:" + this.anchorPoints[0])
                // console.log(" this.anchorPoints[1]:" + this.anchorPoints[1])
                let currDist = dist(...this.anchorPoints[0], ...this.anchorPoints[1])
                let grade = angleBetweenPoints(...this.anchorPoints[0], ...this.anchorPoints[1])
                let d = random() * currDist
                let cycDist = currDist / this.cycles
                let cycle_num = Math.floor(currDist / this.cycles)
                let xbase = this.anchorPoints[0][0] + cos(grade) * d
                let ybase = this.anchorPoints[0][1] + sin(grade) * d
                let sin_angle = (map(d % cycDist, 0, cycDist, 0, 2 * PI) + this.offset.val)
                let curr_sin = sin(sin_angle % (2 * PI))
                // console.log("curr_sin: " + curr_sin)
                let curr_cos = cos(sin_angle % (2 * PI))
                let height_sin = sin((sin_angle + this.ripple.val) % (2 * PI))
                // if (height_sin > 2 * PI || height_sin < -1) {
                //     console.log("height_sin: " + height_sin)
                // }
                let curr_y_variance = this.y_variance_mag * curr_sin
                if (curr_sin < 0) {
                    curr_y_variance *= (2 * (1 - curr_sin))
                }
                //PARTY MODE:
                // let y = ybase + curr_sin * this.mag// + vary(this.mag, curr_y_variance)
                // let x = xbase + curr_cos * this.mag
                //END PARTY MODE
                let y = ybase + curr_sin * sin(grade + PI / 2) * this.mag.val// + vary(this.mag, curr_y_variance)
                let x = xbase + curr_sin * cos(grade + PI / 2) * this.mag.val
                // let y = ybase //+ sin(grade + HALFPI) * (this.mag) //+ vary(this.mag, curr_y_variance))
                // let x = xbase //+ cos(grade + HALFPI) * (this.mag) //+ vary(this.mag, curr_y_variance))
                let curr_height = height_sin * height_sin * this.max_r.val
                // if (curr_sin < 0) {
                //     curr_height /= (1 * (1 - height_sin))
                //     // y += curr_sin * this.
                //     mag * 1.5
                // }
                if (curr_height > HEIGHT) {
                    console.log("height_sin: " + height_sin)
                    console.log("max_r: " + this.max_r.val)
                    console.log("curr_x/y: " + xbase + "/" + y + "/" + curr_height)
                }
                let currColors = this.getColors(this.palette, this.cIdx, this.alpha.val)
                // console.log("currColors: " + currColors)
                // console.log("curr_x/y: " + x + "/" + y + "/" + curr_height)

                // glitchSquare(currColors, curr_x, curr_y, curr_height + this.min_r, this.hueShift.val)
                glitchSquare(currColors, x, y, curr_height + this.min_r)
            }
            this.ripple.increment()
            this.offset.increment()
            for (let i in this.anchorPoints) {
                this.angles[i] = rotateAngle(this.angles[i], this.spinSpeeds[i])
                this.anchorPoints[i] = calcXYonCircle(this.v_x, this.v_y, this.radius, this.angles[i])
            }
            this.hueShift.increment()
            this.mag.increment()
        }
    }

    getColors(palette, cIdx, alpha) {
        clrs = [wA(palette["colors"][cIdx], alpha)]
        let curr_c = randomShiftHSL(palette["colors"][cIdx], 10, 20, 20)
        if (this.colorMode == "PALETTE") {
            let altC1 = randomShiftHSL(palette["colors"][(cIdx + 1) % palette["colors"].length], 10, 10, 10)
            let altC2 = randomShiftHSL(palette["colors"][(cIdx + palette["colors"].length - 1) % palette["colors"].length], 10, 10, 10)
            clrs.push(wA(altC1, alpha))
            clrs.push(wA(altC2, alpha))
        } else if (this.colorMode == "GLITCH") {
            let altC1 = wA(shiftHSL(curr_c, hueShift * -1, 50, 20), alpha) //-50 to darken
            let altC2 = wA(shiftHSL(curr_c, hueShift, 50, 20), alpha)
            clrs.push(altC1)
            clrs.push(altC2)
        }
        return clrs
    }
}

function glitchSquare(clrs, x, y, r) {
    // pct_offset = .075
    pct_offset = .15
    cube(clrs[1], x - r * pct_offset, y - r * pct_offset, r)
    cube(clrs[2], x + r * pct_offset, y + r * pct_offset, r)
    cube(clrs[0], x, y, r)
}

function createSinSquareShape(parms) {
    // console.log("create sinSquares")
    let { xRange, yRange, nFactor, type, maxRadius, vertex, ov } = parms
    let sinShapes = []
    // let h = abs(yRange[1] - yRange[0])
    // let w = abs(xRange[1] - xRange[0])
    let row_height = maxRadius / colors.length
    for (let i = 0; i < colors.length; i++) {

        let currParms = {
            "palette": palette,
            "maxRadius": maxRadius,
            "xRange": xRange,
            "yRange": yRange,
            // "h": h,
            // "w": w,
            "nFactor": nFactor,
            "clr": colors[i],
            "cIdx": i,
            "colorMode": "PALETTE",
            "n": ibtw(minN, maxN) / nFactor,
            "cycles": rFrom([1, 2, 3, 4, 5, 6, 9, 13]),
            // "max_r": HEIGHT / rFrom([64, 48, 32, 24]),
            // "max_r": h / rFrom(max_r_options),
            "min_r": DIM / 512,
            "y_variance_mag": fbtw(0, .0),//.5,s
            // "offset": new RadialSpinParm(0),
            "offset": new RadialSpinParm(fbtw(PI / -128, PI / 128)),
            "mode": type,
            "angles": [random() * TWOPI],
            "ripple": new RadialSpinParm(fbtw(PI / -32, PI / 32)),
            "spinSpeeds": [fbtw(PI / -256, PI / 256), fbtw(PI / -256, PI / 256)],
            "mag": new OscParm(
                "Mag",
                row_height / fbtw(.5, 5),
                fbtw(.75, 1.3),
                ibtw(1, 5) * 75
            ),
            "endPoints": [
                0,
                (i + .5) * row_height + vary(HEIGHT, .3),
                WIDTH,
                (i + .5) * row_height + vary(HEIGHT, .3)
            ],
            "radius": new OscParm(
                "Radius",
                row_height * (i),
                (fbtw(.5, 1)),
                ibtw(1, 5) * 120
            ),
            "orbitingVertex": ov,
            "vertex": vertex,
            // "v_x": xRange[0] + w / 2,
            // "v_y": yRange[0] + h / 2,
            "hueShift": new OscParm(
                "hueShift",
                200,
                .35,
                ibtw(1, 5) * 175

            ),
            "alpha": new AnnualParm(
                "alpha",
                [.25, 1],
                .25,
                "COS",
                birthdayOffset
            )
        }
        totalSinSquares += currParms["n"]
        sinShapes.push(new SinSquare(currParms))
    }
    return sinShapes
}

function selectPattern() {
    if (p(1.33)) {
        patternType = "Symmetric"
        if (p(1.25)) {
            pattern = 1
        } else if (p(.33)) {
            pattern = 2
        } else if (p(.5)) {
            pattern = 3
        } else {
            pattern = 4
        }
    } else if (p(-.5)) {
        patternType = "Centered"
        if (p(-.25)) {
            //Middle : .4, 3x3 surround
            pattern = 5
        } else if (p(-.33)) {
            //middle : .5 3x3 or 4x4 surround
            pattern = 6
        } else if (p(-.5)) {
            //middle : .6 4x4 surround
            pattern = 7

        } else {
            //middle : .75 4x4 or 5x5
            pattern = 8
        }
    } else if (p(1.5)) {
        patternType = "Radial"
        if (p(1.25)) {
            pattern = 9
        } else if (p(.33)) {
            pattern = 10
        } else if (p(.5)) {
            pattern = 11
        } else {
            pattern = 12
        }

    } else {
        patternType = "Asymmetric"
        if (p(.25)) {
            // 3x3 w/ 4 in corner
            pattern = 13
        } else if (p(.33)) {
            //4x4 w/ 4 in corner
            pattern = 14
        } else if (p(.5)) {
            //4x4 w/ 9 in corner
            pattern = 15
        } else {
            //5x5 w/ 9 in corner
            pattern = 16

        }
    }
}

function loadSquareSinForPattern() {
    if (patternType == "Symmetric") {
        let rows = pattern
        let cols = pattern
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                sinSquares = sinSquares.concat(createSinSquareShape(
                    {
                        "mode": "MEDIUM",
                        "xRange": [(DIM / rows) * r, (DIM / rows) * (r + 1)],
                        "yRange": [(DIM / cols) * c, (DIM / cols) * (c + 1)],
                        "vertex": [
                            (DIM / rows) * (r + .5),
                            (DIM / cols) * (c + .5),
                        ],
                        "nFactor": (rows * cols),
                        "maxRadius": (DIM / 2 / pattern),
                        // "vertex": new OrbitParm(vertex, angle, radius * DIM / 2, orbitSpeed),
                        // "type": "SPIN"
                        // "type": "LINE"
                        "type": "RING"
                    }))

            }
        }
    } else if (patternType == "Centered") {
        let centerRange
        let center
        let a
        let imarginpct
        let nFactor
        if (pattern == 5) { //.4
            center = .4
            imarginpct = .4
            a = 3
            centerRange = calcCenterRange(0, DIM, center)

        } else if (pattern == 6) { //.5
            center = .5
            imarginpct = .4
            a = 3
            centerRange = calcCenterRange(0, DIM, .5)
        } else if (pattern == 7) { //.6
            center = .6
            imarginpct = .4
            a = 5
            centerRange = calcCenterRange(0, DIM, .65)
        } else {//must be 8 , .75
            center = .7
            imarginpct = .4
            a = 6
            centerRange = calcCenterRange(0, DIM, .85)

        }
        nFactor = (a - 1) * 4
        sinSquares = sinSquares.concat(createSinSquareShape(
            {
                "xRange": centerRange,
                "yRange": centerRange,
                "nFactor": ~~(Math.sqrt(nFactor)),
                // "type": "SPIN"
                // "type": "LINE"
                "type": "RING"
            }))
        margin = min(DIM * (1 - center) / 2, DIM / a) //in pixels
        let xmargin = ((DIM - 0) - (a * margin)) / (a - 1)
        let imargin = (imarginpct) * margin / 2
        if (xmargin < 0) {
            console.log("MARGIN COLLISSION, pattern: " + pattern)
        }

        rects = []
        for (let r = 0; r < a; r++) {
            for (let c = 0; c < a; c++) {
                if (r == 0 || r == (a - 1) || c == 0 || c == (a - 1)) {
                    rects.push([
                        [
                            imargin + (xmargin + margin) * c,
                            margin * (c + 1) + xmargin * c - imargin
                        ],
                        [
                            imargin + (xmargin + margin) * r,
                            margin * (r + 1) + xmargin * r - imargin
                        ]
                    ])
                    sinSquares = sinSquares.concat(createSinSquareShape(
                        {
                            "xRange": [
                                imargin + (xmargin + margin) * c,
                                margin * (c + 1) + xmargin * c - imargin
                            ],
                            "yRange": [
                                imargin + (xmargin + margin) * r,
                                margin * (r + 1) + xmargin * r - imargin
                            ],
                            "nFactor": nFactor,
                            "type": "SPIN"
                            // "type": "LINE"
                            // "type": "RING"
                        }))
                }
            }
        }
        patternParms = {
            "a": a,
            "margin": margin,
            "imarginpct": imarginpct,
            "xmargin": xmargin,
            "center": center,
            "rects": rects
        }
    } else if (patternType == "Radial") {
        console.log("Radial")
        let r = [] //distance of center from center
        let a
        let n = []
        let w = []
        let orbit = []
        if (pattern == 9) {
            // a = 1
            // r = [.3]
            // w = [.125]
            // n = [3]
            // orbit = [true, true, true]
            a = 3
            r = [.0, .55, .9]
            w = [.125, .09, .075]
            n = [1, 6, 9]
            orbit = [true, true, true]
        } else if (pattern == 10) {
            a = 3
            r = [0, .45, .85]
            w = [.2, .105, .075]
            n = [1, 4, 8]

        } else if (pattern == 11) {
            a = 2
            r = [0, .75]
            w = [.35, .1]
            n = [1, 11]

        } else {
            a = 2
            r = [0, .7]
            w = [.45, .1]
            n = [1, 5]

        }
        /*
        layer = index of parms
        radial = n radials per layer
        */
        for (let layer = 0; layer < r.length; layer++) {
            let radianIncrement = (2 * PI) / n[layer]
            let angle = fxrand() * 2 * PI
            let orbitSpeed
            if (orbit[layer]) {
                orbitSpeed = 0
                // orbitSpeed = fxrand() * PI / 512 - PI / 1024
            }
            for (let radial = 0; radial < n[layer]; radial++) {

                let widthPct = w[layer]
                let radius = r[layer]
                // let vertex = [DIM / 2 + cos(angle) * radius * DIM / 2, DIM / 2 + sin(angle) * radius * DIM / 2]
                let vertex = [DIM / 2, DIM / 2]
                let maxRadius = widthPct * DIM
                // let xRange = [vertex[0] - widthPct * DIM, vertex[0] + widthPct * DIM]
                // let yRange = [vertex[1] - widthPct * DIM, vertex[1] + widthPct * DIM]
                // console.log("xRange: " + xRange)
                // console.log("yRange: " + yRange)

                sinSquares = sinSquares.concat(createSinSquareShape(
                    {
                        "mode": "MEDIUM",
                        // "xRange": xRange,
                        // "yRange": yRange,
                        "maxRadius": maxRadius,
                        "nFactor": 4,
                        "ov": true,
                        "vertex": new OrbitParm(vertex, angle, radius * DIM / 2, orbitSpeed),
                        // "type": "SPIN"
                        // "type": "LINE"
                        "type": "RING"
                    }))
                angle += radianIncrement
            }
        }
    }
}

function calcCenterRange(s, e, pct) {
    let margin = (e - s) * (1 - pct) / 2
    return [
        s + margin,
        e - margin
    ]
}
