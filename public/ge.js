/*
  GIFEncoder.js

  Authors
  Kevin Weiner (original Java version - kweiner@fmsware.com)
  Thibault Imbert (AS3 version - bytearray.org)
  Johan Nordberg (JS version - code@johan-nordberg.com)
  Eugene Ware (node.js streaming version - eugene@noblesmaurai.com)
*/


var noop = () => false

var defaultMaxListeners = 10

class EventEmitter {
    constructor() {
        this._events = this._events || {}
        this._maxListeners = this._maxListeners || defaultMaxListeners
    }

    setMaxListeners(n) {
        if (typeof n !== 'number' || n < 0)
            throw TypeError('n must be a positive number')
        this._maxListeners = n
    }

    emit(type) {
        var er, handler, len, args, i, listeners

        if (!this._events)
            this._events = {}

        // If there is no 'error' event listener then throw.
        if (type === 'error') {
            if (!this._events.error ||
                (typeof this._events.error === 'object' &&
                    !this._events.error.length)) {
                er = arguments[1]
                if (this.domain) {
                    if (!er) er = new TypeError('Uncaught, unspecified "error" event.')
                } else if (er instanceof Error) {
                    throw er // Unhandled 'error' event
                } else {
                    throw TypeError('Uncaught, unspecified "error" event.')
                }
                return false
            }
        }

        handler = this._events[type]

        if (typeof handler === 'undefined')
            return false

        if (typeof handler === 'function') {
            switch (arguments.length) {
                // fast cases
                case 1:
                    handler.call(this)
                    break
                case 2:
                    handler.call(this, arguments[1])
                    break
                case 3:
                    handler.call(this, arguments[1], arguments[2])
                    break
                // slower
                default:
                    len = arguments.length
                    args = new Array(len - 1)
                    for (i = 1; i < len; i++)
                        args[i - 1] = arguments[i]
                    handler.apply(this, args)
            }
        } else if (typeof handler === 'object') {
            len = arguments.length
            args = new Array(len - 1)
            for (i = 1; i < len; i++)
                args[i - 1] = arguments[i]

            listeners = handler.slice()
            len = listeners.length
            for (i = 0; i < len; i++)
                listeners[i].apply(this, args)
        }

        return true
    }

    addListener(type, listener) {
        var m

        if (typeof listener !== 'function')
            throw TypeError('listener must be a function')

        if (!this._events)
            this._events = {}

        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (this._events.newListener)
            this.emit('newListener', type, typeof listener.listener === 'function' ?
                listener.listener : listener)

        if (!this._events[type])
            // Optimize the case of one listener. Don't need the extra array object.
            this._events[type] = listener
        else if (typeof this._events[type] === 'object')
            // If we've already got an array, just append.
            this._events[type].push(listener)
        else
            // Adding the second element, need to change to array.
            this._events[type] = [this._events[type], listener]

        // Check for listener leak
        if (typeof this._events[type] === 'object' && !this._events[type].warned) {
            m = this._maxListeners
            if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true
                console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length)
                console.trace()
            }
        }

        return this
    }

    on(...args) {
        return this.addListener.apply(this, args)
    }

    once(type, listener) {
        if (typeof listener !== 'function')
            throw TypeError('listener must be a function')

        function g() {
            this.removeListener(type, g)
            listener.apply(this, arguments)
        }

        g.listener = listener
        this.on(type, g)

        return this
    }

    removeListener(type, listener) {
        var list, position, length, i

        if (typeof listener !== 'function')
            throw TypeError('listener must be a function')

        if (!this._events || !this._events[type])
            return this

        list = this._events[type]
        length = list.length
        position = -1

        if (list === listener ||
            (typeof list.listener === 'function' && list.listener === listener)) {
            this._events[type] = undefined
            if (this._events.removeListener)
                this.emit('removeListener', type, listener)

        } else if (typeof list === 'object') {
            for (i = length; i-- > 0;) {
                if (list[i] === listener ||
                    (list[i].listener && list[i].listener === listener)) {
                    position = i
                    break
                }
            }

            if (position < 0)
                return this

            if (list.length === 1) {
                list.length = 0
                this._events[type] = undefined
            } else {
                list.splice(position, 1)
            }

            if (this._events.removeListener)
                this.emit('removeListener', type, listener)
        }

        return this
    }

    removeAllListeners(type) {
        var key, listeners

        if (!this._events)
            return this

        // not listening for removeListener, no need to emit
        if (!this._events.removeListener) {
            if (arguments.length === 0)
                this._events = {}
            else if (this._events[type])
                this._events[type] = undefined
            return this
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            var keys = Object.keys(this._events)

            for (var i = 0; i < keys.length; i++) {
                var key = keys[i]
                if (key === 'removeListener') continue
                this.removeAllListeners(key)
            }
            this.removeAllListeners('removeListener')
            this._events = {}
            return this
        }

        listeners = this._events[type]

        if (typeof listeners === 'function') {
            this.removeListener(type, listeners)
        } else {
            // LIFO order
            while (listeners.length)
                this.removeListener(type, listeners[listeners.length - 1])
        }
        this._events[type] = undefined

        return this
    }

    listeners(type) {
        var ret
        if (!this._events || !this._events[type])
            ret = []
        else if (typeof this._events[type] === 'function')
            ret = [this._events[type]]
        else
            ret = this._events[type].slice()
        return ret
    }

    static listenerCount(emitter, type) {
        var ret
        if (!emitter._events || !emitter._events[type])
            ret = 0
        else if (typeof emitter._events[type] === 'function')
            ret = 1
        else
            ret = emitter._events[type].length
        return ret
    }

    static inherits(ctor) {
        ctor.super_ = superCtor
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        })
    }

    static extend(target) {
        return _extend(target, new EventEmitter(), EventEmitter.prototype)
    }
}

