StoryBox.Module.ParallaxSeminar = function(options) {
	
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

StoryBox.Module.ParallaxSeminar.prototype.images = {
	'sb-bg' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548842037/StoryBox/modules/parallax_seminar/im_bg.jpg',
	'sb-title' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548842037/StoryBox/modules/parallax_seminar/im_title.png',
	'sb-drone' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548845300/StoryBox/modules/parallax_seminar/im_drone.png',
	'sb-ring sb-ring_01' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548850325/StoryBox/modules/parallax_seminar/im_ring_01.png',
	'sb-ring sb-ring_02' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548850695/StoryBox/modules/parallax_seminar/im_ring_02.png',
	'sb-ring sb-ring_03' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548850695/StoryBox/modules/parallax_seminar/im_ring_03.png',
	'sb-ring sb-ring_04' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548850695/StoryBox/modules/parallax_seminar/im_ring_04.png',
	'sb-ring sb-ring_05' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548850695/StoryBox/modules/parallax_seminar/im_ring_05.png',
	'sb-ring sb-ring_06' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548850695/StoryBox/modules/parallax_seminar/im_ring_06.png'
}

StoryBox.Module.ParallaxSeminar.prototype.onScroll = function(data) {
	for (var i = 0; i < this.instances.length; i++) {
		var element = this.instances[i];
		this.scrollCheck(element, data);
	}
}

StoryBox.Module.ParallaxSeminar.prototype.scrollCheck = function(element, data) {
	var self = this;
	var select = this.HTML;
	var animated = false;
	var isVisible = this.Viewport.inView(element);
	if (isVisible && !animated) {
		animated = true;
		var hasClass = select.hasClass(element, 'shown');
		if (!hasClass) {
			select.addClass(element, 'shown');
			self.animate(element);
		}
	}
	self.parallax(element, data);
}

StoryBox.Module.ParallaxSeminar.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-parallaxseminar');
}

StoryBox.Module.ParallaxSeminar.prototype.createInstances = function(instance) {
	this.addImages(instance);
	this.default(instance);
}

StoryBox.Module.ParallaxSeminar.prototype.addImages = function(instance) {
	// var ringID = 1;
	for (key in this.images) {
		var url = this.images[key];
		// Ring
		// if (key.indexOf('ring')!==-1) {
		// 	var ringContainer = document.createElement('div');
		// 	ringContainer.className = 'sb-ring-container sb-ring-'+ringID;
		// 	this.createImage(key, url, false, ringContainer);
		// 	instance.appendChild(ringContainer);
		// 	++ringID;
		// } else {
		// 	// Other
		// 	this.createImage(key, url, false, instance);
		// }
		this.createImage(key, url, false, instance);
	}
}

StoryBox.Module.ParallaxSeminar.prototype.createImage = function(key, url, className, append) {
	var img = document.createElement('img');
	img.className = (className ? className : '') + ' ' + 'sb-image ' + key;
	img.src = url;
	var parent = append ? append : this.stage;
	parent.appendChild(img);
}

StoryBox.Module.ParallaxSeminar.prototype.default = function(instance) {

	var bg = '.sb-bg';
	var rings = instance.getElementsByClassName('sb-ring');
	var title = instance.getElementsByClassName('sb-title');
	var drone = '.sb-drone';

	// Anim defaults
	TweenMax.set(bg, {scale: 1.2});
	TweenMax.set(rings, {opacity:0, scale: 0.2});
	TweenMax.set(drone, {opacity:0, scale: 0.2});
	TweenMax.set(title, {opacity:0, scale: 0.2});
}

