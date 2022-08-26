// these are the variables you can use as inputs to your algorithms
// console.log("HASH", fxhash)   // the 64 chars hex number fed to your algorithm
// con.sole.log("RAND", fxrand()) // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function. 
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }
var debug = false
var globalCounter = 0
var maxSquares = 2000
var maxN = 500;
var minN = 50;
var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var DIM = Math.min(WIDTH, HEIGHT)
var palette; var clrs;
// var hashIdx = 1; var maxHashIdx; var minHashIdx =2;
var maskCanvas;
const minTriangleHeight = 1;
var horizonY;
var palettes; var paletteInx;
var clrs; var numOrbitals;
const orbitalOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var startAngleOptions;
var hanging = false;
var minIncrement;
var colors;
var NUM_COLORS;
var reDraw
var paused
var counter
var refreshCount = 10
var angleApproachThresholdPct = .08
var numCanvas = 1
var sinSquares; var rotatingCanvases
var totalSinSquares = 0

// noprotect
function setup() {
	// palettes = get_palettes()
	console.log("........")
	console.log("HELLO SETUP + H/W: " + HEIGHT + "/" + WIDTH)
	console.log("........")
	TWOPI = 2 * PI
	HALFPI = PI / 2
	palette = get_palette()
	glitch_palettes = [
		{
			name: "Island",
			startHue: Math.random() * 360,
			n: 30,
			degrees: 3,

		}
	]
	createCanvas(DIM, DIM);
	//   background(200);
	// let palette = glitch_palettes[0];
	// console.log("palette" + palette)

	console.log("palette", palette)
	colorMode(HSL)
	NUM_COLORS = 5

	colors = getGlitchColorHSL(NUM_COLORS, "ANALOGOUS", { degree: 80 })
	colors = shuffle(palette["colors"])
	for (let i = 0; i < colors.length; i++) {
		colors[i] = color(colors[i])
	}
	console.log("Num Colors: " + colors.length)
	// colors = getGlitchColorHSL(NUM_COLORS, "SPLIT_COMPLIMENTARY", { degree: 80 })
	background(13)
	// colors = getGlitchColorHSL(palette.n, "ANALOGOUS", { degree: palette.degrees, seedColor: [palette.startHue, 80 + int(random() * 20), 50] })
	// clrs = palettes[paletteInx]["colors"]
	// bgColor = rclr();
	minIncrement = PI / 180

	reDraw = true; paused = false;
	// background(colors[ibtw(0, colors.length)])
	let aveN = maxSquares / (colors.length)
	minN = Math.min(aveN, minN)
	maxN = Math.min(aveN, maxN)
	sinSquares = []
	// sinSquares = sinSquares.concat(createSinSquareSpins("MEDIUM"))
	sinSquares = sinSquares.concat(createSinSquareSpins("SMALL"))
	// sinSquares = sinSquares.concat(createSinSquareLines())
	// sinSquares = sinSquares.concat(createSinSquareRings())
	// sinSquares = shuffle(sinSquares)
	console.log("total sinSquarePAtterns: " + sinSquares.length)
	console.log("total squares: " + totalSinSquares)
	rotatingCanvases = []
	for (let i = 0; i < numCanvas; i++) {
		let width = HEIGHT / numCanvas / 2
		let lowerBound = i * (width)
		let upperBound = HEIGHT - lowerBound
		// fill(colors[i][0])
		rotatingCanvases.push(new RotatingLineCanvas([lowerBound, upperBound], [
			new RotatingLineLayer(wA(rFrom(colors), 15), random(PI / 2), random(HEIGHT / 100, HEIGHT / 20), randomIncrement(PI / 40), random(0, 1), angleApproachThresholdPct, [0, PI / 2]),
			new RotatingLineLayer(wA(rFrom(colors), 15), random(PI / 2) + PI / 2, random(HEIGHT / 100, HEIGHT / 20), randomIncrement(PI / 40), random(0, 1), angleApproachThresholdPct, [PI / 2, PI])
		]))
	}
	window.$fxhashFeatures = {
		// "Palette": palettes[paletteInx]["name"],
		// "Mode": hanging ? "Suspended" : "Floating",
		// "Space Mode": spaceMode ? "Space" : "Sky",
		// "Orbital Pattern": orbitalsPattern,
		// "Recusion Depth": int(recursionDepth),
		// "Radial Symmetry": radialSymmetry ? "Yes" : "No",
		// "Recursion Order": FILO ? "FILO" : "FIFO"
	}
}

