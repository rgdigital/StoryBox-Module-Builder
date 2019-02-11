StoryBox.Module.IotProgHeader = function(options) {
	
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

StoryBox.Module.IotProgHeader.prototype.images = {
	// 'template' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549215434/StoryBox/modules/iotprog_header/template.jpg',
	'sb-globe' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549215434/StoryBox/modules/iotprog_header/im_city_globe.png',
	'sb-title' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549215433/StoryBox/modules/iotprog_header/im_title.png',
	'sb-middle-line' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549215432/StoryBox/modules/iotprog_header/im_middle_line.jpg',
}

StoryBox.Module.IotProgHeader.prototype.onScroll = function(data) {
	for (var i = 0; i < this.instances.length; i++) {
		var element = this.instances[i];
		this.scrollCheck(element, data);
	}
}

StoryBox.Module.IotProgHeader.prototype.scrollCheck = function(element, data) {
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

StoryBox.Module.IotProgHeader.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-iotprogheader');
}

StoryBox.Module.IotProgHeader.prototype.createInstances = function(instance) {
	this.addImages(instance);
	this.default(instance);
}

StoryBox.Module.IotProgHeader.prototype.addImages = function(instance) {
	// var ringID = 1;
	for (key in this.images) {
		var url = this.images[key];
		this.createImage(key, url, false, instance);
	}
}

StoryBox.Module.IotProgHeader.prototype.createImage = function(key, url, className, append) {
	var img = document.createElement('img');
	img.className = (className ? className : '') + ' ' + 'sb-image ' + key;
	img.src = url;
	var parent = append ? append : this.stage;
	parent.appendChild(img);
}

StoryBox.Module.IotProgHeader.prototype.default = function(instance) {

	var title = instance.getElementsByClassName('sb-title');
	var globe = instance.getElementsByClassName('sb-globe');
	var line = instance.getElementsByClassName('sb-middle-line');

	TweenMax.set(title, {opacity:0, left:-100});
	TweenMax.set(line, {width:0});
	TweenMax.set(globe, {opacity:0, rotation:'-=90'});
}

StoryBox.Module.IotProgHeader.prototype.animate = function(instance) {
	var title = instance.getElementsByClassName('sb-title');
	var globe = instance.getElementsByClassName('sb-globe');
	var line = instance.getElementsByClassName('sb-middle-line');

	TweenMax.to(title, 1,{opacity:1, left:'23%', delay:1});
	TweenMax.to(line, 1,  {opacity:1, width:'100%', delay:1});
	TweenMax.to(globe, 1, {opacity:1, rotation:'+=90'});
}