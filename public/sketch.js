// console.log("Hello Sketch")
// these are the variables you can use as inputs to your algorithms
// console.log("HASH", fxhash)   // the 64 chars hex number fed to your algorithm
// con.sole.log("RAND", fxrand()) // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function 
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
var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var DIM = Math.min(WIDTH, HEIGHT)
/* 
	                  ***Help***

*/	
var palettes; var palette; var clrs;
// var hashIdx = 1; var maxHashIdx; var minHashIdx =2;
var lightx; var lighty; var maskCanvas;
var lightRadiusBounds = []
const minTriangleHeight = 1;
var starPoints = [4, 5, 6, 7, 8, 9, 12, 13, 15, 16];
const	modeSplitters = [31, 29, 23, 17, 13, 11, 10, 9, 7, 6, 5]
const geoFills = [128, 64, 32, 16, 8, 4];
const starDim = 25;
var horizonY; var hasWindow;
const windowMargin = 11;
var skewRadialFill; var skewRadialOutline;
var lightSourceDepth;
var palettes;
// noprotect

// function draw() { }

function keyPressed() {
  if (keyCode == 83) {
    saveCanvas(fxhash, 'png');
  } 
}
function draw() {
    // console.log("draw")  
	  createCanvas(DIM, DIM);
	  background(0);
		// hashIdx = 1;
    // let chars = "abcdef1234567890";
    // hash = "0x";
    // while (hash.length < 64) hash = hash + chars.charAt(Math.floor(random(0, 16)));
    // console.log("Generated Seed:" + hash);
		// noiseSeed(xx())
	 // hash = "0xca3657fc18895a9741745dfc8e988aab63bef4ab478cb596be6a247f5b4d2b"
  // console.log("hash", hash)

  palettes = normie_palettes;
  let paletteTier = fxrand();
  console.log("paletteTier:", paletteTier);
  if (paletteTier <= 0.01) {
    palettes = ultra_rare_palettes;
    console.log("ultra rare")
  } else if (paletteTier <= 0.04) {
    palettes = super_rare_palettes;
    console.log("super_rare_palettes")
  } else if (paletteTier <= .14) {
    palettes = rare_palettes;
    console.log("rare_palettes")
  } else {
    palettes = normie_palettes;
    console.log("normie_palettes")
  }
  
  var paletteInx = ibtw(0, palettes.length)
		palette = palettes[paletteInx]
    horizonY = DIM * (2 / 3)
    clrs = palettes[paletteInx]["colors"]
		lightx = ibtw(DIM * 1/6.0, DIM * 5/6.0); lighty =ibtw(DIM * (1/6.0), DIM * (3/6.0));
	  lightRadiusBounds = [DIM/6, DIM/2.25]
		let hasSpaceRing = p(.9)
		let spaceRingVertex = [ibtw(0-DIM/2, DIM*(3/2)), ibtw(0-3*DIM, DIM*4)]
		skewRadialFill = p(.5);
		skewRadialOutline = p(.5);
	  lightSourceDepth = ibtw(1,4);
  let hasStars = p(.9);
  let hasAsteroids = p(.9);
		if(p(.3)) {skyBandGradient()}
    else if (p(.25)) { sparseBarGradient(); }
  window.$fxhashFeatures = {
    "Palette": palettes[paletteInx]["name"],
    "Stars": hasStars,
    "Asteroids" : hasAsteroids,
  }
  console.log(window.$fxhashFeatures)
  if (hasSpaceRing) spaceRings(p(.5), spaceRingVertex);
  // noLoop();
  // return;
	let biCircles = ibtw(0,3);
	for(let i = 0; i < biCircles; i++){
		triGradientCircle(ibtw(DIM * 1/8.0, DIM * 7/8.0), ibtw(DIM * (1/8.0), DIM * (7/8.0) ), ibtw(DIM/20, DIM/10), rclr(), rclr(), rclr())
	}
	biCircles = ibtw(0,20)
	for(let i = 0; i < biCircles; i++){
		triGradientCircle(ibtw(DIM * 1/8.0, DIM * 7/8.0), ibtw(DIM * (1/8.0), DIM * (7/8.0) ), ibtw(DIM/80, DIM/20), rclr(), rclr(), rclr())
	}
  if (hasStars) stars();
  if(hasAsteroids) asteroids();

  lightSource();
  noLoop();
}
function initMask(){
	maskCanvas = createGraphics(DIM, DIM)
	maskCanvas.noStroke()
	maskCanvas.fill(255)
}
function applyMask(source, target) {
  let clone;
  (clone = source.get()).mask(target.get());
  image(clone, 0, 0);
}
function p(p) {return (xx()/255.0) < p}
function rclr(){
	let idx = ibtw(0, clrs.length);
	
	if(idx >= clrs.length || idx <0) return clrs[clrs.length-1];
	// console.log("rclr idx:", idx)
	return clrs[ibtw(0, clrs.length)]
}
function clr(c, a) {
	if(!c) return clr(clrs[0],a);
	return color(red(c), green(c), blue(c), a);
}
// function incHash() {
//   console.log("incHash", hashIdx)
//   console.log("maxHashIdx", maxHashIdx)
//   hashIdx++; if (hashIdx > maxHashIdx) hashIdx = minHashIdx;
// }
function xx() {
  // console.log("xx() method");
              // incHash();
  // console.log("h:" + hashIdx);
  // console.log("hash substring: ", hash.substring(hashIdx, hashIdx + 2))
              // var r = unhex(hash.substring(hashIdx, hashIdx + 2));
  // console.log("unhexed xx r var: ", r);
  var r = floor(fxrand() * 256)            
  return r
}
function x() {
  // incHash();
  var r = floor(fxrand() * 16);
  return r;
  // return unhex(hash.substring(hashIdx, hashIdx + 1));
}
function ibtw(b, c) {
    // console.log("abs c-b ", abs(c - b));
    let xxVar = xx();
    // console.log("xx", xxVar)
		i = floor(b + (xxVar / 256.0) * abs(c - b))
	  if(i >= c) return i;
		// console.log("ibtw inparms: " + (xx()/255.0) + "," + b + "," + c)
		// console.log("i:" + i)
    return i;
}
function fbtw(b, c) {
		f = (b + (xx() / 255.0) * abs(c - b)); return f;
}
function darken(c, n){
	if(n == null) console.log("DARKEN PARM NOT SPECIFIED")
	return color(red(c)-n, green(c)-n, blue(c)-n)
}
function lighten(c, n){
	if(n == null) console.log("LIGHTEN PARM NOT SPECIFIED")
	return color(red(c)+n, green(c)+n, blue(c)+n)
}
function hc(c){
	return "#" + hex(red(c)).substring(6,8) + hex(green(c)).substring(6, 8) + hex(blue(c)).substring(6, 8)
}

