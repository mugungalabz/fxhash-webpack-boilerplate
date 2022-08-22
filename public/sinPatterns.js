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
        }
    }
    draw() {
        if (this.mode == "LINE") {
            noStroke()
            for (let i = 0; i < this.n; i++) {
                let d = random() * this.dist
                let xbase = this.endPoints[0] + cos(this.grade) * d
                let ybase = this.endPoints[1] + sin(this.grade) * d
                let curr_sin = sin((map(d % this.cycDist, 0, this.cycDist, 0, 2 * PI) + this.offset) % (2 * PI))
                let curr_y_variance = this.y_variance_mag * curr_sin
                if (curr_sin < 0) {
                    curr_y_variance *= (2 * (1 - curr_sin))
                }
                let y = ybase + curr_sin * this.mag + vary(this.mag, curr_y_variance)
                let curr_height = curr_sin * curr_sin * this.max_r
                if (curr_sin < 0) {
                    curr_height /= (4 * (1 - curr_sin))
                    y += curr_sin * this.mag * 1.5
                }
                glitchSquare(this.clr, xbase, y, curr_height + this.min_r)
            }
            this.offset = (this.offset - this.offsetSpeed + 2 * PI) % (2 * PI)
        } else if (this.mode == "RING") {
            noStroke()
            // let min_curr_sin = 1000
            // let max_curr_sin = -1000
            for (let i = 0; i < this.n; i++) {
                let d = random() * 2 * PI
                let cycPct = (d * 1) % this.cycAngle //pct through a cycle
                let curr_sin = cos(map(cycPct, 0, this.cycAngle, 0, 2 * PI))
                // if (curr_sin < min_curr_sin) min_curr_sin = curr_sin
                // if (curr_sin > max_curr_sin) max_curr_sin = curr_sin
                let a_x = this.v_x + cos(d) * this.radius
                let a_y = this.v_y + sin(d) * this.radius
                let b_x = a_x + this.mag * cos(d) //* curr_sin
                let b_y = a_y + this.mag * sin(d) //* curr_sin
                let curr_x = this.v_x + cos(d) * this.radius + this.mag * cos(d) * curr_sin
                let curr_y = this.v_y + sin(d) * this.radius + this.mag * sin(d) * curr_sin
                let curr_height = curr_sin * curr_sin * this.max_r
                // let curr_height = this.max_r
                // if (curr_sin < 0) {
                //     curr_height /= (4 * (1 - curr_sin))
                //     y += curr_sin * this.mag * 1.5
                // }
                // circle(a_x, a_y, 25)
                glitchSquare(this.clr, curr_x, curr_y, curr_height + this.min_r)
                // glitchSquare(this.clr, b_x, b_y, curr_height + this.min_r)
                // circle(curr_x, curr_y, 15)
            }
            // console.log("min_curr_sin: " + min_curr_sin)
            // console.log("max_curr_sin: " + max_curr_sin)
        }
    }
}

function glitchSquare(c, x, y, r) {
    let curr_c = randomShiftHSL(c, 10, 10, 10)
    pct_offset = .075
    altC1 = shiftHSL(curr_c, -30, 30, 30)
    altC2 = shiftHSL(curr_c, 30, 30, 30)
    // altCI = saturate(rotateHue(c, -100), 30)
    // altC2 = saturate(rotateHue(c, 100), 30)
    cube(altC1, x - r * pct_offset, y - r * pct_offset, r)
    cube(altC2, x + r * pct_offset, y + r * pct_offset, r)
    cube(curr_c, x, y, r)
}
function createSinSquareRings() {
    sinSquares = []
    let row_height = HEIGHT / colors.length
    // for (let i = 0; i < colors.length; i++) {
    for (let i = 0; i < 1; i++) {
        currParms = {
            "clr": colors[i],
            "n": ibtw(50, 500),
            "mag": row_height / ibtw(1, 3),
            "cycles": ibtw(1, 4),
            // "cycles": 4,
            "max_r": HEIGHT / rFrom([64, 48, 32, 24]),
            "min_r": HEIGHT / 512,
            "y_variance_mag": .5,
            "offset": random() * 2 * PI,
            "offsetSpeed": fbtw(PI / -8, PI / 8),
            "mode": "RING",
            "radius": HEIGHT / 3,
            "v_x": DIM / 2,
            "v_y": DIM / 2
        }
        sinSquares.push(new SinSquare(currParms))
    }
    return sinSquares
}
function createSinSquareLines() {
    sinSquares = []
    let row_height = HEIGHT / colors.length
    for (let i = 0; i < colors.length; i++) {
        currParms = {
            "clr": colors[i],
            "n": ibtw(50, 500),
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
            ]
        }
        sinSquares.push(new SinSquare(currParms))
    }
    return sinSquares
}