function _extend(target, ...objs) {
    for (var i = 0, l = objs.length; i < l; i++) {
        var keys = Object.getOwnPropertyNames(objs[i] || {})

        for (var key of keys) {
            target[key] = objs[i][key]
        }
    }

    return target
}

class _Promise {
    constructor(resolver = noop) {

        this._settled = false
        this._success = false
        this._args = []
        this._callbacks = []
        this._onReject = noop

        resolver(this.resolve.bind(this), this.reject.bind(this))
    }

    then(onResolve, onReject = noop) {
        var promise = new _Promise()

        this._onReject = onReject
        this._callbacks.push((...args) => {
            var ret = onResolve.apply(this, args)

            if (ret && typeof ret.then == 'function') {
                ret.then(promise.resolve.bind(promise),
                    promise.reject.bind(promise))
            }
        })

        if (this._settled) {
            if (this._success) {
                this.resolve.apply(this, this._args)
            } else {
                this.onReject.apply(this, this._args)
            }
        }

        return promise
    }

    catch(onReject) {
        this._onReject = onReject

        return this
    }

    resolve(...args) {
        for (var handler of this._callbacks) {
            handler.apply(this, args)
        }

        this._args = args
        this._settled = true
        this._success = true
    }

    reject(...args) {
        this._onReject.apply(this, args)

        this._args = args
        this._settled = true
    }
}

var nativePromise = ('undefined' !== typeof global ? global : window).Promise || null

function Promise(resolver) {
    var promise = null
    var resolve = noop
    var reject = noop
    resolver = resolver || noop

    if (nativePromise) {
        promise = new nativePromise((_1, _2) => {
            resolve = _1
            reject = _2

            resolver(_1, _2)
        })
        promise.resolve = (...args) => {
            resolve.apply(promise, args)
        }
        promise.reject = (...args) => {
            reject.apply(promise, args)
        }
    } else {
        promise = new _Promise(resolver)
    }

    return promise
}


function Emitter(obj) {
    if ('undefined' == typeof obj) {
        return new EventEmitter()
    }

    EventEmitter.extend(obj)
}
Emitter.EventEmitter = EventEmitter
Emitter.Promise = Promise

function Stream() {
    Emitter.call(this);
}
Stream.prototype = new Emitter();
// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

Stream.prototype.pipe = function (dest, options) {
    var source = this;

    function ondata(chunk) {
        if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
                source.pause();
            }
        }
    }

    source.on('data', ondata);

    function ondrain() {
        if (source.readable && source.resume) {
            source.resume();
        }
    }

    dest.on('drain', ondrain);

    // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.
    if (!dest._isStdio && (!options || options.end !== false)) {
        source.on('end', onend);
        source.on('close', onclose);
    }

    var didOnEnd = false;
    function onend() {
        if (didOnEnd) return;
        didOnEnd = true;

        dest.end();
    }


    function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;

        if (typeof dest.destroy === 'function') dest.destroy();
    }

    // don't leave dangling pipes when there are errors.
    function onerror(er) {
        cleanup();
        if (!this.hasListeners('error')) {
            throw er; // Unhandled stream error in pipe.
        }
    }

    source.on('error', onerror);
    dest.on('error', onerror);

    // remove all the event listeners that were added.
    function cleanup() {
        source.off('data', ondata);
        dest.off('drain', ondrain);

        source.off('end', onend);
        source.off('close', onclose);

        source.off('error', onerror);
        dest.off('error', onerror);

        source.off('end', cleanup);
        source.off('close', cleanup);

        dest.off('end', cleanup);
        dest.off('close', cleanup);
    }

    source.on('end', cleanup);
    source.on('close', cleanup);

    dest.on('end', cleanup);
    dest.on('close', cleanup);

    dest.emit('pipe', source);

    // Allow for unix-like usage: A.pipe(B).pipe(C)
    return dest;
}
// var NeuQuant = require('./TypedNeuQuant.js');
// var LZWEncoder = require('./LZWEncoder.js');

function ByteArray() {
    this.data = [];
}

ByteArray.prototype.getData = function () {
    return new Buffer.from(this.data);
};

ByteArray.prototype.writeByte = function (val) {
    this.data.push(val);
};

ByteArray.prototype.writeUTFBytes = function (string) {
    for (var l = string.length, i = 0; i < l; i++)
        this.writeByte(string.charCodeAt(i));
};

ByteArray.prototype.writeBytes = function (array, offset, length) {
    for (var l = length || array.length, i = offset || 0; i < l; i++)
        this.writeByte(array[i]);
};

