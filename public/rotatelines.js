class RotatingLineCanvas {
    constructor(gridBounds, lineLayers) {
        this.gridBounds = gridBounds
        this.lineLayers = lineLayers
    }
    addLineLayer(layer) {
        this.lineLayers.push(layer)
    }
    incrementLayers() {
        for (let lineLayer of this.lineLayers) {
            lineLayer.incrementAngle()
        }
    }
    drawAndIncrementAngles() {
        rectMode(CORNERS)
        this.linesToDraw = []
        // let lastNumLines = 0
        for (let lineLayer of this.lineLayers) {

            lineLayer.drawLayer(this.gridBounds, this.linesToDraw)
            // lastNumLines = this.linesToDraw.length
            lineLayer.incrementAngle()

        }
        this.linesToDraw = this.linesToDraw.sort((a, b) => {
            return a[2] - b[2]
        })
        for (let currLine of this.linesToDraw) {

            stroke(currLine[1])
            line(...currLine[0])
        }
    }
}
class RotatingLineLayer {
    constructor(color, color2, angle, increment, angleIncrement, incrementVariance, angleApproachThresholdPct, angleBounds) {
        this.color = color
        this.color2 = color2
        console.log("color init: " + JSON.stringify(this.color))
        console.log("color2 init: " + JSON.stringify(this.color2))
        this.angle = angle
        this.increment = increment
        this.angleIncrement = angleIncrement
        this.incrementVariance = incrementVariance
        this.angleApproachThresholdPct = angleApproachThresholdPct
        this.angleBounds = angleBounds
        this.angleIncrementBounds = [
            this.angleBounds[0] += this.angleApproachThresholdPct * PI / 2,
            this.angleBounds[1] -= this.angleApproachThresholdPct * PI / 2
        ]

    }
    drawLayer(bounds, linesToDraw) {

        gridLinesSquare(...bounds, this.increment, this.angle, this.incrementVariance, this.color, this.color2, linesToDraw)
    }
    incrementAngle() {
        // console.log("incrementAngle bounds: " + this.angleBounds)
        // let angleStart = this.angle

        // let startAngle = angles[i][n]
        let range = this.angleIncrementBounds[1] - this.angleIncrementBounds[0]
        this.angle += this.angleIncrement
        while (abs(this.angle - this.angleIncrementBounds[1]) < this.angleIncrement) {
            this.angle += this.angleIncrement
        }
        if (this.angle > this.angleIncrementBounds[1]) {
            this.angle -= range
            // angleIncrements[i][n] *= -1
        }
        if (this.angle <= this.angleIncrementBounds[0]) {
            this.angle += range
            // angleIncrements[i][n] *= -1
        }
        // console.log("Angle changed: " + angleStart + " to " + this.angle)
    }
}

function gridLinesSquare(start, end, increment, angle, incVar, clr, clr2, linesToDraw) {
    // stroke(randomColor())
    // 	//left to right, angled down 
    if (angle < PI / 2) {
        drawSquareOfLinesBottomRight(start, end, increment, angle, incVar, clr, clr2, linesToDraw)
    } else if (angle < PI) {
        drawSquareOfLinesBottomLeft(start, end, increment, angle, incVar, clr, clr2, linesToDraw)
    }
}