StoryBox.Module.ParallaxSeminar.prototype.animate = function(instance) {

	var bg = instance.getElementsByClassName('sb-bg');
	var rings = instance.getElementsByClassName('sb-ring');
	// var rings = '.sb-ring_01, .sb-ring_02, .sb-ring_03, .sb-ring_04, .sb-ring_05, .sb-ring_06';
	var title = instance.getElementsByClassName('sb-title');
	var drone = instance.getElementsByClassName('sb-drone');

	var ring_01 = instance.getElementsByClassName('sb-ring_01');
	var ring_02 = instance.getElementsByClassName('sb-ring_02');
	var ring_03 = instance.getElementsByClassName('sb-ring_03');
	var ring_04 = instance.getElementsByClassName('sb-ring_04');
	var ring_05 = instance.getElementsByClassName('sb-ring_05');
	var ring_06 = instance.getElementsByClassName('sb-ring_06');

	function rotate(clockwise, transformOrigin) {
		// return { rotation:(clockwise ? 360 : -360), transformOrigin:transformOrigin, ease:Linear.easeNone, repeat: -1, paused: false };
		return { rotation:(clockwise ? 360 : -360), ease:Linear.easeNone, repeat: -1, paused: false };
	}

	TweenMax.to(ring_01, 10, rotate(true));
	TweenMax.to(ring_02, 18, rotate(false));
	TweenMax.to(ring_03, 20, rotate(true));
	TweenMax.to(ring_04, 24, rotate(true));
	TweenMax.to(ring_05, 12, rotate(false));
	TweenMax.to(ring_06, 15, rotate(true));

	// Anim defaults
	var tl = new TimelineLite();
	tl
		.staggerTo(rings, 0.5, {opacity:1, scale:1, ease:Power1.easeInOut}, 0.2)
		.to(title, 0.5, {opacity:1, scale:1, ease:Power1.easeInOut})
		.to(drone, 0.5, {opacity:1, scale:1, ease:Power1.easeInOut})

	// Drone hover
	TweenMax.to(drone, 0.5, {top:"+=7", yoyo:true, ease:Power1.easeInOut, repeat: -1, paused: false })

}

StoryBox.Module.ParallaxSeminar.prototype.getShiftDistance = function(instance, scrollTop, modifier) {
	var bounding = instance.getBoundingClientRect();
	var firstTop = bounding.top;
	// var scrollTop = $(window).scrollTop();
	var shiftDistance = (firstTop - scrollTop)*modifier;
	return shiftDistance;
};

StoryBox.Module.ParallaxSeminar.prototype.getScrollTop = function(scrollTop, modifier) {
	return Math.abs(0-(scrollTop*modifier));
};

StoryBox.Module.ParallaxSeminar.prototype.parallax = function(instance, data) {
	
	var bg = instance.getElementsByClassName('sb-bg');
	var title = instance.getElementsByClassName('sb-title');
	var drone = instance.getElementsByClassName('sb-drone');
	var pct = this.Viewport.positionInViewport(instance);
	var pos = this.Viewport.getShiftDistance(-40, 40, pct);

	var ring_01 = instance.getElementsByClassName('sb-ring_01');
	var ring_02 = instance.getElementsByClassName('sb-ring_02');
	var ring_03 = instance.getElementsByClassName('sb-ring_03');
	var ring_04 = instance.getElementsByClassName('sb-ring_04');
	var ring_05 = instance.getElementsByClassName('sb-ring_05');
	var ring_06 = instance.getElementsByClassName('sb-ring_06');

	function getShift(modifier) {
		return pos * modifier;
	}

	var speed = 0.1;

	if (pos) {
		TweenMax.to(ring_01, speed, {y:getShift(1.00), ease:Power1.easeOut})
		TweenMax.to(ring_02, speed, {y:getShift(1.20), ease:Power1.easeOut})
		TweenMax.to(ring_03, speed, {y:getShift(1.40), ease:Power1.easeOut})
		TweenMax.to(ring_04, speed, {y:getShift(1.60), ease:Power1.easeOut})
		TweenMax.to(ring_05, speed, {y:getShift(1.80), ease:Power1.easeOut})
		TweenMax.to(ring_06, speed, {y:getShift(2.0), ease:Power1.easeOut})
		TweenMax.to(drone, speed, {y:getShift(2.20), ease:Power1.easeOut})
		TweenMax.to(title, speed, {y:getShift(0.40), ease:Power1.easeOut})
		TweenMax.to(bg, speed, {y:getShift(0.40), ease:Power1.easeOut})
	}
}