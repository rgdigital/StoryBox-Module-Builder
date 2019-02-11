StoryBox.Module.CogHeader = function(options) {
	
	var self = this;

	this.Viewport = this.Helpers.Viewport;

	// Get em
	this.instances = this.getInstances();

	// Do nowt?
	if (this.instances.length == 0) return;

	for (var i = 0; i < this.instances.length; i++) {
		// Go go go
		this.createInstances(this.instances[i]);
		// Anim defaults
		this.setDefault(this.instances[i]);
	}
}

StoryBox.Module.CogHeader.prototype.images = {
	background : 'https://res.cloudinary.com/rgdigital/image/upload/v1549368289/StoryBox/modules/cogheader/im_header.jpg',
	head_shape : 'https://res.cloudinary.com/rgdigital/image/upload/v1548176702/StoryBox/modules/cogheader/im_head.png',
	cog_01 : 'https://res.cloudinary.com/rgdigital/image/upload/v1548176701/StoryBox/modules/cogheader/im_cog_01.png',
	cog_02 : 'https://res.cloudinary.com/rgdigital/image/upload/v1548176701/StoryBox/modules/cogheader/im_cog_02.png',
	cog_03 : 'https://res.cloudinary.com/rgdigital/image/upload/v1548176701/StoryBox/modules/cogheader/im_cog_03.png',
	cog_04 : 'https://res.cloudinary.com/rgdigital/image/upload/v1548176701/StoryBox/modules/cogheader/im_cog_04.png',
	cog_05 : 'https://res.cloudinary.com/rgdigital/image/upload/v1548176701/StoryBox/modules/cogheader/im_cog_05.png',
	cog_06 : 'https://res.cloudinary.com/rgdigital/image/upload/v1548176701/StoryBox/modules/cogheader/im_cog_06.png'
}

StoryBox.Module.CogHeader.prototype.onScroll = function() {
	for (var key in this.instances) {
		var element = this.instances[key];
		this.scrollCheck(element);
	}
}

StoryBox.Module.CogHeader.prototype.scrollCheck = function(element) {
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

StoryBox.Module.CogHeader.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

StoryBox.Module.CogHeader.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-cogheader');
}

StoryBox.Module.CogHeader.prototype.addImages = function(instance) {
	for (key in this.images) {
		var url = this.images[key];
		this.createImage(key, url, 'sb-icon', instance);
	}
}

StoryBox.Module.CogHeader.prototype.createImage = function(key, url, className, append) {
	var img = document.createElement('img');
	img.className = (className ? className : '') + ' ' + 'sb-image ' + key;
	img.src = url;
	var parent = append ? append : this.stage;
	parent.appendChild(img);
}

StoryBox.Module.CogHeader.prototype.createInstances = function(instance) {
	this.addImages(instance);
}

StoryBox.Module.CogHeader.prototype.setDefault = function(instance) {

	var background = instance.getElementsByClassName('background');
	var head_shape = instance.getElementsByClassName('head_shape')[0];
	var cog_01 = instance.getElementsByClassName('cog_01')[0];
	var cog_02 = instance.getElementsByClassName('cog_02')[0];
	var cog_03 = instance.getElementsByClassName('cog_03')[0];
	var cog_04 = instance.getElementsByClassName('cog_04')[0];
	var cog_05 = instance.getElementsByClassName('cog_05')[0];
	var cog_06 = instance.getElementsByClassName('cog_06')[0];

	// Anim defaults
	TweenMax.set([background], {opacity:0});
	TweenMax.set([head_shape], {bottom:'-100%'});
	TweenMax.set([cog_01, cog_02, cog_03, cog_04, cog_05, cog_06], {opacity:0, scale:0});
}

StoryBox.Module.CogHeader.prototype.animate = function(instance) {

	var background = instance.getElementsByClassName('background');
	var head_shape = instance.getElementsByClassName('head_shape')[0];
	var cog_01 = instance.getElementsByClassName('cog_01')[0];
	var cog_02 = instance.getElementsByClassName('cog_02')[0];
	var cog_03 = instance.getElementsByClassName('cog_03')[0];
	var cog_04 = instance.getElementsByClassName('cog_04')[0];
	var cog_05 = instance.getElementsByClassName('cog_05')[0];
	var cog_06 = instance.getElementsByClassName('cog_06')[0];

	function wheelMotion(clockwise) {
		return { css: {rotation:(clockwise ? 360 : -360)}, ease:Linear.easeNone, repeat: -1, paused: false };
	}

	TweenMax.to(cog_01, 4, wheelMotion(true));
	TweenMax.to(cog_02, 4, wheelMotion(false));
	TweenMax.to(cog_03, 5, wheelMotion(true));
	TweenMax.to(cog_04, 3, wheelMotion(true));
	TweenMax.to(cog_05, 6, wheelMotion(false));
	TweenMax.to(cog_06, 4, wheelMotion(true));

	// Anim timeline
	var tl = new TimelineLite({delay: 0});

	tl
		.to(background, 0.5, {opacity:1, ease:Power1.easeInOut})
		.to(head_shape, 0.7, {opacity:1, bottom:0, ease:Power1.easeInOut})
		.staggerTo([cog_01, cog_02, cog_03, cog_04, cog_05, cog_06], 0.2, {scale:1, opacity:1, ease:Linear.easeNone}, 0.1)

}