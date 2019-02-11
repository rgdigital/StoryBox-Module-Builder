var Colorize = function(options) {
	
	// Get em
	this.instances = this.getInstances();

	// Do nowt?
	if (this.instances.length == 0) return;

	// Go go go
	this.canvas = this.createInstances();
}

Colorize.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

Colorize.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-colorize');
}

/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/
Colorize.prototype.drawImageProp = function(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);

    return ctx;
}

Colorize.prototype.greyscale = function(canvas) {

	var ctx = canvas.getContext('2d');
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var data = imageData.data;
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);

	return ctx;
}

Colorize.prototype.drawGreyscale = function(canvas, img, greyscale, second) {
	// var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	if (greyscale) {
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
		  var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
		  data[i]     = avg; // red
		  data[i + 1] = avg; // green
		  data[i + 2] = avg; // blue
		}
	}

	if (!second) {
		// ctx.globalAlpha = 0.1;
		ctx.putImageData(imageData, 0, 0);
	} else {
		// ctx.save();
		// ctx.clip();
		// ctx.globalAlpha = 0.1;
		// ctx.globalCompositeOperation = 'exclusion';
		ctx.putImageData(imageData, 100, 100);
	}

	return ctx;
}

Colorize.prototype.createInstances = function() {
	
	var self = this;

	for (var i = 0; i < this.instances.length; i++) {

		// Is src specified
		if (this.instances[i].dataset.src == undefined) {
			this.throwError('No image src defined in dataset');
		}

		var canvas = this.instances[i];
		var img = new Image();
			img.crossOrigin = "";

		img.onload = function() {
			self.addImageToCanvas(canvas, this);
		}

		img.src = canvas.dataset.src;

	}

};

Colorize.prototype.addImageToCanvas = function(canvas, img) {
	
	var width = img.naturalWidth;
	var height = img.naturalHeight;

	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext('2d');

	ctx = this.drawGreyscale(canvas, img, true);

	ctx.save();
	// ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.globalAlpha = 0.3;
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, width, height);
	ctx.rect(0, 0, x, height);
	ctx.restore();
	
	// ctx = this.drawGreyscale(canvas, img, true, true);

	var x = 0,
		y = 0,
		modifier = 6;

	function loop() {
		
		x = x + modifier;
		y = y + modifier;

    	ctx.save();
	    ctx.beginPath();
	    ctx.shadowBlur = 10;
	    ctx.rect(0, 0, x, height);
	    ctx.closePath();
	    ctx.clip();
	    ctx.drawImage(img,0,0);
	    ctx.restore();

	    if (x < width) {
	    	requestAnimationFrame(loop);
	    }

	}

	loop();

}