function biGradientCircle(x, y, startRadius, c1, c2, c3) {
    // console.log("grandient Circle colors: " + c1 + "," + c2 + "," + c3)
		noStroke()
    let radius = startRadius;
    while (radius-- >= 0) {
        //println("drawcircle: " + radius);
        let diffa = (radius * 1.0)  / (startRadius * 1.0);
        let c = lerpColor(c1, c2, diffa * diffa);
			  // console.log(c)
        fill(c);
        circle(x, y, radius);
    }
}
function fullGradientCircle(x, y){
	
	let cnv = createGraphics(DIM, DIM)
	cnv.noStroke()
	var maxRadius = int(dist(x, y, x < DIM - x ? DIM : 0,y < DIM - y ? DIM : y)) + 5
	var bandCount = ibtw(1 * clrs.length, 3 * clrs.length + 1)
	var bandWidth = int((maxRadius + 5) / bandCount)
	let r = maxRadius;
	// console.log("MaxRadius: " + r + ", bandwidth:" + bandWidth + ", numBands" + bandCount + "center: " + x + "," + y)
	let cidx = 0; 
	let c1 = clrs[cidx]
	let c2 = clrs[(cidx+1)%clrs.length]
	console.log( "c1:" + c1 + "c2" + c2)
	while (r >= 100){
		bTally = 0;
		// console.log("New Band Loop @ " + r)
		while (bTally <= bandWidth){
				let diff = bTally/bandWidth
				// console.log("diff:" + diff + "c1:" + c1 + "c2" + c2)
				 let c = lerpColor(c1, c2, diff);
				// console.log("lerped color:" + c + "r:" + r)
			// console.log(c2)
				cnv.fill(c)
				cnv.circle(x, y, r)
			bTally++;
			r--;
		}
		cidx = (cidx+1)%clrs.length
		c1 = clrs[cidx]
		c2 = clrs[(cidx+1)%clrs.length]
	}
	//noise 
	if(p(.001)) {
		addNoise(cnv)
		maskCanvas.circle(x, y, maxRadius)
		applyMask(cnv, maskCanvas)
	} else {
		image(cnv,0,0)
	}
	
}
function lightRayGradientSkys(x,y){
	console.log("TODO")
}

