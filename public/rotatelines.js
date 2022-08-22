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
        let lastNumLines = 0
        for (let lineLayer of this.lineLayers) {

            lineLayer.drawLayer(this.gridBounds, this.linesToDraw)
            lastNumLines = this.linesToDraw.length
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
    constructor(color, angle, increment, angleIncrement, incrementVariance, angleApproachThresholdPct, angleBounds) {
        this.color = color,
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

        console.log("Rotating Line AngleBounds: " + this.angleBounds)
    }
    drawLayer(bounds, linesToDraw) {

        gridLinesSquare(...bounds, this.increment, this.angle, this.incrementVariance, this.color, linesToDraw)
    }
    incrementAngle() {
        // console.log("incrementAngle bounds: " + this.angleBounds)
        let angleStart = this.angle

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

function gridLinesSquare(start, end, increment, angle, incVar, clr, linesToDraw) {
    // stroke(randomColor())
    // 	//left to right, angled down 
    if (angle < PI / 2) {
        drawSquareOfLinesBottomRight(start, end, increment, angle, incVar, clr, linesToDraw)
    } else if (angle < PI) {
        drawSquareOfLinesBottomLeft(start, end, increment, angle, incVar, clr, linesToDraw)
    }
}

function drawSquareOfLinesBottomLeft(start, end, increment, angle, incVar, clr, linesToDraw) {
    // console.log("drawSquare of Linesbottom")
    // console.log("sTart: " + start)
    // console.log("end: " + end)
    let drawAngle = angle - PI / 2
    let xincrement = abs(increment / tan(angle))
    let xStart = end - floor((end - start) / xincrement) * xincrement
    for (let x = xStart; x < end; x += xincrement) {
        // for (let x = xStart; x < end; x += vary(xincrement, incVar)) {
        let angleToEndCorner = angleBetweenPoints(x, start, start, end)
        if (angleToEndCorner < angle) {
            linesToDraw.push([[x, start, start, ((x - start) / tan(drawAngle) + start)], clr, random()])
            // line(x, start, start, ((x-start)/tan(drawAngle)+start))
        } else {
            linesToDraw.push([[x, start, (end - start) / tan(angle) + x, end], clr, random()])
            // line(x, start, (end-start)/tan(angle)+x, end)
        }
    }
    // for (let y = start; y < end; y += vary(increment, incVar)) {
    for (let y = start; y < end; y += increment) {
        let angleToEndCorner = angleBetweenPoints(end, y, start, end)
        if (angleToEndCorner > angle) {
            //hit bottom edge
            linesToDraw.push([[end, y, end - tan(drawAngle) * (end - y), end], clr, random()])
            // line(end, y, end-tan(drawAngle)*(end-y), end)
            // line(start, y, end, (end-start)/tan(angle)+y)
        }
        else {
            //hit left edge
            linesToDraw.push([[end, y, start, (end - start) / tan(drawAngle) + y], clr, random()])
            // line(end, y, start, (end-start)/tan(drawAngle)+y)
        }
    }
}
function drawSquareOfLinesBottomRight(start, end, increment, angle, incVar, clr, linesToDraw) {
    let xincrement = abs(increment / tan(angle))
    let xStart = start + floor((end - start) / xincrement) * xincrement
    // if (xincrement <= 1) {
    //     console.log("angle: " + angle)
    //     console.log("xincrement: " + xincrement)
    //     console.log("increment: " + increment)
    //     console.log("tan(angle): " + tan(angle))
    // }
    // console.log("X Right to Left Bottom Right")
    // for (let x = xStart; x > start; x -= vary(xincrement, incVar)) {
    for (let x = xStart; x > start; x -= xincrement) {
        let angleToEndCorner = angleBetweenPoints(x, start, end, end)
        if (angleToEndCorner > angle) {
            // line(x, start, end, tan(angle)*(end-x)+start)
            linesToDraw.push([[x, start, end, tan(angle) * (end - x) + start], clr, random()])
        } else {
            // line(x, start, (end-start)/tan(angle)+x, end)
            linesToDraw.push([[x, start, (end - start) / tan(angle) + x, end], clr, random()])
        }
    }
    console.log("Y Top  to Bottom,  Bottom Right")
    for (let y = start; y < end; y += increment) {
        // for (let y = start; y < end; y += vary(increment, incVar)) {
        let angleToEndCorner = angleBetweenPoints(start, y, end, end)
        if (angleToEndCorner > angle) {
            linesToDraw.push([[start, y, end, tan(angle) * (end - start) + y], clr, random()])
            // line(start, y, end, tan(angle)*(end-start)+y)

        } else {
            linesToDraw.push([[start, y, (end - y) / tan(angle) + start, end], clr, random()])
            // line(start, y, (end-y)/tan(angle)+start,end)
        }
    }
}