function GIFEncoder(width, height) {
    // image size
    this.width = ~~width;
    this.height = ~~height;

    // transparent color if given
    this.transparent = null;

    // transparent index in color table
    this.transIndex = 0;

    // -1 = no repeat, 0 = forever. anything else is repeat count
    this.repeat = -1;

    // frame delay (hundredths)
    this.delay = 0;

    this.image = null; // current frame
    this.pixels = null; // BGR byte array from frame
    this.indexedPixels = null; // converted frame indexed to palette
    this.colorDepth = null; // number of bit planes
    this.colorTab = null; // RGB palette
    this.usedEntry = new Array(); // active palette entries
    this.palSize = 7; // color table size (bits-1)
    this.dispose = -1; // disposal code (-1 = use default)
    this.firstFrame = true;
    this.sample = 10; // default sample interval for quantizer

    this.started = false; // started encoding

    this.readStreams = [];

    this.out = new ByteArray();
}

GIFEncoder.prototype.createReadStream = function (rs) {
    if (!rs) {
        rs = new stream.Readable();
        rs._read = function () { };
    }
    this.readStreams.push(rs);
    return rs;
};

GIFEncoder.prototype.createWriteStream = function (options) {
    var self = this;
    if (options) {
        Object.keys(options).forEach(function (option) {
            var fn = 'set' + option[0].toUpperCase() + option.substr(1);
            if (~['setDelay', 'setFrameRate', 'setDispose', 'setRepeat',
                'setTransparent', 'setQuality'].indexOf(fn)) {
                self[fn].call(self, options[option]);
            }
        });
    }

    var ws = new stream.Duplex({ objectMode: true });
    ws._read = function () { };
    this.createReadStream(ws);

    var self = this;
    ws._write = function (data, enc, next) {
        if (!self.started) self.start();
        self.addFrame(data);
        next();
    };
    var end = ws.end;
    ws.end = function () {
        end.apply(ws, [].slice.call(arguments));
        self.finish();
    };
    return ws;
};

GIFEncoder.prototype.emit = function () {
    var self = this;
    if (this.readStreams.length === 0) return;
    if (this.out.data.length) {
        this.readStreams.forEach(function (rs) {
            rs.push(Buffer.from(self.out.data));
        });
        this.out.data = [];
    }
};

GIFEncoder.prototype.end = function () {
    if (this.readStreams.length === null) return;
    this.emit();
    this.readStreams.forEach(function (rs) {
        rs.push(null);
    });
    this.readStreams = [];
};

/*
  Sets the delay time between each frame, or changes it for subsequent frames
  (applies to the next frame added)
*/
GIFEncoder.prototype.setDelay = function (milliseconds) {
    this.delay = Math.round(milliseconds / 10);
};

/*
  Sets frame rate in frames per second.
*/
GIFEncoder.prototype.setFrameRate = function (fps) {
    this.delay = Math.round(100 / fps);
};

/*
  Sets the GIF frame disposal code for the last added frame and any
  subsequent frames.

  Default is 0 if no transparent color has been set, otherwise 2.
*/
GIFEncoder.prototype.setDispose = function (disposalCode) {
    if (disposalCode >= 0) this.dispose = disposalCode;
};

/*
  Sets the number of times the set of GIF frames should be played.

  -1 = play once
  0 = repeat indefinitely

  Default is -1

  Must be invoked before the first image is added
*/

GIFEncoder.prototype.setRepeat = function (repeat) {
    this.repeat = repeat;
};

/*
  Sets the transparent color for the last added frame and any subsequent
  frames. Since all colors are subject to modification in the quantization
  process, the color in the final palette for each frame closest to the given
  color becomes the transparent color for that frame. May be set to null to
  indicate no transparent color.
*/
GIFEncoder.prototype.setTransparent = function (color) {
    this.transparent = color;
};

/*
  Adds next GIF frame. The frame is not written immediately, but is
  actually deferred until the next frame is received so that timing
  data can be inserted.  Invoking finish() flushes all frames.
*/
GIFEncoder.prototype.addFrame = function (imageData) {
    // HTML Canvas 2D Context Passed In
    if (imageData && imageData.getImageData) {
        this.image = imageData.getImageData(0, 0, this.width, this.height).data;
    } else {
        this.image = imageData;
    }

    this.getImagePixels(); // convert to correct format if necessary
    this.analyzePixels(); // build color table & map pixels

    if (this.firstFrame) {
        this.writeLSD(); // logical screen descriptior
        this.writePalette(); // global color table
        if (this.repeat >= 0) {
            // use NS app extension to indicate reps
            this.writeNetscapeExt();
        }
    }

    this.writeGraphicCtrlExt(); // write graphic control extension
    this.writeImageDesc(); // image descriptor
    if (!this.firstFrame) this.writePalette(); // local color table
    this.writePixels(); // encode and write pixel data

    this.firstFrame = false;
    this.emit();
};

/*
  Adds final trailer to the GIF stream, if you don't call the finish method
  the GIF stream will not be valid.
*/
GIFEncoder.prototype.finish = function () {
    this.out.writeByte(0x3b); // gif trailer
    this.end();
};

/*
  Sets quality of color quantization (conversion of images to the maximum 256
  colors allowed by the GIF specification). Lower values (minimum = 1)
  produce better colors, but slow processing significantly. 10 is the
  default, and produces good color mapping at reasonable speeds. Values
  greater than 20 do not yield significant improvements in speed.
*/
GIFEncoder.prototype.setQuality = function (quality) {
    if (quality < 1) quality = 1;
    this.sample = quality;
};