function triGradientCircle(x, y, startRadius, c1, c2, c3) {
    // console.log("grandient Circle")
	// console.log("trigrandient Circle colors: " + c1 + "," + c2 + "," + c3)
		noStroke()
    let radius = startRadius;
    while (radius >= 0) {
        //println("drawcircle: " + radius);
        let diffa = (radius * 1.0)  / (startRadius * 1.0);
        let c0 = lerpColor(c1, c2, diffa*diffa);
        let diffb = (radius * 1.0) / (startRadius * 1.0);
        // let c = lerpColor(c0, c2, diffb);
				let c = lerpColor(c0, c3, diffb);
        fill(c);
        circle(x, y, radius);
        radius--;
    }
}
function skyBand() {
	noStroke();
	bandCount = ibtw(1, clrs.length)
	bandH = DIM/bandCount;
	for(var i = 0; i < bandCount; i++){
		fill(clrs[i]);
		rect(0,i*bandH -1,DIM, (i+1)*bandH + 1);
	}
}
function sparseBarGradient(){
	bandH = DIM/clrs.length/2;
	currY = 0;
	for(let i = 0; i < clrs.length; i++){
		barGradient(color(0,0,0), clrs[i], bandH, currY);
		currY += bandH;
		barGradient(clrs[i], color(0,0,0), bandH, currY);
		currY += bandH;
	}
}

