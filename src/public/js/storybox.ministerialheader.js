StoryBox.Module.MinisterialHeader = function(options) {
	
	var self = this;

	this.Viewport = this.Helpers.Viewport;

	// Get em
	this.instances = this.getInstances();

	// Do nowt?
	if (this.instances.length == 0) return;

	for (var i = 0; i < this.instances.length; i++) {		
		this.createInstances(this.instances[i]);
	}
}

StoryBox.Module.MinisterialHeader.prototype.images = {
	'sb-header' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549377512/StoryBox/modules/ministerial_header/im_header.jpg'
}


StoryBox.Module.MinisterialHeader.prototype.createInstances = function(instance) {
	this.addImages(instance);
	this.default(instance);
}

StoryBox.Module.MinisterialHeader.prototype.addImages = function(instance) {
	for (key in this.images) {
		var url = this.images[key];
		this.createImage(key, url, false, instance);
	}
}

StoryBox.Module.MinisterialHeader.prototype.createImage = function(key, url, className, append) {
	var img = document.createElement('img');
	img.className = (className ? className : '') + ' ' + 'sb-image ' + key;
	img.src = url;
	var parent = append ? append : this.stage;
	parent.appendChild(img);
}

StoryBox.Module.MinisterialHeader.prototype.onScroll = function() {
	for (var key in this.instances) {
		var element = this.instances[key];
		this.scrollCheck(element);
	}
}

StoryBox.Module.MinisterialHeader.prototype.scrollCheck = function(element) {
	var self = this;
	var select = this.HTML;
	var animated = false;
	var isVisible = this.Viewport.inView(element, 80);
	if (isVisible && !animated) {
		animated = true;
		var hasClass = select.hasClass(element, 'shown');
		if (!hasClass) {
			select.addClass(element, 'shown');
			self.animate(element);
		}
	}
}

StoryBox.Module.MinisterialHeader.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

StoryBox.Module.MinisterialHeader.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-minesterialheader');
}

StoryBox.Module.MinisterialHeader.prototype.default = function(instance) {
	var header = instance.getElementsByClassName('sb-header');
	TweenMax.set(header, {opacity:0, rotationX:90})
	// TweenMax.set(header, {rotationX:45})
}

StoryBox.Module.MinisterialHeader.prototype.animate = function(instance) {
	var header = instance.getElementsByClassName('sb-header');
	TweenMax.to(header, 1.5, {opacity:1, rotationX:0, ease:Power1.easeOut})
}