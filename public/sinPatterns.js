

class SinSquare {
    constructor(parms) {
        for (let k of Object.keys(parms)) {
            eval("this." + k + " = parms['" + k + "']")
        }
        let max_r_range = [DIM / 128, DIM / 36]
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
                // let max_r = this.maxRadiusByi ? this.cubeRadii[cycle_num] : this.max_r.val
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
                let curr_height = curr_sin * curr_sin * this.max_r.val
                // console.log("bounds: " + this.max_r.lowerBound + "," + this.max_r.upperBound)
                // console.log("this.max_r.start: " + this.max_r.start)
                // console.log("this.max_r.val: " + this.max_r.val)
                // console.log("curr_height: " + curr_height)
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
            // this.offset = (this.offset - this.offsetSpeed + 2 * PI) % (2 * PI)
            for (let i in this.anchorPoints) {
                this.angles[i] = rotateAngle(this.angles[i], this.spinSpeeds[i])
                this.anchorPoints[i] = calcXYonCircle(this.v_x, this.v_y, this.radius, this.angles[i])
            }
            this.hueShift.increment()
            this.mag.increment()
        }
    }

    getColors(palette, cIdx, alpha) {
        // console.log("get Colors: " + cIdx)
        // console.log("color Gotten: " + palette["colors"][cIdx])
        // console.log("alpha for getcolors: " + alpha)
        clrs = [wA(palette["colors"][cIdx], alpha)]
        // console.log()
        let curr_c = randomShiftHSL(palette["colors"][cIdx], 10, 20, 20)
        // clrs = [wA(curr_c, .75)]
        if (this.colorMode == "PALETTE") {
            let altC1 = randomShiftHSL(palette["colors"][(cIdx + 1) % palette["colors"].length], 10, 10, 10)
            // console.log("cIdx: " + cIdx)
            // console.log("palette[colors].length: " + palette["colors"].length)
            // let minus1Cidx = (cIdx + palette["colors"].length - 1) % palette["colors"].length
            // console.log("minus1Cidx: " + minus1Cidx)
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
    pct_offset = .1
    cube(clrs[1], x - r * pct_offset, y - r * pct_offset, r)
    cube(clrs[2], x + r * pct_offset, y + r * pct_offset, r)
    cube(clrs[0], x, y, r)
}

function createSinSquareShape(parms) {
    let { mode, xRange, yRange, nFactor, type } = parms
    let sinShapes = []
    let h = abs(yRange[1] - yRange[0])
    let w = abs(xRange[1] - xRange[0])
    let row_height = h / colors.length / 2
    for (let i = 0; i < colors.length; i++) {
        let max_r_options = [72, 64, 48,]
        let cycle_options = [1, 3]
        let mag_options = [1, 10]
        if (mode == "SMALL") {
            max_r_options = [HEIGHT, HEIGHT / 2, HEIGHT / 3,]
            // max_r_options = [256, 175, 148,]
            cycle_options = [1, 10]
            mag_options = [3, 16]
        }
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
            "n": ibtw(minN, maxN) / nFactor,
            "cycles": ibtw(1, 15),
            // "max_r": HEIGHT / rFrom([64, 48, 32, 24]),
            // "max_r": h / rFrom(max_r_options),
            "min_r": h / 512,
            "y_variance_mag": fbtw(0, .5),//.5,
            "offset": new RadialSpinParm(0),
            // "offset": new RadialSpinParm(fbtw(PI / -16, PI / 16)),
            "mode": type,
            "angles": [random() * TWOPI],
            "ripple": new RadialSpinParm(fbtw(PI / -8, PI / 8)),
            "spinSpeeds": [fbtw(PI / -256, PI / 256), fbtw(PI / -256, PI / 256)],
            "mag": new OscParm(
                "Mag",
                row_height / fbtw(1, 3),
                fbtw(1, 1.3),
                ibtw(1, 5) * 120
            ),
            "endPoints": [
                0,
                (i + .5) * row_height + vary(HEIGHT, .3),
                WIDTH,
                (i + .5) * row_height + vary(HEIGHT, .3)
            ],
            // "mag": new OscParm(
            //     "magShift",
            //     row_height / ibtw(...mag_options),
            //     fbtw(.1, 2),
            //     ibtw(1, 5) * 75
            // ),
            "radius": new OscParm(
                "Radius",
                row_height * (i),
                (fbtw(.5, 1.5)),
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
                [0, 1],
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