function barGradient(c1, c2, bandH, yStart){
	
	for(let y = yStart; y < yStart+bandH; y++){
		let diff = min((y - yStart)/bandH, 1);
		let c = lerpColor(c1, c2, diff)
		stroke(c);
		line(0, y, DIM, y);
	}
}
function skyBandGradient() {
	strokeWeight(2);
	bandCount = ibtw(clrs.length, clrs.length*1.5)
	// bandCount = 3
	// console.log("bandCount:" + bandCount)
	bandH = floor(DIM/bandCount)+1;
	
	
	for(var i = 0; i < bandCount; i++){
		streakGradient(i, bandH, i*bandH)
	}
}
function streakGradient(i, bandH, yStart){
	for(var y = yStart; y <= yStart+bandH; y++){
		let diff = min((y - yStart)/bandH, 1);
		let i1 = i%clrs.length
		if(p(.05)){
			let c = lerpColor(clrs[i1], clrs[(i1+1)%clrs.length], diff)
			stroke(c);
		} else {
			let c = lerpColor(clrs[i1], color(0,0,0), diff)
			stroke(c);
		}
		
		line(0, y, DIM, y);
	} 
}
function stars(){

			var limit = x()*2
			// console.log("x():" +x())
			limit *=2
			points = starPoints[ibtw(0,starPoints.length)]
			for(var i = 10; i < 10 + limit; i++){
				radialShape(ibtw(DIM*(1/25), DIM*(24/25)), 
										ibtw(DIM*(1/25), DIM/2.0), 
										ibtw(DIM/70, DIM/20), 
										ibtw(DIM/70, DIM/20), 
										rclr(), rclr(), rclr(), 
										points
				);
			}
}
function lightSource(){
	let lc1, lc2, lc3
	if("light" in palette){
		lc1 = palette["light"][0];
		lc2 = (palette["light"].length > 1) ? palette["light"][1] : lc1;
		lc3 = (palette["light"].length > 2) ? palette["light"][2] : lc2;
	} else {
		lc1 = rclr(); lc2 = rclr(); lc3 = rclr()
	}
	lightRadius = ibtw(lightRadiusBounds[0], lightRadiusBounds[1])
	
	let base = (p(0.5) ? geoFills[ibtw(0, geoFills.length)]:modeSplitters[ibtw(0, modeSplitters.length)])
	let multiplier = ibtw(3, 80)
	let points =  multiplier*base
			radialShape(lightx, lighty, 
										lightRadius, 
										lightRadius, 
										lc2, lc1, lc3, 
										points
			);
			if(lightSourceDepth >= 2) {
				radialShape(lightx, lighty, 
										lightRadius * .5, 
										lightRadius * .5, 
										lc2, lc1, lc3, 
										points
				);
				if(lightSourceDepth >= 3){
					radialShape(lightx, lighty, 
						lightRadius * .15, 
						lightRadius * .15, 
						lc2, lc1, lc3, 
						points
				);
				}
			}
			
}
function asteroids(){
	noStroke()
	let yCenter = ibtw(DIM*0.00, DIM * 0.05);
	
	let total = ibtw(35, 60)
	let m = total;
	let yInc = ((DIM - yCenter)/total);
	let shadeDiff = 30
	while(m-- > 0) {
		let xCenter = ibtw(0, DIM)
		let h = p(0.85) ? abs(ibtw(4, DIM/80)) : ibtw(4, DIM/10)
		let angle = PI/(fbtw(2, 10))
		let w = h/tan(angle)
		let midx = p(0.5) ? xCenter - w/3.0 : xCenter + w/3.0;
		fill(lightx < xCenter ? clrs[m%clrs.length] : darken(clrs[m%clrs.length], shadeDiff));
		triangle(xCenter - w, yCenter, xCenter + w, yCenter, xCenter, yCenter + h)
		fill(lightx < xCenter ? lighten(clrs[m%clrs.length], shadeDiff) : clrs[m%clrs.length]);
		triangle(xCenter - w, yCenter, xCenter + w, yCenter, xCenter, yCenter - h)
		// console.log("drawing mid part of triangle")
		fill(lightx > xCenter ? clrs[m%clrs.length] : darken(clrs[m%clrs.length], shadeDiff));
		triangle(midx, yCenter, xCenter + w, yCenter, xCenter, yCenter + h)
		fill(lightx > xCenter ? lighten(clrs[m%clrs.length], shadeDiff) : clrs[m%clrs.length]);
		triangle(midx, yCenter, xCenter + w, yCenter, xCenter, yCenter - h)
		yCenter += yInc;
		// console.log(yCenter)
	}
}
function radialShape(x, y, h, w , c1, c2, c3, points){
	// console.log("radial Shape w points#:" + points)
	let startRadians = 0.5;
	let radialScalars = {"r": 1, 0:1}
	radialScalars = determineRadialScalars(points);
	lineScale = fbtw(0.33, 2)
	
	if(p(.95)){
		strokeWeight(1)
		stroke(clr(c1, 255))
		for(let i = 0; i < points; i++){
			let m = 2/points * i
			let radians = (startRadians + (2/points * i))
			if (radians >= 2) radians -= 2
			let currh = h;
			if(radialScalars[i % radialScalars["r"]] == 0) continue;
			currh = floor( currh * radialScalars[i % radialScalars["r"]])
			if(currh < minTriangleHeight) continue;
			circularLines(x, y, currh, radians * PI)
		}
	}
	//triangle fill
	let skipFill = true;
	noStroke()
	let trianglesToDraw = []
	fill(clr(c2, 100))
	if(p(.95)){
		skipFill = false;
		for(let i = 0; i < points; i++){
			let m = 2/points * i
			let radians = (startRadians + (2/points * i))
			if (radians >= 2) radians -= 2
			let currh = h;
			if(radialScalars[i % radialScalars["r"]] == 0) continue;
			currh = floor(currh * radialScalars[i % radialScalars["r"]])
			if(currh < minTriangleHeight) continue;
			trianglesToDraw.push([int(random(30,100)), [x,y,w,currh,radians*PI]])
			}
			let sortedArray = trianglesToDraw.sort(function(a, b) {
  			return b[0] - a[0];
			});
			for(let idx = 0; idx < sortedArray.length; idx++){
				let arr = sortedArray[idx][1]
				if(skewRadialFill) fill(clr(rclr(),sortedArray[idx][0]));
				if(arr[3] < minTriangleHeight) continue;
				rotateTriangle(arr[0], arr[1], arr[2], arr[3], arr[4]);
			}
		}
	
	// Triangle Outline
	if(skipFill || p(.70)){
		noFill()
		strokeWeight(1)
		stroke(clr(c3, 255))
		let outlinesToDraw = []
		for(let i = 0; i < points; i++){
			let m = 2/points * i
			let radians = (startRadians + (2/points * i))
			if (radians >= 2) radians -= 2
			let currh = floor(h* radialScalars[i % radialScalars["r"]])
			if(radialScalars[i % radialScalars["r"]] == 0) continue;
			if(currh == 0) continue;
			if(skewRadialOutline) stroke(clr(rclr(),255));
			outlinesToDraw.push([int(random(30,100)), [x,y,w,currh,radians*PI]])
		}
		let sortedArray = outlinesToDraw.sort(function(a, b) {
  		return b[0] - a[0];
		});
		for(let idx = 0; idx < sortedArray.length; idx++){
			let arr = sortedArray[idx][1]
			if(skewRadialOutline) stroke(clr(rclr(),sortedArray[idx][0]));
			if(arr[3] < minTriangleHeight) continue;
			rotateTriangle(arr[0], arr[1], arr[2], arr[3], arr[4])
		}
	}
}
function circularLines(x, y, l, r){
	line(x, y, (x + cos(r)*l*lineScale), (y - sin(r)*l* lineScale))
}
function rotateTriangle(x, y, b, l, r) {
	triangle (x - sin(r)* b/2, y-cos(r)*b/2, 
						x + sin(r)*b/2, y + cos(r)*b/2,
						x + cos(r)*l, y - sin(r)*l)
}
function determineRadialScalars(n){
	altParms = {0:1}
	if(p(0.1)) {
		altParms[1] = 1;altParms["r"] = 1; return altParms;
	}

	for(const num of geoFills) {
		if(n%num == 0 && n >= 3 * num && p(0.9)) {
			if(p(0.9)){
				return geoFill(num, 2, fbtw(0.85, 0.97), altParms)
			} else if(num == 4 || num == 8) {
				// console.log("mode splitter:" + num)
				return modeSplitterA(num, n)
		}
	}
	for(const num of modeSplitters){
		if (n % num ==0 && n >= 3 * num){
			// console.log("catch factor from list" + num)
			return modeSplitterA(num, n)
		}
	}
	if(n % 3 == 0 && n >= 9) {
		// console.log("catch factor 3")
		if(p(0.33) ){
			fillParms(3, 1, 1, fbtw(0.7, 0.9), altParms)
			return altParms
		} else {
			return modeSplitterA(3, n);
		}
	}
	if(n % 2 == 0) {
		if(p(0.9)){//1-2 alternating
			altParms['r'] = 2;
			altParms[1] = fbtw(0.6, 0.9);
			// console.log("Alternating:" + altParms[1])
			return altParms
		}
	} 
		if(p(0.75)){
			return rndParms(n, 1, 1, .8, 1, altParms, n)
		} else {
			return fillParms(n, 1, 1, 1, altParms)
		}
	
	return altParms
}
function modeSplitterA(n, points){
	 // console.log("modeSplitter:" + n + "points:" + points)
		if(p(.25)){
			return descParms(points/n, 1, fbtw(0.6,0.995), altParms, points)
		} else if (p(0.33)){
			return descParms(n, 1, fbtw(0.6,0.995), altParms, points)
		} else if(p(0.5)){
			return rndParms(points/n, 1, 1, 0.4, 0.995, altParms, points)
		} else {
			return rndParms(n, 1, 1, 0.4, 0.995, altParms, points)
		}
}
function biDescParms(n, inc, m, altParms, points) {
	// console.log("bidesc Parms:" + n + "inc:" + inc + "multiplier:" + m)
	altParms["r"] = n
	lastV = 1;
	let l = 0-inc; let r = inc;
	let kill = p(0.5)  && points/n >=4  ? ibtw(2, n/2) : n;
	// console.log("kill: "  + kill) 
	for(let i = 0; i < floor(n/2); i++) {
		while(l < 0) l += n; l %= n;
		while(r< 0) r +=n; r %= n;
		if(i == kill || lastV * DIM < minTriangleHeight) lastV = 0;
		lastV *= m
		altParms[l] = lastV
		altParms[r] = lastV
		l-=inc;r+=inc;
	}
		return altParms
}
function descParms(n, inc, m, altParms, points) {
	if(p(1/2)) return biDescParms(n, inc, m, altParms, points)
	altParms["r"] = n;
	lastV = 1;
	if(p(.5)) inc *= -1;
	// console.log("desc Parms:" + n + "inc:" + inc + "multiplier: " + m)
	while(inc < 0) inc += n;
	let s = inc
	let kill = p(0.5)  && points/n >=4 ? ibtw(2, n) : n;
	// console.log("kill:" + kill)
	for(var i = 1; i < n; i++){
		lastV *= m
		if( i == kill || lastV * DIM < minTriangleHeight) lastV = 0
		altParms[s] = lastV
		// console.log("s:" + s + " v:" + lastV)
		s = s + inc;
		while(s < 0) s += n;
		s %= n;
	}
	return altParms
}
function rndParms(n, s, inc, l, u, altParms, points) {
	// console.log("rndParms:" + n)
	altParms["r"] = n;
	let kill = p(0.5) && points/n >=4  ? ibtw(2, n) : n;
	// console.log("kill =" + kill)
	for(var i = s; i < n; i += inc){
		altParms[i] = random(l, u)
		if(i >= kill) altParms[i] = 0;
		// console.log('altparms' + i + "=" + altParms[i])
	}
	return altParms
}
function fillParms(n, s, inc, v, altParms){
	altParms["r"] = n;
	for(var i = s; i < n; i += inc){
		altParms[i] = v;
	}
	return altParms
}
function geoFill(n,f,m,altParms){
	// console.log("geofill : " + n + "multiplier:" + m)
		altParms['r'] = n;
		let currh = 1;
		let skip = n;
		while(skip >= f){
			fillParms(n, skip/f, skip, currh, altParms)
			currh *= m
			skip /= f;
		}
		return altParms
}
}
function spaceRings(flipBlack, vertex){
	
	noFill();
  let lastBlack = true;
	let [x, y] = vertex;
	let numBands = clrs.length
	let maxWidth = 1*(x < 0 ? DIM - x : max( x, DIM -x))
	let maxHeight = 1*(y < 0 ? DIM - y : max( y, DIM -y))
	let minWidth = (x < 0 ? 0 - x : max(0,x - DIM))
	let minHeight = (y < 0 ? 0 - y : y - DIM)
	let currBandWidth = int(((maxWidth-minWidth) /numBands) * fbtw(0.7, .9)) + 1;
	noStroke()
	let bandCounter = 0;
	let bandTally = 1;
	let currHeight = maxHeight
	let currWidth = maxWidth
	c1 = color(0,0,0)
	c2 = rclr()
	// console.log("ellipse gradient: " + x + "," + y + " maxWidth:" + maxWidth)
	ellipseMode(RADIUS)
	// console.log("currBandWidth:" + currBandWidth)
	while(currWidth > minWidth){
		let diff = (bandCounter)/currBandWidth
 		let c = lerpColor(c1, c2, diff);
		fill(c)
		ellipse(x, y, currWidth, currHeight)
		currWidth--;
		currHeight = int((currWidth/maxWidth)* maxHeight) 
		bandCounter++;
		if(bandCounter == currBandWidth){
			bandCounter = 0;
			c1 = c2;
			if(flipBlack){
				c2 = lastBlack ? rclr() : color(0,0,0);
			} else {
				c2 = bandTally == numBands ? color(0,0,0) : rclr();
			}
			lastBlack = !lastBlack;
			 
			currBandWidth = int(((currWidth-minWidth)/(numBands-bandTally)) * fbtw(0.7, .9))+1
			bandTally++
			// console.log("currBandWidth:" + currBandWidth)
		}
	}
}