function keyPressed() {
	if (keyCode == 83) { //s
		saveCanvas(fxhash, 'png');
	} else if (keyCode == 80) { //p
		storePalette(palette)
	} else if (keyCode == 78) {//n
		noLoop()
	} else if (keyCode == 68) { //d
		debug = !debug
	}
}
function draw() {

	if (reDraw) {
		// squares()
		strokeWeight(1)
		noFill()
		for (let rotatingCanvas of rotatingCanvases) {
			rotatingCanvas.drawAndIncrementAngles()
		}
		reDraw = false;
		counter = refreshCount
	} else {
		counter--
		if (counter <= 0) reDraw = true
	}
	rectMode(RADIUS)
	// sinSquares = shuffle(sinSquares)
	for (sinSquare of sinSquares) {
		sinSquare.draw()
	}
	globalCounter++
	// if (globalCounter > 20) {
	// 	noLoop()
	// }

	// fxpreview(); TODO add logic for the preview
	// noLoop();
}


function lineMist(c, sw) {
	let x = random() * DIM * (1 / 2);// + DIM/4;
	let y = random() * DIM / 2 + DIM / 4;
	let len = random() * DIM;
	let lines = int(random() * 10 + 300);
	let n = 50;
	currSw = sw * random()
	currSwMultipler = .95 + random() * .1
	strokeWeight(currSw);
	c[3] = .2 + random() * .8
	stroke(c);
	let y1 = y
	let y2 = y
	let lCounter = 0;
	let rev = random() < .5;
	let lMultiplier = random() * .03 + .96
	let alphaMultiplier = random() * 3 + 1
	while (lCounter < lines) {
		line(x, y1, x + len, y1);
		if (lCounter > 0) line(x, y2, x + len, y2);
		// break;
		strokeWeight(random() * 4)
		y1 -= currSw;
		y2 += currSw;
		currSw *= currSwMultipler
		lCounter++;
		// c[3] = map(1-lCounter/lines, 0, 1, 0, 255);
		c[3] = Math.pow(lCounter / lines, alphaMultiplier)
		// console.log("color" + c)
		stroke(c)
		// x += random()*len*2-len/2
		x += random() * len / 20 - random() * len / (20 + random() * 20)
		len = (len * lMultiplier) + random() * .04
	}
	if (random() < .05) {
		c[3] = .05 + random() * .5
		stroke(c)
		line(x + len / 2, y1, x + len / 2, y2)
	}

}

function getMask(DIM) {
	var mask = createGraphics(DIM, DIM);
	mask.noStroke();
	mask.fill(255);
	return mask;
}
function ringGradient() {
	var gradientCanvas = createGraphics(DIM, DIM);
	const numRings = clrs.length * ibtw(1, 4);
	// console.log("numRings", numRings)
	var vertex = [ibtw(0, DIM), ibtw(0, DIM)];
	// console.log("gradient vertex", vertex)
	let startRadius = DIM * 2.75;
	// console.log("startRadius", startRadius)
	let ringWidth = floor(DIM / numRings) * ibtw(1, 6);
	ringWidth = min(DIM / 3, ringWidth);
	// console.log("ringWidth", ringWidth)
	let currRadius = startRadius;
	gradientCanvas.noStroke();
	var i = 0;
	// for (let i = 0; i < numRings; i++) {
	while (currRadius > 0) {
		c1 = clrs[i % clrs.length];
		c2 = clrs[(i + 1) % clrs.length];
		let gradStartRadius = currRadius
		for (let r = 0; r < ringWidth; r++) {
			let diff = r / ringWidth;
			// console.log("diff", diff)
			currRadius = gradStartRadius - r;
			if (currRadius < 0) break;

			let c = lerpColor(c1, c2, diff);
			gradientCanvas.fill(c);
			gradientCanvas.circle(vertex[0], vertex[1], currRadius, currRadius);
			// fill(c);
			// circle(vertex[0], vertex[1], currRadius);
			// console.log("currRaduis", currRadius)
		}
		i++;

	}

	return gradientCanvas;
}


