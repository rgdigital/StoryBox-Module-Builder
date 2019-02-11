StoryBox.Module.ConseshHeader = function(options) {
	
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

StoryBox.Module.ConseshHeader.prototype.images = {
	'sb-background' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549222737/StoryBox/modules/consesh_header/im_bg.jpg',
	'sb-title' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549222735/StoryBox/modules/consesh_header/im_title.png'
}


StoryBox.Module.ConseshHeader.prototype.createInstances = function(instance) {
	this.addImages(instance);
	this.default(instance);
}

StoryBox.Module.ConseshHeader.prototype.addImages = function(instance) {
	for (key in this.images) {
		var url = this.images[key];
		this.createImage(key, url, false, instance);
	}
}

StoryBox.Module.ConseshHeader.prototype.createImage = function(key, url, className, append) {
	var img = document.createElement('img');
	img.className = (className ? className : '') + ' ' + 'sb-image ' + key;
	img.src = url;
	var parent = append ? append : this.stage;
	parent.appendChild(img);
}

StoryBox.Module.ConseshHeader.prototype.onScroll = function() {
	for (var i = 0; i < this.instances.length; i++) {
		var element = this.instances[i];
		this.scrollCheck(element);
	}
}

StoryBox.Module.ConseshHeader.prototype.scrollCheck = function(element) {
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
	this.parallax(element);
}

StoryBox.Module.ConseshHeader.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

StoryBox.Module.ConseshHeader.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-conseshheader');
}

StoryBox.Module.ConseshHeader.prototype.default = function(instance) {
	var background = instance.getElementsByClassName('sb-background');
	var title = instance.getElementsByClassName('sb-title');
	TweenMax.set([background, title], {opacity:0})
	// TweenMax.set(header, {rotationX:45})
}

StoryBox.Module.ConseshHeader.prototype.animate = function(instance) {
	var background = instance.getElementsByClassName('sb-background');
	var title = instance.getElementsByClassName('sb-title');
	TweenMax.to([background, title], 0.5, {opacity:1, ease:Power1.easeOut})
}


StoryBox.Module.ConseshHeader.prototype.getShiftDistance = function(instance, scrollTop, modifier) {
	var bounding = instance.getBoundingClientRect();
	var firstTop = bounding.top;
	// var scrollTop = $(window).scrollTop();
	var shiftDistance = (firstTop - scrollTop)*modifier;
	return shiftDistance;
};

StoryBox.Module.ConseshHeader.prototype.getScrollTop = function(scrollTop, modifier) {
	return Math.abs(0-(scrollTop*modifier));
};

StoryBox.Module.ConseshHeader.prototype.parallax = function(instance) {
	
	var background = instance.getElementsByClassName('sb-background');
	var title = instance.getElementsByClassName('sb-title');
	var pct = this.Viewport.positionInViewport(instance);
	var pos = this.Viewport.getShiftDistance(-40, 40, pct);
	var speed = 0.1;

	function getShift(modifier) {
		return pos * modifier;
	}

	if (pos) {
		// TweenMax.to(background, speed, {y:getShift(1.00), ease:Power1.easeOut})
		TweenMax.to(title, speed, {y:getShift(-0.7), ease:Power1.easeOut})
	}
}