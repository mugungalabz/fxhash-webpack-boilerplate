

class SinSquare {
    constructor(parms) {
        for (let k of Object.keys(parms)) {
            eval("this." + k + " = parms['" + k + "']")
        }
        if (this.mode == "LINE") {
            this.dist = dist(...this.endPoints)
            this.grade = angleBetweenPoints(...this.endPoints)
            this.cycDist = this.dist / this.cycles
        } else if (this.mode == "RING") {
            this.cycAngle = 2 * PI / this.cycles
            this.minMag = this.mag
            this.maxMag = this.mag * (1 + this.magVariance)
            this.magIncrement = max((this.maxMag - this.minMag) / this.magSpeed, 1);

            let max_r_range = [DIM / 64, DIM / 12]
            if (colors.length >= 20) {
                max_r_range = [DIM / 72, DIM / 64]
            } else if (colors.length >= 10) {
                max_r_range = [DIM / 64, DIM / 48]

            }
            if (this.radius.val < HEIGHT / 10) {
                if (this.cycles > 8) {
                    max_r_range[1] = Math.min(max_r_range[1], DIM / 56)
                } else if (this.cycles > 5) {
                    max_r_range[1] = Math.min(max_r_range[1], DIM / 48)
                } else {
                    max_r_range[1] = Math.min(max_r_range[1], DIM / 32)
                }
            } else if (this.radius.val < HEIGHT / 3) {
                max_r_range[1] = Math.min(max_r_range[1], DIM / 24)
            }
            this.max_r = new OscParm(
                "Max Radius",
                fbtw(...max_r_range),
                fbtw(.5, 2),
                ibtw(1, 5) * 10
            )
            // console.log("New OscParm: " + this.max_r.val)
            if (this.maxRadiusByi) {
                this.cubeRadii = []
                if (this.cycles.length % 2 == 0) {
                    for (let i = 0; i < this.cycles; i++) {
                        // this.cubeRadii.push(this.max_r.val)
                        this.cubeRadii.push(this.max_r.val * (1 + (i % 2) * 3))
                    }
                } else {
                    for (let i = 0; i < this.cycles; i++) {
                        // this.cubeRadii.push(this.max_r.val)
                        this.cubeRadii.push(this.max_r.val)
                    }
                    // this.maxRadiusByi = false
                }
                console.log("this.cycles: " + this.cycles)
                console.log("this.radius: " + this.radius.val)
                // console.log("maxRadiusByi: " + this.cubeRadii)
            }
        } else if (this.mode == "SPIN") {
            let angle = atan((HEIGHT / 2) / (WIDTH / 2))
            this.radius = (HEIGHT / 2 / sin(angle)) * .5//.5
            this.anchorPoints = [[this.v_x + cos(this.angles[0]) * this.radius, this.v_y + sin(this.angles[0]) * this.radius]]
            this.angles.push((this.angles[0] + PI / 2 + random() * PI / 2) % (2 * PI))
            this.anchorPoints.push([this.v_x + cos(this.angles[1]) * this.radius, this.v_y + sin(this.angles[1]) * this.radius])
            // if (dist(...this.anchorPoints[0], this.v_x, this.v_y) != this.radius) {
            //     console.log("did not init the correct anchorPoint")
            //     console.log("radius: " + this.radius)
            //     console.log("dist(..." + (dist(...this.anchorPoints[0], this.v_x, this.v_y)))
            // }
            // console.log("this.anchorPoints @ init: " + this.anchorPoints)
        }
    }
    draw() {
        if (this.mode == "LINE") {
            noStroke()
            for (let i = 0; i < this.n; i++) {
                let d = random() * this.dist
                let xbase = this.endPoints[0] + cos(this.grade) * d
                let ybase = this.endPoints[1] + sin(this.grade) * d
                let sin_angle = (map(d % this.cycDist, 0, this.cycDist, 0, 2 * PI) + this.offset)
                let curr_sin = sin(sin_angle % (2 * PI))
                let height_sin = sin((sin_angle + this.ripple.val) % (2 * PI))
                if (height_sin > 2 * PI || height_sin < -1) {
                    console.log("height_sin: " + height_sin)
                }
                let curr_y_variance = this.y_variance_mag * curr_sin
                if (curr_sin < 0) {
                    curr_y_variance *= (2 * (1 - curr_sin))
                }
                let y = ybase + curr_sin * this.mag + vary(this.mag, curr_y_variance)
                let curr_height = height_sin * height_sin * this.max_r
                // if (curr_sin < 0) {
                //     curr_height /= (1 * (1 - height_sin))
                //     // y += curr_sin * this.
                //     mag * 1.5
                // }
                if (curr_height > HEIGHT) {
                    console.log("height_sin: " + height_sin)
                    console.log("max_r: " + this.max_r)
                    console.log("curr_x/y: " + xbase + "/" + y + "/" + curr_height)
                }
                glitchSquare(this.clr, xbase, y, curr_height + this.min_r)
            }
            this.ripple.increment()
            this.offset = (this.offset - this.offsetSpeed + 2 * PI) % (2 * PI)
        } else if (this.mode == "RING") {
            noStroke()
            for (let i = 0; i < this.n; i++) {


                let d = random() * 2 * PI
                let cycle_num = Math.floor(d / this.cycAngle)
                // console.log("cycle_num:" + cycle_num)
                let max_r = this.maxRadiusByi ? this.cubeRadii[cycle_num] : this.max_r.val
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
                let curr_x = this.v_x + cos(d) * this.radius.val + (this.mag.val + vary(this.mag.val, curr_y_variance)) * cos(d) * curr_sin
                let curr_y = this.v_y + sin(d) * this.radius.val + (this.mag.val + vary(this.mag.val, curr_y_variance)) * sin(d) * curr_sin
                let curr_height = curr_sin * curr_sin * max_r
                // console.log("bounds: " + this.max_r.lowerBound + "," + this.max_r.upperBound)
                // console.log("this.max_r.start: " + this.max_r.start)
                // console.log("this.max_r.val: " + this.max_r.val)
                // console.log("curr_height: " + curr_height)
                if (curr_sin < 0) {
                    curr_height /= (10 * (1 - curr_sin))
                    // curr_y += curr_sin * this.mag.val * 1.5
                }
                // console.log("curr_x/y: " + curr_x + "/" + curr_y + "/" + curr_height)
                glitchSquare(this.clr, curr_x, curr_y, curr_height + this.min_r)
            }
            // this.offset = (this.offset - this.offsetSpeed + 2 * PI) % (2 * PI)
            this.offset.increment()
            this.mag.increment()
            this.radius.increment()
            this.max_r.increment()
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
                let sin_angle = (map(d % cycDist, 0, cycDist, 0, 2 * PI) + this.offset)
                let curr_sin = sin(sin_angle % (2 * PI))
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
                let y = ybase + curr_sin * sin(grade + PI / 2) * this.mag// + vary(this.mag, curr_y_variance)
                let x = xbase + curr_sin * cos(grade + PI / 2) * this.mag
                // let y = ybase //+ sin(grade + HALFPI) * (this.mag) //+ vary(this.mag, curr_y_variance))
                // let x = xbase //+ cos(grade + HALFPI) * (this.mag) //+ vary(this.mag, curr_y_variance))
                let curr_height = height_sin * height_sin * this.max_r
                // if (curr_sin < 0) {
                //     curr_height /= (1 * (1 - height_sin))
                //     // y += curr_sin * this.
                //     mag * 1.5
                // }
                if (curr_height > HEIGHT) {
                    console.log("height_sin: " + height_sin)
                    console.log("max_r: " + this.max_r)
                    console.log("curr_x/y: " + xbase + "/" + y + "/" + curr_height)
                }
                // fill(13, 13, 13)
                // circle(...this.anchorPoints[0], 10)
                // fill(13, 255, 13)
                // circle(...this.anchorPoints[1], 20)
                glitchSquare(this.clr, x, y, curr_height + this.min_r)
            }
            this.ripple.increment()
            this.offset = (this.offset - this.offsetSpeed + 2 * PI) % (2 * PI)
            for (let i in this.anchorPoints) {
                this.angles[i] = rotateAngle(this.angles[i], this.spinSpeeds[i])
                this.anchorPoints[i] = calcXYonCircle(this.v_x, this.v_y, this.radius, this.angles[i])
            }
        }
    }
}