function biGradientCircle(x, y, startRadius, c1, c2, c3) {
	noStroke()
	let radius = startRadius;
	while (radius-- >= 0) {
		let diffa = (radius * 1.0) / (startRadius * 1.0);
		let c = lerpColor(c1, c2, diffa * diffa);
		fill(c);
		circle(x, y, radius);
	}
}
function fullGradientCircle(x, y) {

	let cnv = createGraphics(DIM, DIM)
	cnv.noStroke()
	var maxRadius = int(dist(x, y, x < DIM - x ? DIM : 0, y < DIM - y ? DIM : y)) + 5
	var bandCount = ibtw(1 * clrs.length, 3 * clrs.length + 1)
	var bandWidth = int((maxRadius + 5) / bandCount)
	let r = maxRadius;
	let cidx = 0;
	let c1 = clrs[cidx]
	let c2 = clrs[(cidx + 1) % clrs.length]
	console.log("c1:" + c1 + "c2" + c2)
	while (r >= 100) {
		bTally = 0;
		while (bTally <= bandWidth) {
			let diff = bTally / bandWidth
			let c = lerpColor(c1, c2, diff);
			cnv.fill(c)
			cnv.circle(x, y, r)
			bTally++;
			r--;
		}
		cidx = (cidx + 1) % clrs.length
		c1 = clrs[cidx]
		c2 = clrs[(cidx + 1) % clrs.length]
	}
	image(cnv, 0, 0)

}

function triGradientCircle(x, y, startRadius, c1, c2, c3) {
	noStroke()
	let radius = startRadius;
	while (radius >= 0) {
		let diffa = (radius * 1.0) / (startRadius * 1.0);
		let c0 = lerpColor(c1, c2, diffa * diffa);
		let diffb = (radius * 1.0) / (startRadius * 1.0);
		let c = lerpColor(c0, c3, diffb);
		fill(c);
		circle(x, y, radius);
		radius--;
	}
}

function singleSplitGradient(ymin, ymax, wmin, wmax) {
	let c1 = rclr();
	let c2 = rclr();
	let startY = ibtw(DIM * ymin, DIM * ymax);
	let currY = startY;
	let totalH = ibtw(DIM * wmin, DIM * wmax)
	barGradient(color(0, 0, 0), c1, totalH / 3, currY);
	currY += totalH / 3;
	barGradient(c1, c2, totalH / 3, int(currY));
	currY += totalH / 3;
	barGradient(c2, color(0, 0, 0), totalH / 3, int(currY));
}

function doubleSplitGradient(ymin, ymax, wmin, wmax) {
	let c1 = rclr();
	let c2 = rclr();
	let c3 = rclr();
	let startY = ibtw(DIM * ymin, DIM * ymax);
	let currY = startY;
	let totalH = ibtw(DIM * wmin, DIM * wmax)
	barGradient(color(0, 0, 0), c1, totalH / 4, currY);
	currY += totalH / 4;
	barGradient(c1, c2, totalH / 4, int(currY));
	currY += totalH / 4;
	barGradient(c2, c3, totalH / 4, int(currY));
	currY += totalH / 4;
	barGradient(c3, color(0, 0, 0), totalH / 4, int(currY));
}