/*
  Writes GIF file header
*/
GIFEncoder.prototype.start = function () {
    this.out.writeUTFBytes("GIF89a");
    this.started = true;
    this.emit();
};

/*
  Analyzes current frame colors and creates color map.
*/
GIFEncoder.prototype.analyzePixels = function () {
    var len = this.pixels.length;
    var nPix = len / 3;

    this.indexedPixels = new Uint8Array(nPix);

    var imgq = new NeuQuant(this.pixels, this.sample);
    imgq.buildColormap(); // create reduced palette
    this.colorTab = imgq.getColormap();

    // map image pixels to new palette
    var k = 0;
    for (var j = 0; j < nPix; j++) {
        var index = imgq.lookupRGB(
            this.pixels[k++] & 0xff,
            this.pixels[k++] & 0xff,
            this.pixels[k++] & 0xff
        );
        this.usedEntry[index] = true;
        this.indexedPixels[j] = index;
    }

    this.pixels = null;
    this.colorDepth = 8;
    this.palSize = 7;

    // get closest match to transparent color if specified
    if (this.transparent !== null) {
        this.transIndex = this.findClosest(this.transparent);

        // ensure that pixels with full transparency in the RGBA image are using the selected transparent color index in the indexed image.
        for (var pixelIndex = 0; pixelIndex < nPix; pixelIndex++) {
            if (this.image[pixelIndex * 4 + 3] == 0) {
                this.indexedPixels[pixelIndex] = this.transIndex;
            }
        }
    }
};

/*
  Returns index of palette color closest to c
*/
GIFEncoder.prototype.findClosest = function (c) {
    if (this.colorTab === null) return -1;

    var r = (c & 0xFF0000) >> 16;
    var g = (c & 0x00FF00) >> 8;
    var b = (c & 0x0000FF);
    var minpos = 0;
    var dmin = 256 * 256 * 256;
    var len = this.colorTab.length;

    for (var i = 0; i < len;) {
        var index = i / 3;
        var dr = r - (this.colorTab[i++] & 0xff);
        var dg = g - (this.colorTab[i++] & 0xff);
        var db = b - (this.colorTab[i++] & 0xff);
        var d = dr * dr + dg * dg + db * db;
        if (this.usedEntry[index] && (d < dmin)) {
            dmin = d;
            minpos = index;
        }
    }

    return minpos;
};

/*
  Extracts image pixels into byte array pixels
  (removes alphachannel from canvas imagedata)
*/
GIFEncoder.prototype.getImagePixels = function () {
    var w = this.width;
    var h = this.height;
    this.pixels = new Uint8Array(w * h * 3);

    var data = this.image;
    var count = 0;

    for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
            var b = (i * w * 4) + j * 4;
            this.pixels[count++] = data[b];
            this.pixels[count++] = data[b + 1];
            this.pixels[count++] = data[b + 2];
        }
    }
};

/*
  Writes Graphic Control Extension
*/
GIFEncoder.prototype.writeGraphicCtrlExt = function () {
    this.out.writeByte(0x21); // extension introducer
    this.out.writeByte(0xf9); // GCE label
    this.out.writeByte(4); // data block size

    var transp, disp;
    if (this.transparent === null) {
        transp = 0;
        disp = 0; // dispose = no action
    } else {
        transp = 1;
        disp = 2; // force clear if using transparent color
    }

    if (this.dispose >= 0) {
        disp = this.dispose & 7; // user override
    }
    disp <<= 2;

    // packed fields
    this.out.writeByte(
        0 | // 1:3 reserved
        disp | // 4:6 disposal
        0 | // 7 user input - 0 = none
        transp // 8 transparency flag
    );

    this.writeShort(this.delay); // delay x 1/100 sec
    this.out.writeByte(this.transIndex); // transparent color index
    this.out.writeByte(0); // block terminator
};

/*
  Writes Image Descriptor
*/
GIFEncoder.prototype.writeImageDesc = function () {
    this.out.writeByte(0x2c); // image separator
    this.writeShort(0); // image position x,y = 0,0
    this.writeShort(0);
    this.writeShort(this.width); // image size
    this.writeShort(this.height);

    // packed fields
    if (this.firstFrame) {
        // no LCT - GCT is used for first (or only) frame
        this.out.writeByte(0);
    } else {
        // specify normal LCT
        this.out.writeByte(
            0x80 | // 1 local color table 1=yes
            0 | // 2 interlace - 0=no
            0 | // 3 sorted - 0=no
            0 | // 4-5 reserved
            this.palSize // 6-8 size of color table
        );
    }
};

/*
  Writes Logical Screen Descriptor
*/
GIFEncoder.prototype.writeLSD = function () {
    // logical screen size
    this.writeShort(this.width);
    this.writeShort(this.height);

    // packed fields
    this.out.writeByte(
        0x80 | // 1 : global color table flag = 1 (gct used)
        0x70 | // 2-4 : color resolution = 7
        0x00 | // 5 : gct sort flag = 0
        this.palSize // 6-8 : gct size
    );

    this.out.writeByte(0); // background color index
    this.out.writeByte(0); // pixel aspect ratio - assume 1:1
};