function glitchSquare(c, x, y, r) {
    let curr_c = randomShiftHSL(c, 10, 10, 10)
    pct_offset = .075
    // hueShift = rFrom([120,30, 20])
    hueShift = rFrom([90])
    altC1 = shiftHSL(curr_c, hueShift * -1, 30, 10) //-50 to darken
    altC2 = shiftHSL(curr_c, hueShift, 30, 10)
    // altCI = saturate(rotateHue(c, -100), 30)
    // altC2 = saturate(rotateHue(c, 100), 30)
    // drawingContext.shadowOffsetX = 5;
    // drawingContext.shadowOffsetY = -5;
    // drawingContext.shadowBlur = 10;
    // drawingContext.shadowColor = wA(altC2, 1);
    cube(wA(altC1, .3), x - r * pct_offset, y - r * pct_offset, r)
    cube(wA(altC2, .3), x + r * pct_offset, y + r * pct_offset, r)
    cube(wA(curr_c, .75), x, y, r)
}
function createSinSquareRings() {
    let sinShapes = []
    let row_height = HEIGHT / colors.length / 2
    for (let i = 0; i < colors.length; i++) {
        // for (let i = 0; i < 1; i++) {
        // let cycles = 
        let
            currParms = {
                "clr": colors[i],
                "n": ibtw(minN, maxN),
                "cycles": ibtw(1, 15),
                // "max_r": HEIGHT / rFrom([64, 48, 32, 24]),
                "min_r": HEIGHT / 512,
                "y_variance_mag": fbtw(0, .15),//.5,
                offset: new RadialSpinParm(fbtw(PI / -32, PI / 32)),
                "mode": "RING",
                "mag": new OscParm(
                    "Mag",
                    row_height / fbtw(.5, 3),
                    fbtw(1, 2),
                    ibtw(1, 5) * 120
                ),
                "radius": new OscParm(
                    "Radius",
                    row_height * (i + 1),
                    (fbtw(.5, 2)),
                    ibtw(1, 5) * 50
                ),
                "v_x": DIM / 2,
                "v_y": DIM / 2,
                "maxRadiusByi": p(1.5)
            }
        totalSinSquares += currParms["n"]
        sinShapes.push(new SinSquare(currParms))
    }
    return sinShapes
}
function createSinSquareLines() {
    let sinShapes = []
    let row_height = HEIGHT / colors.length
    for (let i = 0; i < colors.length; i++) {
        currParms = {
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

function createSinSquareSpins(mode) {
    let sinShapes = []
    let row_height = HEIGHT / colors.length
    for (let i = 0; i < colors.length; i++) {
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
            "clr": colors[i],
            "n": ibtw(minN, maxN),
            "mag": row_height / ibtw(...mag_options),
            // "mag": HEIGHT / 10, //party mode
            "cycles": ibtw(...cycle_options),
            "max_r": HEIGHT / rFrom(max_r_options),
            "min_r": HEIGHT / 512,
            "y_variance_mag": 0,//.15,
            "offset": random() * 2 * PI,
            "offsetSpeed": fbtw(PI / -8, PI / 8),
            "mode": "SPIN",
            "angles": [random() * TWOPI], //note, more angles get added to this list
            "ripple": new RadialSpinParm(fbtw(PI / -8, PI / 8)),
            "v_x": DIM / 2,
            "v_y": DIM / 2,
            "spinSpeeds": [fbtw(PI / -256, PI / 256), fbtw(PI / -256, PI / 256)]
        }
        totalSinSquares += currParms["n"]
        sinShapes.push(new SinSquare(currParms))
    }
    return sinShapes
}