function setup() {
  rare_palettes = [
    	{'name' : 'Ayahausca Onset', 'colors' : [color("#F4F172"),color("#BEB85A"),color("#89A754"),color("#7D904D"),color("#617E44"),color("#726D35"),color("#3E6E35"),color("#040402"),]},
		{'name' : 'Platinum', 'colors' : [color("#FFFCDF"),color("#F4E8BE"),color("#9A8F79"),color("#788C97"),color("#60626F"),color("#404040"),color("#212121"),]},
			{'name' : 'Noble Nebulae', 'colors' : [color("#DFB492"),color("#E5827E"),color("#B58694"),color("#B46C79"),color("#9C576B"),color("#76435D"),color("#276176"),color("#0B253D"),]},
	  {'name' : 'Summerwood', 'colors' : [color("#E2D894"),color("#E7D56F"),color("#A2833D"),color("#3D8669"),color("#3C7747"),color("#3F3C2D"),color("#1D281A"),color("#070202"),]},
    {'name' : 'Glacial Glow', 'colors' : [color("#D0FBF2"),color("#A0FBF3"),color("#8282A8"),color("#00D0CD"),color("#0697CC"),color("#077FA8"),]},
    {'name' : 'Karens Husbands Nightmare', 'colors' : [color("#F0EA91"),color("#A86EA3"),color("#965686"),color("#876355"),color("#78436E"),color("#505680"),color("#3D4260"),color("#612744"),color("#25253C"),]},
    {'name' : 'Ice Ball', 'colors' : [color("#BD6684"),color("#B4566D"),color("#B34556"),color("#943D42"),color("#374D86"),color("#2D3C70"),color("#2B3754"),color("#49303C"),color("#392B24")]},
    {'name' : 'Radiation Poisoning', 'colors' : [color("#DFD086"),color("#E3C476"),color("#B7AD73"),color("#B29961"),color("#7D6F38"),color("#555525"),color("#554619"),color("#444D1E"),color("#2C2908"),]},
	  {'name' : 'Spider Wedding', 'colors' : [color("#8E759C"),color("#7F7A9A"),color("#896392"),color("#7E6F8E"),color("#6F7C8F"),color("#795D85"),color("#815A77"),color("#636D77"),color("#5C617F"),color("#675877"),color("#6F536A"),color("#6A435E"),color("#4C5660"),color("#5A4065"),color("#545051"),color("#553D55"),color("#484757"),color("#4A2F40"),color("#3A2743"),],
	 'light' : [color("#000000"), color("#FFEAFF"), color("#FFFFFF")]},
	  ]
  super_rare_palettes = [
    {'name' : 'Glory Nebulae', 'colors' : [color("#C1BA9D"),color("#BB7575"),color("#816469"),color("#984454"),color("#3E6278"),color("#374A68"),color("#383254"),color("#280F36"),]},
	  {'name' : 'Easter', 'colors' : [color("#F6B9DA"),color("#EAB8E4"),color("#F5F29D"),color("#F4C3C8"),color("#F5CFB9"),color("#BBCBF4"),color("#DBAEEF"),color("#A7D9F4"),color("#F5DAA4"),color("#C8BCEF"),color("#D9F1A3"),color("#B0DFD6"),color("#B7EAB7"),color("#BFEFA4"),]},
    {'name' : 'Gollums Nightmare', 'colors' : [color("#786F49"),color("#645B30"),color("#3C4127"),color("#322F0B"),color("#122826"),color("#151A04"),]},
  
  ]
  ultra_rare_palettes = [
    {'name' : 'Heaven Song', 'colors' : [color("#E7D4B2"),color("#CA6673"),color("#9E6D87"),color("#796B98"),color("#39819F"),color("#2F556E"),color("#223D4B"),]},
		
  ]
  normie_palettes = [
    {'name' : 'Regal Song', 'colors' : [color("#B1C9D3"),color("#A0BCD2"),color("#B0A7BA"),color("#847499"),color("#435480"),color("#4B446E"),color("#594659"),]},
		{'name' : 'Voluptuous Galaxy', 'colors' : [color("#FFFCEC"),color("#FFF1CE"),color("#FFA3AA"),color("#FF8696"),color("#FF707E"),color("#FF458C"),color("#F70059"),color("#A80044"),color("#731D4D"),color("#6B001C"),color("#500D1F"),]},
	  {'name' : 'Prom Queen', 'colors' : [color("#D2A4B5"),color("#8196AF"),color("#B8425A"),color("#903E64"),color("#6A3C67"),color("#37356A")]},
	 	{'name' : 'Hawaii', 'colors' : [color("#E9E163"),color("#F4D939"),color("#F68058"),color("#E64093"),color("#C56291"),color("#EE8E2A"),color("#D64C5E"),color("#8C365E"),]},
    {'name' : 'Spring Bloom', 'colors' : [color("#EFE7E2"),color("#E8B7BD"),color("#D1CA4B"),color("#CE6E81"),color("#8BA84C"),color("#608743"),color("#3A3055"),color("#24211D"),]},
    {'name' : 'Human Casserole', 'colors' : [color("#E8DDE2"),color("#C4BACE"),color("#4B98B6"),color("#8C845C"),color("#457467"),color("#B8292E"),color("#492B68"),color("#180E1F"),]},
	  {'name' : 'Celestial Savannah', 'colors' : [color("#E1B658"),color("#F3A326"),color("#C6784A"),color("#E86C22"),color("#A15F3C"),color("#26838A"),color("#8A5C20"),color("#AB141B"),color("#7A2022"),color("#643F15"),color("#284549")]},
	  {'name' : 'Bachelorette Party', 'colors' : [color("#DEB8DC"),color("#B496CF"),color("#D269A9"),color("#AD53A3"),color("#3F94BF"),color("#E35627"),color("#2E339F"),color("#351A6D"),]},
    {'name' : 'Polar Reaches', 'colors' : [color("#8EAEC5"),color("#8296B7"),color("#6C7498"),color("#4A6A99"),color("#626381"),color("#465880"),color("#294462"),color("#353648"),color("#1B2445"),color("#0D182A"),color("#150C0D"),],
	 'light': [color("#A6C3E5"),color("#6288AD"),]},
		{'name' : 'Mad Hatter', 'colors' : [color("#C48461"),color("#999766"),color("#A69359"),color("#A99A45"),color("#B27759"),color("#8D8963"),color("#978555"),color("#9A8E44"),color("#A67D45"),color("#85795F"),color("#AD6A40"),color("#9A7E35"),color("#806D4D"),color("#A17423"),color("#6D6B5C"),color("#8A7232"),color("#916A25"),color("#7D5C3D"),color("#6C5C4C"),color("#82612B"),color("#6E552C"),color("#7B5419"),color("#8B5500"),color("#67481A"),color("#794B00"),color("#723600"),color("#5D2A00"),color("#2A2A2A"),]},
	 	{'name' : 'Vegas', 'colors' : [color("#ECDEEE"),color("#FF635B"),color("#E33C74"),color("#D50086"),color("#B20B93"),color("#7A2691"),color("#4633A3"),color("#082178"),color("#020F4B"),]},
    {'name' : 'Tango Nebulae', 'colors' : [color("#FEFDFD"),color("#FCF0EF"),color("#FDE5E7"),color("#FCD1D2"),color("#FBBEC1"),color("#F6B7B3"),color("#F8ACAE"),color("#82BEB5"),color("#89B8B0"),color("#F6787E"),color("#98A8A2"),color("#F46064"),color("#F15255"),color("#E2585C"),color("#F1464D"),color("#E5414C"),color("#D73E45"),color("#CC3D42"),color("#BB363C"),color("#A83136"),color("#942D2F"),color("#7C2527"),color("#702124"),color("#491517"),color("#391213"),color("#181214"),color("#1A0909"),color("#0B0304"),]},
    {'name' : 'Queen of Angels', 'colors' : [color("#DBD8F6"),color("#AAD9FB"),color("#BDA2C1"),color("#DB8DB1"),color("#CB7693"),color("#975868"),color("#7F5765"),color("#6C505B")]},
    {'name' : 'Yeti Taint', 'colors' : [color("#AED7F3"),color("#8AC2DF"),color("#6DB2D9"),color("#59ABD3"),color("#49A4CD"),color("#319BC5"),color("#038AB7"),color("#027CA9"),color("#015F86"),]},
    {'name' : 'Mirkwood Fungus', 'colors' : [color("#B0B87D"),color("#849680"),color("#6C8657"),color("#7F8918"),color("#506D51"),color("#5D751D"),color("#584139"),color("#304F16"),]},
    {'name' : 'Hellfire Galaxy', 'colors' : [color("#B75555"),color("#B03C3C"),color("#863835"),color("#653C39"),color("#652520"),color("#3D2016"),color("#0E0B08"),]},
     {'name' : 'Eastern Galaxy', 'colors' : [color("#FFFFFF"),color("#525464"),color("#6F4355"),color("#494E65"),color("#6F364B"),color("#513D4B"),color("#264558"),]},
    {'name' : 'Rainforest Galaxy', 'colors' : [color("#F3EDBF"),color("#CDD05E"),color("#53834F"),color("#734566"),color("#31687D"),color("#42432A"),color("#0A0A0C"),]},
       
  ]

}