/*
  Writes Netscape application extension to define repeat count.
*/
GIFEncoder.prototype.writeNetscapeExt = function () {
    this.out.writeByte(0x21); // extension introducer
    this.out.writeByte(0xff); // app extension label
    this.out.writeByte(11); // block size
    this.out.writeUTFBytes('NETSCAPE2.0'); // app id + auth code
    this.out.writeByte(3); // sub-block size
    this.out.writeByte(1); // loop sub-block id
    this.writeShort(this.repeat); // loop count (extra iterations, 0=repeat forever)
    this.out.writeByte(0); // block terminator
};

/*
  Writes color table
*/
GIFEncoder.prototype.writePalette = function () {
    this.out.writeBytes(this.colorTab);
    var n = (3 * 256) - this.colorTab.length;
    for (var i = 0; i < n; i++)
        this.out.writeByte(0);
};

GIFEncoder.prototype.writeShort = function (pValue) {
    this.out.writeByte(pValue & 0xFF);
    this.out.writeByte((pValue >> 8) & 0xFF);
};

/*
  Encodes and writes pixel data
*/
GIFEncoder.prototype.writePixels = function () {
    var enc = new LZWEncoder(this.width, this.height, this.indexedPixels, this.colorDepth);
    enc.encode(this.out);
};

/*
  LZWEncoder.js

  Authors
  Kevin Weiner (original Java version - kweiner@fmsware.com)
  Thibault Imbert (AS3 version - bytearray.org)
  Johan Nordberg (JS version - code@johan-nordberg.com)

  Acknowledgements
  GIFCOMPR.C - GIF Image compression routines
  Lempel-Ziv compression based on 'compress'. GIF modifications by
  David Rowley (mgardi@watdcsu.waterloo.edu)
  GIF Image compression - modified 'compress'
  Based on: compress.c - File compression ala IEEE Computer, June 1984.
  By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
  Jim McKie (decvax!mcvax!jim)
  Steve Davies (decvax!vax135!petsd!peora!srd)
  Ken Turkowski (decvax!decwrl!turtlevax!ken)
  James A. Woods (decvax!ihnp4!ames!jaw)
  Joe Orost (decvax!vax135!petsd!joe)
*/

var EOF = -1;
var BITS = 12;
var HSIZE = 5003; // 80% occupancy
var masks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
    0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
    0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];

function LZWEncoder(width, height, pixels, colorDepth) {
    var initCodeSize = Math.max(2, colorDepth);

    var accum = new Uint8Array(256);
    var htab = new Int32Array(HSIZE);
    var codetab = new Int32Array(HSIZE);

    var cur_accum, cur_bits = 0;
    var a_count;
    var free_ent = 0; // first unused entry
    var maxcode;

    // block compression parameters -- after all codes are used up,
    // and compression rate changes, start over.
    var clear_flg = false;

    // Algorithm: use open addressing double hashing (no chaining) on the
    // prefix code / next character combination. We do a variant of Knuth's
    // algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
    // secondary probe. Here, the modular division first probe is gives way
    // to a faster exclusive-or manipulation. Also do block compression with
    // an adaptive reset, whereby the code table is cleared when the compression
    // ratio decreases, but after the table fills. The variable-length output
    // codes are re-sized at this point, and a special CLEAR code is generated
    // for the decompressor. Late addition: construct the table according to
    // file size for noticeable speed improvement on small files. Please direct
    // questions about this implementation to ames!jaw.
    var g_init_bits, ClearCode, EOFCode;

    // Add a character to the end of the current packet, and if it is 254
    // characters, flush the packet to disk.
    function char_out(c, outs) {
        accum[a_count++] = c;
        if (a_count >= 254) flush_char(outs);
    }

    // Clear out the hash table
    // table clear for block compress
    function cl_block(outs) {
        cl_hash(HSIZE);
        free_ent = ClearCode + 2;
        clear_flg = true;
        output(ClearCode, outs);
    }

    // Reset code table
    function cl_hash(hsize) {
        for (var i = 0; i < hsize; ++i) htab[i] = -1;
    }

    function compress(init_bits, outs) {
        var fcode, c, i, ent, disp, hsize_reg, hshift;

        // Set up the globals: g_init_bits - initial number of bits
        g_init_bits = init_bits;

        // Set up the necessary values
        clear_flg = false;
        n_bits = g_init_bits;
        maxcode = MAXCODE(n_bits);

        ClearCode = 1 << (init_bits - 1);
        EOFCode = ClearCode + 1;
        free_ent = ClearCode + 2;

        a_count = 0; // clear packet

        ent = nextPixel();

        hshift = 0;
        for (fcode = HSIZE; fcode < 65536; fcode *= 2) ++hshift;
        hshift = 8 - hshift; // set hash code range bound
        hsize_reg = HSIZE;
        cl_hash(hsize_reg); // clear hash table

        output(ClearCode, outs);

        outer_loop: while ((c = nextPixel()) != EOF) {
            fcode = (c << BITS) + ent;
            i = (c << hshift) ^ ent; // xor hashing
            if (htab[i] === fcode) {
                ent = codetab[i];
                continue;
            } else if (htab[i] >= 0) { // non-empty slot
                disp = hsize_reg - i; // secondary hash (after G. Knott)
                if (i === 0) disp = 1;
                do {
                    if ((i -= disp) < 0) i += hsize_reg;
                    if (htab[i] === fcode) {
                        ent = codetab[i];
                        continue outer_loop;
                    }
                } while (htab[i] >= 0);
            }
            output(ent, outs);
            ent = c;
            if (free_ent < 1 << BITS) {
                codetab[i] = free_ent++; // code -> hashtable
                htab[i] = fcode;
            } else {
                cl_block(outs);
            }
        }

        // Put out the final code.
        output(ent, outs);
        output(EOFCode, outs);
    }

    function encode(outs) {
        outs.writeByte(initCodeSize); // write "initial code size" byte
        remaining = width * height; // reset navigation variables
        curPixel = 0;
        compress(initCodeSize + 1, outs); // compress and write the pixel data
        outs.writeByte(0); // write block terminator
    }

    // Flush the packet to disk, and reset the accumulator
    function flush_char(outs) {
        if (a_count > 0) {
            outs.writeByte(a_count);
            outs.writeBytes(accum, 0, a_count);
            a_count = 0;
        }
    }

    function MAXCODE(n_bits) {
        return (1 << n_bits) - 1;
    }

    // Return the next pixel from the image
    function nextPixel() {
        if (remaining === 0) return EOF;
        --remaining;
        var pix = pixels[curPixel++];
        return pix & 0xff;
    }

    function output(code, outs) {
        cur_accum &= masks[cur_bits];

        if (cur_bits > 0) cur_accum |= (code << cur_bits);
        else cur_accum = code;

        cur_bits += n_bits;

        while (cur_bits >= 8) {
            char_out((cur_accum & 0xff), outs);
            cur_accum >>= 8;
            cur_bits -= 8;
        }

        // If the next entry is going to be too big for the code size,
        // then increase it, if possible.
        if (free_ent > maxcode || clear_flg) {
            if (clear_flg) {
                maxcode = MAXCODE(n_bits = g_init_bits);
                clear_flg = false;
            } else {
                ++n_bits;
                if (n_bits == BITS) maxcode = 1 << BITS;
                else maxcode = MAXCODE(n_bits);
            }
        }

        if (code == EOFCode) {
            // At EOF, write the rest of the buffer.
            while (cur_bits > 0) {
                char_out((cur_accum & 0xff), outs);
                cur_accum >>= 8;
                cur_bits -= 8;
            }
            flush_char(outs);
        }
    }

    this.encode = encode;
}

/* NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994.
 * See "Kohonen neural networks for optimal colour quantization"
 * in "Network: Computation in Neural Systems" Vol. 5 (1994) pp 351-367.
 * for a discussion of the algorithm.
 * See also  http://members.ozemail.com.au/~dekker/NEUQUANT.HTML
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal
 * in this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons who receive
 * copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 *
 * (JavaScript port 2012 by Johan Nordberg)
 */

function toInt(v) {
    return ~~v;
}

var ncycles = 100; // number of learning cycles
var netsize = 256; // number of colors used
var maxnetpos = netsize - 1;

// defs for freq and bias
var netbiasshift = 4; // bias for colour values
var intbiasshift = 16; // bias for fractions
var intbias = (1 << intbiasshift);
var gammashift = 10;
var gamma = (1 << gammashift);
var betashift = 10;
var beta = (intbias >> betashift); /* beta = 1/1024 */
var betagamma = (intbias << (gammashift - betashift));

// defs for decreasing radius factor
var initrad = (netsize >> 3); // for 256 cols, radius starts
var radiusbiasshift = 6; // at 32.0 biased by 6 bits
var radiusbias = (1 << radiusbiasshift);
var initradius = (initrad * radiusbias); //and decreases by a
var radiusdec = 30; // factor of 1/30 each cycle

// defs for decreasing alpha factor
var alphabiasshift = 10; // alpha starts at 1.0
var initalpha = (1 << alphabiasshift);
var alphadec; // biased by 10 bits

/* radbias and alpharadbias used for radpower calculation */
var radbiasshift = 8;
var radbias = (1 << radbiasshift);
var alpharadbshift = (alphabiasshift + radbiasshift);
var alpharadbias = (1 << alpharadbshift);

// four primes near 500 - assume no image has a length so large that it is
// divisible by all four primes
var prime1 = 499;
var prime2 = 491;
var prime3 = 487;
var prime4 = 503;
var minpicturebytes = (3 * prime4);