function drawSquareOfLinesBottomLeft(start, end, increment, angle, incVar, clr, clr2, linesToDraw) {
    let drawAngle = angle - PI / 2
    let xincrement = abs(increment / tan(angle))
    let xStart = end - floor((end - start) / xincrement) * xincrement
    let totalLines = (end - xStart) / xincrement + (end - start) / increment
    let lineCounter = 0
    for (let x = xStart; x < end; x += xincrement) {
        let angleToEndCorner = angleBetweenPoints(x, start, start, end)
        // clr.hsla = null
        // clr2.hsla = null
        let currClr = lerpColor(clr, clr2, lineCounter / totalLines)
        // console.log("---")
        // console.log("clr: " + JSON.stringify(clr))
        // console.log("clr2: " + JSON.stringify(clr2))
        // console.log("lerpedcolor: " + JSON.stringify(currClr))
        // currClr = clr

        // currClr.setAlpha(alpha(clr))
        // let lerpalpa = lerp(alpha(clr), alpha(clr2), lineCounter / totalLines)
        // console.log("lerpalpa: " + lerpalpa)
        // console.log("-----")
        // console.log("po(clr) " + clr.maxes["hsl"])
        // console.log("clr: " + clr)
        // console.log("clr2: " + clr2)
        // console.log("lerpClr: " + currClr)
        // console.log("lerpedcolor: " + currClr + "mode: " + clr._mode)
        if (angleToEndCorner < angle) {
            linesToDraw.push([[x, start, start, ((x - start) / tan(drawAngle) + start)], currClr, random()])
        } else {
            linesToDraw.push([[x, start, (end - start) / tan(angle) + x, end], currClr, random()])
        }
        lineCounter++;
    }
    for (let y = start; y < end; y += increment) {
        let angleToEndCorner = angleBetweenPoints(end, y, start, end)
        // clr.hsla = null
        // clr2.hsla = null
        let currClr = lerpColor(clr, clr2, lineCounter / totalLines)
        // console.log("---")
        // console.log("clr: " + JSON.stringify(clr))
        // console.log("clr2: " + JSON.stringify(clr2))
        // console.log("lerpedcolor: " + JSON.stringify(currClr))
        // currClr = clr
        if (angleToEndCorner > angle) {
            //hit bottom edge
            linesToDraw.push([[end, y, end - tan(drawAngle) * (end - y), end], currClr, random()])
        }
        else {
            //hit left edge
            linesToDraw.push([[end, y, start, (end - start) / tan(drawAngle) + y], currClr, random()])
        }
        lineCounter++;
    }
}
function drawSquareOfLinesBottomRight(start, end, increment, angle, incVar, clr, clr2, linesToDraw) {
    let xincrement = abs(increment / tan(angle))
    let xStart = start + floor((end - start) / xincrement) * xincrement
    let totalLines = (start - xStart) / xincrement + (end - start) / increment
    let lineCounter = 0
    // let currClr = lerpColor(clr, clr2, lineCounter / totalLines)
    // console.log("lerpedcolor: " + currClr)
    for (let x = xStart; x > start; x -= xincrement) {
        let angleToEndCorner = angleBetweenPoints(x, start, end, end)
        // clr.hsla = null
        // clr2.hsla = null
        let currClr = lerpColor(clr, clr2, lineCounter / totalLines)
        // console.log("---")
        // console.log("clr: " + JSON.stringify(clr))
        // console.log("clr2: " + JSON.stringify(clr2))
        // console.log("lerpedcolor: " + JSON.stringify(currClr))
        // currClr = clr
        if (angleToEndCorner > angle) {
            // line(x, start, end, tan(angle)*(end-x)+start)
            linesToDraw.push([[x, start, end, tan(angle) * (end - x) + start], currClr, random()])
        } else {
            // line(x, start, (end-start)/tan(angle)+x, end)
            linesToDraw.push([[x, start, (end - start) / tan(angle) + x, end], currClr, random()])
            lineCounter++
        }
    }
    for (let y = start; y < end; y += increment) {
        // for (let y = start; y < end; y += vary(increment, incVar)) {
        let angleToEndCorner = angleBetweenPoints(start, y, end, end)
        // clr.hsla = null
        // clr2.hsla = null
        let currClr = lerpColor(clr, clr2, lineCounter / totalLines)
        // console.log("---")
        // console.log("clr: " + JSON.stringify(clr))
        // console.log("clr2: " + JSON.stringify(clr2))
        // console.log("lerpedcolor: " + JSON.stringify(currClr))
        // currClr = clr
        if (angleToEndCorner > angle) {
            linesToDraw.push([[start, y, end, tan(angle) * (end - start) + y], currClr, random()])
            // line(start, y, end, tan(angle)*(end-start)+y)

        } else {
            linesToDraw.push([[start, y, (end - y) / tan(angle) + start, end], currClr, random()])
            // line(start, y, (end-y)/tan(angle)+start,end)
        }
        lineCounter++
    }
}