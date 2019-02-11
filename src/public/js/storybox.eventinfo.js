StoryBox.Module.EventInfo = function(options) {
	
	var self = this;

	this.Viewport = this.Helpers.Viewport;

	// Get em
	this.instances = this.getInstances();

	// Do nowt?
	if (this.instances.length == 0) return;

	// Go go go
	this.stage = this.createInstances();
}

StoryBox.Module.EventInfo.prototype.onScroll = function() {
	for (var key in this.instances) {
		var element = this.instances[key];
		this.scrollCheck(element);
	}
}

StoryBox.Module.EventInfo.prototype.scrollCheck = function(element) {
	var self = this;
	var select = this.HTML;
	var animated = false;
	var isVisible = this.Viewport.inView(element, 80);
	if (isVisible && !animated) {
		animated = true;
		var hasClass = select.hasClass(element, 'shown');
		if (!hasClass) {
			select.addClass(element, 'shown');
		}
	}
}

StoryBox.Module.EventInfo.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

StoryBox.Module.EventInfo.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-eventinfo');
}

StoryBox.Module.EventInfo.prototype.addImages = function() {
	var background = document.getElementsByClassName('background')[0];
	var foreground = document.getElementsByClassName('foreground')[0];
	for (key in this.images) {
		var url = this.images[key];
		this.createImage(key, url);
	}
}

StoryBox.Module.EventInfo.prototype.createImage = function(key, url, className, append) {
	var img = document.createElement('img');
	img.className = (className ? className : '') + ' ' + 'sb-image ' + key;
	img.src = url;
	var parent = append ? append : this.stage;
	parent.appendChild(img);
}

StoryBox.Module.EventInfo.prototype.createInstances = function() {
	this.stage = this.instances[0];
	this.addImages();
}

StoryBox.Module.EventInfo.prototype.setDefault = function() {
	var drone = this.selectors.drone;
	var title = this.selectors.title;
	var buildings = this.selectors.buildings;

	// Anim defaults
	TweenMax.set(drone, {top:'-7%', opacity:0.6});
	TweenMax.set(title, {top:'-7%', opacity:0.6});
	TweenMax.set(buildings, {rotationX:-90, opacity:0.6});
}

StoryBox.Module.EventInfo.prototype.animate = function() {

	var drone = this.selectors.drone;
	var title = this.selectors.title;
	var buildings = this.selectors.buildings;

	// Anim timeline
	var tl = new TimelineLite({delay: 0});
	tl
		.staggerTo(buildings, 0.5, {rotationX:0, transformOrigin:"50% 100%", opacity:1, ease:Linear.easeNone}, 0.1)
		.to(title, 0.5, {top:'9%', opacity:1, ease:Power1.easeInOut})
		.to(drone, 1, {top:'9%', opacity:1, ease:Power1.easeInOut})
		.to(drone, 0.5, {top:'5%', ease:Power1.easeInOut})
		.to(drone, 0.5, {top:'9%', ease:Power1.easeInOut, onComplete : function() {
			tl.seek(3.5) // Repeat
		}});

}