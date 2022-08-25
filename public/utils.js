var TWOPI;
var HALFPI;
function initMask() {
    maskCanvas = createGraphics(DIM, DIM)
    maskCanvas.noStroke()
    maskCanvas.fill(255)
}
function applyMask(source, target) {
    let clone;
    (clone = source.get()).mask(target.get());
    image(clone, 0, 0);
}
function p(p) { return (xx() / 255.0) < p }
function rclr() {
    let idx = ibtw(0, clrs.length);

    if (idx >= clrs.length || idx < 0) return clrs[clrs.length - 1];
    return clrs[ibtw(0, clrs.length)]
}
function clr(c, a) {
    if (!c) return clr(clrs[0], a);
    return color(red(c), green(c), blue(c), a);
}
function xx() {
    var r = floor(fxrand() * 256)
    return r
}
function x() {
    var r = floor(fxrand() * 16);
    return r;
}
function ibtw(b, c) {
    let xxVar = xx();
    i = floor(b + (xxVar / 256.0) * abs(c - b))
    if (i >= c) return i;
    return i;
}
function fbtw(b, c) {
    f = (b + (xx() / 255.0) * abs(c - b)); return f;
}
function darken(c, n) {
    if (n == null) console.log("DARKEN PARM NOT SPECIFIED")
    return color(red(c) - n, green(c) - n, blue(c) - n)
}
function lighten(c, n) {
    if (n == null) console.log("LIGHTEN PARM NOT SPECIFIED")
    return color(red(c) + n, green(c) + n, blue(c) + n, alpha(c))
}
function lightenHsl(c, d) {
    return color(hue(c), saturation(c), lightness(c) + d, alpha(c))
}
function rotateHue(c, d) {
    while (d < 0) d += 360
    return color((hue(c) + d) % 360, saturation(c), lightness(c), alpha(c))
}
function hc(c) {
    return "#" + hex(red(c)).substring(6, 8) + hex(green(c)).substring(6, 8) + hex(blue(c)).substring(6, 8)
}
function vary(base_val, variance_pct) {
    // return base_val * random() * variance_pct - base_val * variance_pct / 2
    // return base_val * (random() * variance_pct - variance_pct / 2)
    return base_val * variance_pct * (random() - 1 / 2)
}
function shiftHSL(c, h, s, l) {
    new_hue = hue(c) + h
    while (new_hue < 0) new_hue += 360
    return color(new_hue % 360, saturation(c) + s, lightness(c) + l)
}
function randomIncrement(a) {
    let inc = minIncrement + random(a)
    return random() < .5 ? inc : 0 - inc
}
function angleBetweenPoints(x1, y1, x2, y2) {

    return (atan2(y2 - y1, x2 - x1) + 2 * PI) % (2 * PI);
}
function getAngleBetweenPoints(p1, p2) {
    return atan2(p2.y - p1.y, p2.x - p1.x);
}
function rFrom(list) {
    return list[ibtw(0, list.length)]
}
function randomShiftHSL(c, h, s, l) {

    return color(
        hue(c) + ibtw(0 - h, h),
        saturation(c) + ibtw(0 - s, s),
        lightness(c) + ibtw(0 - l, l)
    )

    // return new_color
}
function saturate(c, s) {
    return (color(hue(c), saturation(c) + s, lightness(c), alpha(c)))
}
function wA(c, a) {
    // console.log("alpga: " + a)
    // let newc = color(red(c), green(c), blue(c), a)
    c.setAlpha(a)
    // console.log("newc w alpha: " + c)
    return c
}
function getIntersectionOfTwoLines(l1, l2) {
    let x1 = l1.p1.x;
    let y1 = l1.p1.y;
    let x2 = l1.p2.x;
    let y2 = l1.p2.y;
    let x3 = l2.p1.x;
    let y3 = l2.p1.y;
    let x4 = l2.p2.x;
    let y4 = l2.p2.y;
    let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    let numeratorI = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
    let numeratorII = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);;
    return ({ x: numeratorI / denominator, y: numeratorII / denominator })
    // let denominator = (l1.p1.x-l1.p2.x)*(l2.p1.y-l2.p2.y) - (l1.p1.y-l1.p2.y)*(l2.p1.x-l2.p2.x)
    // let numeratorI = (l1.p1.x*l1.p2.y-l1.p1.y*l1.p2.x)*(l2.p1.x-l2.p2.x) - (l1.p1.x-l1.p2.x)*(l2.p1.x*l2.p2.y-l2.p1.y*l2.p2.x);
    // let numeratorII = (l1.p1.x*l1.p2.y-l1.p1.y*l1.p2.x)*(l2.p1.y-l2.p2.y) - (l1.p1.y-l1.p2.y)*(l2.p1.x*l2.p2.y-l2.p1.y*l2.p2.x);;
    // return({x:numeratorI/denominator, y:numeratorII/denominator})
}
function cube(c, x, y, r) {

    noStroke()
    fill(c)
    rect(x, y, r, r)
    // console.log(c)
    // let lightenc = lightenHsl(c, 20)
    // console.log("lightenc: " + lightenc)
    let d = r / 2
    fill(lightenHsl(c, 20))
    beginShape()
    vertex(x - r, y - r)
    vertex(x + r, y - r)
    vertex(x + r + cos(PI / 4) * d, y - r - sin(PI / 4) * d)
    vertex(x - r + cos(PI / 4) * d, y - r - sin(PI / 4) * d)
    endShape()

    fill(lightenHsl(c, -20))
    beginShape()
    vertex(x + r, y - r)
    vertex(x + r, y + r)
    vertex(x + r + cos(PI / 4) * d, y + r - sin(PI / 4) * d)
    vertex(x + r + cos(PI / 4) * d, y - r - sin(PI / 4) * d)
    endShape()

}
class RadialSpinParm {
    constructor(inc) {
        this.val = random() * 2 * PI
        this.inc = inc
    }
    increment() {
        this.val += this.inc
        if (this.val <= 0) {
            this.val += (Math.abs(this.val / (2 * PI)) + 1) * 2 * PI
        } else if (this.val > (2 * PI)) {
            this.val -= (2 * PI) * (Math.abs(this.val) / (2 * PI))
        }
    }
}
class OscParm {
    constructor(name, i, v, speed) {
        // console.log("Creating " + name + "OscParm")
        let otherBound = i * v
        // console.log("i, v, other: " + i + "," + v + "," + otherBound)
        this.lowerBound = Math.min(i, otherBound)
        this.upperBound = Math.max(i, otherBound)
        this.start = fbtw(this.lowerBound, this.upperBound)
        this.val = this.start
        this.speed = speed
        if (Math.abs(this.upperBound - this.lowerBound) < .001) {
            this.inc = 0
        } else {
            this.inc = Math.abs(this.upperBound - this.lowerBound) / speed
        }
        // this.print()
    }
    print() {
        console.log("OscParm:")
        console.log("   lowerBound: " + this.lowerBound)
        console.log("   upperBound: " + this.upperBound)
        console.log("   start: " + this.start)
        console.log("   val: " + this.val)
        console.log("   speed: " + this.speed)
        console.log("   inc: " + this.inc)
    }
    increment() {
        this.val += this.inc
        if (this.val <= this.lowerBound || this.val >= this.upperBound) this.inc *= -1
    }
}

function storePalette(palette) {
    var paletteJson = JSON.parse(palettes);
    paletteJson.add(palette)
    //read palette json
    //add palette to list
    //save pa;ette json
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function rotateAngle(angle, rotationRadians) {
    let newAngle = angle + rotationRadians
    if (newAngle < 0) {
        newAngle = newAngle + (Math.floor(Math.abs(newAngle / TWOPI)) + 1) * TWOPI
    } else {
        newAngle = newAngle % TWOPI
    }
    if (newAngle < 0 || newAngle > TWOPI) {
        console.log("new Angle calc didn't work: " + newAngle)
        console.log("old angle/radians: " + angle + "/" + rotationRadians)
    }
    return newAngle
}

function calcXYonCircle(vX, vY, radius, angle) {
    if (debug) {
        console.log("angle: " + angle)
        console.log("x/y: " + vX + "/" + vY)
        console.log("radius: " + radius)
    }
    return [vX + cos(angle) * radius, vY + sin(angle) * radius]
}