/*
  Constructor: NeuQuant

  Arguments:

  pixels - array of pixels in RGB format
  samplefac - sampling factor 1 to 30 where lower is better quality

  >
  > pixels = [r, g, b, r, g, b, r, g, b, ..]
  >
*/
function NeuQuant(pixels, samplefac) {
    var network; // int[netsize][4]
    var netindex; // for network lookup - really 256

    // bias and freq arrays for learning
    var bias;
    var freq;
    var radpower;

    /*
      Private Method: init
  
      sets up arrays
    */
    function init() {
        network = [];
        netindex = [];
        bias = [];
        freq = [];
        radpower = [];

        var i, v;
        for (i = 0; i < netsize; i++) {
            v = (i << (netbiasshift + 8)) / netsize;
            network[i] = [v, v, v];
            freq[i] = intbias / netsize;
            bias[i] = 0;
        }
    }

    /*
      Private Method: unbiasnet
  
      unbiases network to give byte values 0..255 and record position i to prepare for sort
    */
    function unbiasnet() {
        for (var i = 0; i < netsize; i++) {
            network[i][0] >>= netbiasshift;
            network[i][1] >>= netbiasshift;
            network[i][2] >>= netbiasshift;
            network[i][3] = i; // record color number
        }
    }

    /*
      Private Method: altersingle
  
      moves neuron *i* towards biased (b,g,r) by factor *alpha*
    */
    function altersingle(alpha, i, b, g, r) {
        network[i][0] -= (alpha * (network[i][0] - b)) / initalpha;
        network[i][1] -= (alpha * (network[i][1] - g)) / initalpha;
        network[i][2] -= (alpha * (network[i][2] - r)) / initalpha;
    }

    /*
      Private Method: alterneigh
  
      moves neurons in *radius* around index *i* towards biased (b,g,r) by factor *alpha*
    */
    function alterneigh(radius, i, b, g, r) {
        var lo = Math.abs(i - radius);
        var hi = Math.min(i + radius, netsize);

        var j = i + 1;
        var k = i - 1;
        var m = 1;

        var p, a;
        while ((j < hi) || (k > lo)) {
            a = radpower[m++];

            if (j < hi) {
                p = network[j++];
                p[0] -= (a * (p[0] - b)) / alpharadbias;
                p[1] -= (a * (p[1] - g)) / alpharadbias;
                p[2] -= (a * (p[2] - r)) / alpharadbias;
            }

            if (k > lo) {
                p = network[k--];
                p[0] -= (a * (p[0] - b)) / alpharadbias;
                p[1] -= (a * (p[1] - g)) / alpharadbias;
                p[2] -= (a * (p[2] - r)) / alpharadbias;
            }
        }
    }

    /*
      Private Method: contest
  
      searches for biased BGR values
    */
    function contest(b, g, r) {
        /*
          finds closest neuron (min dist) and updates freq
          finds best neuron (min dist-bias) and returns position
          for frequently chosen neurons, freq[i] is high and bias[i] is negative
          bias[i] = gamma * ((1 / netsize) - freq[i])
        */

        var bestd = ~(1 << 31);
        var bestbiasd = bestd;
        var bestpos = -1;
        var bestbiaspos = bestpos;

        var i, n, dist, biasdist, betafreq;
        for (i = 0; i < netsize; i++) {
            n = network[i];

            dist = Math.abs(n[0] - b) + Math.abs(n[1] - g) + Math.abs(n[2] - r);
            if (dist < bestd) {
                bestd = dist;
                bestpos = i;
            }

            biasdist = dist - ((bias[i]) >> (intbiasshift - netbiasshift));
            if (biasdist < bestbiasd) {
                bestbiasd = biasdist;
                bestbiaspos = i;
            }

            betafreq = (freq[i] >> betashift);
            freq[i] -= betafreq;
            bias[i] += (betafreq << gammashift);
        }

        freq[bestpos] += beta;
        bias[bestpos] -= betagamma;

        return bestbiaspos;
    }

    /*
      Private Method: inxbuild
  
      sorts network and builds netindex[0..255]
    */
    function inxbuild() {
        var i, j, p, q, smallpos, smallval, previouscol = 0, startpos = 0;
        for (i = 0; i < netsize; i++) {
            p = network[i];
            smallpos = i;
            smallval = p[1]; // index on g
            // find smallest in i..netsize-1
            for (j = i + 1; j < netsize; j++) {
                q = network[j];
                if (q[1] < smallval) { // index on g
                    smallpos = j;
                    smallval = q[1]; // index on g
                }
            }
            q = network[smallpos];
            // swap p (i) and q (smallpos) entries
            if (i != smallpos) {
                j = q[0]; q[0] = p[0]; p[0] = j;
                j = q[1]; q[1] = p[1]; p[1] = j;
                j = q[2]; q[2] = p[2]; p[2] = j;
                j = q[3]; q[3] = p[3]; p[3] = j;
            }
            // smallval entry is now in position i

            if (smallval != previouscol) {
                netindex[previouscol] = (startpos + i) >> 1;
                for (j = previouscol + 1; j < smallval; j++)
                    netindex[j] = i;
                previouscol = smallval;
                startpos = i;
            }
        }
        netindex[previouscol] = (startpos + maxnetpos) >> 1;
        for (j = previouscol + 1; j < 256; j++)
            netindex[j] = maxnetpos; // really 256
    }

    /*
      Private Method: inxsearch
  
      searches for BGR values 0..255 and returns a color index
    */
    function inxsearch(b, g, r) {
        var a, p, dist;

        var bestd = 1000; // biggest possible dist is 256*3
        var best = -1;

        var i = netindex[g]; // index on g
        var j = i - 1; // start at netindex[g] and work outwards

        while ((i < netsize) || (j >= 0)) {
            if (i < netsize) {
                p = network[i];
                dist = p[1] - g; // inx key
                if (dist >= bestd) i = netsize; // stop iter
                else {
                    i++;
                    if (dist < 0) dist = -dist;
                    a = p[0] - b; if (a < 0) a = -a;
                    dist += a;
                    if (dist < bestd) {
                        a = p[2] - r; if (a < 0) a = -a;
                        dist += a;
                        if (dist < bestd) {
                            bestd = dist;
                            best = p[3];
                        }
                    }
                }
            }
            if (j >= 0) {
                p = network[j];
                dist = g - p[1]; // inx key - reverse dif
                if (dist >= bestd) j = -1; // stop iter
                else {
                    j--;
                    if (dist < 0) dist = -dist;
                    a = p[0] - b; if (a < 0) a = -a;
                    dist += a;
                    if (dist < bestd) {
                        a = p[2] - r; if (a < 0) a = -a;
                        dist += a;
                        if (dist < bestd) {
                            bestd = dist;
                            best = p[3];
                        }
                    }
                }
            }
        }

        return best;
    }

    /*
      Private Method: learn
  
      "Main Learning Loop"
    */
    function learn() {
        var i;

        var lengthcount = pixels.length;
        var alphadec = toInt(30 + ((samplefac - 1) / 3));
        var samplepixels = toInt(lengthcount / (3 * samplefac));
        var delta = toInt(samplepixels / ncycles);
        var alpha = initalpha;
        var radius = initradius;

        var rad = radius >> radiusbiasshift;

        if (rad <= 1) rad = 0;
        for (i = 0; i < rad; i++)
            radpower[i] = toInt(alpha * (((rad * rad - i * i) * radbias) / (rad * rad)));

        var step;
        if (lengthcount < minpicturebytes) {
            samplefac = 1;
            step = 3;
        } else if ((lengthcount % prime1) !== 0) {
            step = 3 * prime1;
        } else if ((lengthcount % prime2) !== 0) {
            step = 3 * prime2;
        } else if ((lengthcount % prime3) !== 0) {
            step = 3 * prime3;
        } else {
            step = 3 * prime4;
        }

        var b, g, r, j;
        var pix = 0; // current pixel

        i = 0;
        while (i < samplepixels) {
            b = (pixels[pix] & 0xff) << netbiasshift;
            g = (pixels[pix + 1] & 0xff) << netbiasshift;
            r = (pixels[pix + 2] & 0xff) << netbiasshift;

            j = contest(b, g, r);

            altersingle(alpha, j, b, g, r);
            if (rad !== 0) alterneigh(rad, j, b, g, r); // alter neighbours

            pix += step;
            if (pix >= lengthcount) pix -= lengthcount;

            i++;

            if (delta === 0) delta = 1;
            if (i % delta === 0) {
                alpha -= alpha / alphadec;
                radius -= radius / radiusdec;
                rad = radius >> radiusbiasshift;

                if (rad <= 1) rad = 0;
                for (j = 0; j < rad; j++)
                    radpower[j] = toInt(alpha * (((rad * rad - j * j) * radbias) / (rad * rad)));
            }
        }
    }

    /*
      Method: buildColormap
  
      1. initializes network
      2. trains it
      3. removes misconceptions
      4. builds colorindex
    */
    function buildColormap() {
        init();
        learn();
        unbiasnet();
        inxbuild();
    }
    this.buildColormap = buildColormap;

    /*
      Method: getColormap
  
      builds colormap from the index
  
      returns array in the format:
  
      >
      > [r, g, b, r, g, b, r, g, b, ..]
      >
    */
    function getColormap() {
        var map = [];
        var index = [];

        for (var i = 0; i < netsize; i++)
            index[network[i][3]] = i;

        var k = 0;
        for (var l = 0; l < netsize; l++) {
            var j = index[l];
            map[k++] = (network[j][0]);
            map[k++] = (network[j][1]);
            map[k++] = (network[j][2]);
        }
        return map;
    }
    this.getColormap = getColormap;

    /*
      Method: lookupRGB
  
      looks for the closest *r*, *g*, *b* color in the map and
      returns its index
    */
    this.lookupRGB = inxsearch;
}

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