function getGlitchColorHSL(n, mode, options) {
	hslColors = [];
	colorMode(HSL)
	hslColors.push(options.seedColor ? options.seedColor : [random() * 360, 80 + int(random() * 20), 50])
	console.log("start hue:" + hslColors[0][0]);
	let degreeDiff;
	switch (mode) {
		case "ANALOGOUS":
			degreeDiff = options.degree ? options.degree : 360 / 12;
			// hslColors.push([random()*360,80+int(random()*20),50])
			for (let i = 0; i < n - 1; i++) {
				hslColors.push([(hslColors[i][0] + degreeDiff) % 360, hslColors[i][1], hslColors[i][2]])
			}
			break;
		case "SPLIT":
			degreeDiff = 360 / n;
			for (let i = 0; i < n - 1; i++) {
				hslColors.push([(hslColors[i][0] + degreeDiff) % 360, hslColors[i][1], hslColors[i][2]])
			}
			break;
		case "DIAD":
			hslColors.push([(hslColors[0][0] + 60) % 360, hslColors[0][1], hslColors[0][2]])
			break;
		case "COMPLIMENTARY":
			hslColors.push([(hslColors[0][0] + 180) % 360, hslColors[0][1], hslColors[0][2]])
			break;
		case "FETCH_COMPLIMENTARY":
			hslColors = [];
			degreeDiff = options.degree ? options.degree : 360 / 12;
			console.log("hue fulcrum: " + options.fulcrum)
			let fulcrum = (options.fulcrum + 180) % 360
			let hueStart = (fulcrum + degreeDiff * (n - 1) / 2) % (360);
			for (let i = 0; i < n; i++) {
				hslColors.push([hueStart, 100, 50]);
				hueStart += degreeDiff;
			}
			break;
		case "SPLIT_COMPLIMENTARY":
			hslColors.push([(hslColors[0][0] + 210) % 360, hslColors[0][1], hslColors[0][2]]);
			hslColors.push([(hslColors[0][0] + 150) % 360, hslColors[0][1], hslColors[0][2]]);
			break;
		case "RANDOM":
		default:
			for (let i = 0; i < n - 1; i++) {
				hslColors.push(hslVals = [random() * 360, 80 + int(random() * 20), 50])
			}
			break;
	}
	// hslVals = [random()*360,80+int(random()*20),50]
	// hslVals[0] = int(random()*360);
	return hslColors;
}

function hairTriangle(vertex, angle, innerRadius, outerRadius, c) {
	console.log("Drawing hair triangle")
	noFill()
	strokeWeight(1)
	stroke(255)
	let innerCorners = [
		vertex.x + innerRadius * cos(angle),
		vertex.y + innerRadius * sin(angle),
		vertex.x + innerRadius * cos((angle + 2 * PI / 3) % (2 * PI)),
		vertex.y + innerRadius * sin((angle + 2 * PI / 3) % (2 * PI)),
		vertex.x + innerRadius * cos((angle + 4 * PI / 3) % (2 * PI)),
		vertex.y + innerRadius * sin((angle + 4 * PI / 3) % (2 * PI)),
	]
	let corners = [
		vertex.x + outerRadius * cos(angle),
		vertex.y + outerRadius * sin(angle),
		vertex.x + outerRadius * cos((angle + 2 * PI / 3) % (2 * PI)),
		vertex.y + outerRadius * sin((angle + 2 * PI / 3) % (2 * PI)),
		vertex.x + outerRadius * cos((angle + 4 * PI / 3) % (2 * PI)),
		vertex.y + outerRadius * sin((angle + 4 * PI / 3) % (2 * PI)),
	]

	hairlineThroughVertex(
		vertex,
		{ x: corners[2], y: corners[3] },
		{ x: corners[0], y: corners[1] },
		{ x: innerCorners[2], y: innerCorners[3] },
		{ x: innerCorners[0], y: innerCorners[1] },
		outerRadius,
		c
	)
	hairlineThroughVertex(
		vertex,
		{ x: corners[4], y: corners[5] },
		{ x: corners[0], y: corners[1] },
		{ x: innerCorners[4], y: innerCorners[5] },
		{ x: innerCorners[0], y: innerCorners[1] },
		outerRadius,
		c
	)
	// hairlineThroughVertex(
	// 	vertex, 
	// 	{x: corners[4], y: corners[5]},
	// 	{x: corners[2], y: corners[3]},
	// 	{x: innerCorners[4], y: innerCorners[5]},
	// 	{x: innerCorners[2], y: innerCorners[3]},
	// 	outerRadius,
	// 	c
	// )

}
function randomPointInCircle(vertex, r) {
	let radius = random() * r;
	let angle = random() * 2 * PI;
	return (
		{
			x: vertex.x + cos(angle) * radius,
			y: vertex.y + sin(angle) * radius
		}
	);
}