function Stream() {
    Emitter.call(this);
}
Stream.prototype = new Emitter();
// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

Stream.prototype.pipe = function (dest, options) {
    var source = this;

    function ondata(chunk) {
        if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
                source.pause();
            }
        }
    }

    source.on('data', ondata);

    function ondrain() {
        if (source.readable && source.resume) {
            source.resume();
        }
    }

    dest.on('drain', ondrain);

    // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.
    if (!dest._isStdio && (!options || options.end !== false)) {
        source.on('end', onend);
        source.on('close', onclose);
    }

    var didOnEnd = false;
    function onend() {
        if (didOnEnd) return;
        didOnEnd = true;

        dest.end();
    }


    function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;

        if (typeof dest.destroy === 'function') dest.destroy();
    }

    // don't leave dangling pipes when there are errors.
    function onerror(er) {
        cleanup();
        if (!this.hasListeners('error')) {
            throw er; // Unhandled stream error in pipe.
        }
    }

    source.on('error', onerror);
    dest.on('error', onerror);

    // remove all the event listeners that were added.
    function cleanup() {
        source.off('data', ondata);
        dest.off('drain', ondrain);

        source.off('end', onend);
        source.off('close', onclose);

        source.off('error', onerror);
        dest.off('error', onerror);

        source.off('end', cleanup);
        source.off('close', cleanup);

        dest.off('end', cleanup);
        dest.off('close', cleanup);
    }

    source.on('end', cleanup);
    source.on('close', cleanup);

    dest.on('end', cleanup);
    dest.on('close', cleanup);

    dest.emit('pipe', source);

    // Allow for unix-like usage: A.pipe(B).pipe(C)
    return dest;
}