function hairlineThroughVertex(vertex, p1, p2, innerp1, innerp2, radii, c) {
	let distance = dist(p1.x, p1.y, p2.x, p2.y)
	// circle(p1.x, p1.y, 4)
	// circle(p2.x, p2.y, 4)
	let currDist = 0;
	let guidelineAngle = getAngleBetweenPoints({ x: p1.x, y: p1.y }, { x: p2.x, y: p2.y })
	console.log("guidelineAngle:", guidelineAngle)
	stroke(colors[2])
	let lCnt = 0;
	stroke(colors[Math.floor(random() * colors.length)][0], 20 + random(60), 20 + random(60), .35)
	strokeWeight(10)
	while (currDist < distance) {
		// console.log("corners[0]" + corners[0])
		stroke(colors[Math.floor(random() * colors.length)][0], 20 + random(60), 20 + random(60), .35)
		let currX = p1.x + currDist * cos(guidelineAngle)
		let currY = p1.y + currDist * sin(guidelineAngle)
		// circle(currX, currY, 5)
		// console.log("hairline: " + currX + "," + currY)
		let innerPoint = getIntersectionOfTwoLines(
			{
				p1: { x: innerp1.x, y: innerp1.y },
				p2: { x: innerp2.x, y: innerp2.y }
			},
			{
				p1: { x: vertex.x, y: vertex.y },
				p2: { x: currX, y: currY }
			});
		// console.log("curr: " + currX + "," + currY + " : " + "inner:" + innerPoint.x + "," + innerPoint.y);

		// line(currX, currY, innerPoint.x, innerPoint.y)
		lLine(
			{ x: currX, y: currY },
			innerPoint,
			35, [colors[Math.floor(random() * colors.length)][0], 20 + random(60), 20 + random(60), .35],
			// "STANDARD"
			// "BUNDLE_OF_THATCH",{}
			"RING",
			{
				density: .3,
				ringVariance: (0, 1)
			}
			// "GRAINY",
			// {
			// 	density : .05,
			// 	scatter: true
			// },
			// "SPIKEY",
			// {}
		);
		// line(currX, currY, vertex[0], vertex[1])
		currDist += 80;
		lCnt++;
		// if(lCnt > 20) break;
	}
}

function lLine(p1, p2, thickness, c, mode, options) {
	switch (mode) {
		case "STANDARD": standardLine(p1, p2, thickness, c, options);
			break;
		case "BUNDLE_OF_THATCH": thatchLine(p1, p2, thickness, c, options);
			break;
		case "RING": ringLine(p1, p2, thickness, c, options);
			break;
		case "GRAINY":
			options["dots"] = true;
			ringLine(p1, p2, thickness, c, options);
			break;
		case "SPIKEY":
			spikeyLine(p1, p2, thickness, c, options)
			break;
		default:
			console.log("MODE not handled for lLine: " + mode);
			break;
	}
}

function ringLine(p1, p2, thickness, c, options) {
	console.log("ringline options:", options)
	if (!options.density) {
		console.log("RINGLINE DEFAULT DENSITY")
		options["density"] = DEFAULT_DENSITY;
	}
	let angle = getAngleBetweenPoints(p1, p2);
	let d = dist(p1.x, p1.y, p2.x, p2.y);
	let area = d * thickness;
	let p = options.density * (options.dots ? area : d);
	// console.log("p,", p);
	if (options.fill) {
		fill(options.fill);
	} else {
		noFill();
	}
	if (options.dots) {
		noStroke();
		fill(c);
	}
	strokeWeight(1);
	stroke(c);
	fill([c[0], c[1], c[2], .04]);
	for (let i = 0; i < p; i++) {
		let b = options.scatter ? random() * thickness : 0;
		let m = random() * d;
		let v = {
			x: p1.x + cos(angle) * m + cos(angle + PI / 2) * b,
			y: p1.y + sin(angle) * m + sin(angle + PI / 2) * b,
		}
		let radius = options.ringVariance ? random(options.ringVariance[0], options.ringVariance[1]) * thickness : thickness;
		if (options.dots) radius = .2;
		circle(v.x, v.y, radius);
	}
}

function thatchLine(p1, p2, thickness, c, options) {
	for (let i = 0; i < thickness * 3; i++) {
		// r1 = randomPointInCircle(p1, sWeight);
		// r2 = randomPointInCircle(p2, sWeight);
		standardLine(
			randomPointInCircle(p1, thickness),
			randomPointInCircle(p2, thickness),
			1, c);
	}
}
function standardLine(p1, p2, thickness, c, options) {
	// console.log("standard line color:", c);
	strokeWeight(thickness);
	stroke(c);
	line(p1.x, p1.y, p2.x, p2.y);
}



