StoryBox.Module.SummitHeader = function(options) {
	
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

StoryBox.Module.SummitHeader.prototype.images = {
	// 'template' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549198678/StoryBox/modules/summit_header/template.jpg',
	'summit-title' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549198506/StoryBox/modules/summit_header/im_title.png',
	'summit-globe' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197757/StoryBox/modules/summit_header/im_globe_bg.jpg',
	'summit-subtitle summit-subtitle_platinum_sponsor' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197756/StoryBox/modules/summit_header/im_subtitle_platinum_sponsor.jpg',
	'summit-subtitle summit-subtitle_silver_sponsor' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197756/StoryBox/modules/summit_header/im_subtitle_silver_sponsor.jpg',
	'summit-subtitle summit-subtitle_supporting_sponsor' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197756/StoryBox/modules/summit_header/im_subtitle_supporting_sponsor.jpg',
	'summit-subtitle summit-subtitle_analyst_partner' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197756/StoryBox/modules/summit_header/im_subtitle_analyst_partner.jpg',
	'summit-logo summit-logo_huawei' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197755/StoryBox/modules/summit_header/im_logo_huawei.jpg',
	'summit-logo summit-logo_sequans' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197755/StoryBox/modules/summit_header/im_logo_sequans.jpg',
	'summit-logo summit-logo_gemalto' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197755/StoryBox/modules/summit_header/im_logo_gemalto.jpg',
	'summit-logo summit-logo_bewhere' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197754/StoryBox/modules/summit_header/im_logo_bewhere.jpg',
	'summit-logo summit-logo_ericsson' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197754/StoryBox/modules/summit_header/im_logo_ericsson.jpg',
	'summit-logo summit-logo_nokia' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197755/StoryBox/modules/summit_header/im_logo_nokia.jpg',
	'summit-logo summit-logo_intelligence' : 'https://res.cloudinary.com/rgdigital/image/upload/v1549197755/StoryBox/modules/summit_header/im_logo_intelligence.jpg',
}


StoryBox.Module.SummitHeader.prototype.createInstances = function(instance) {
	this.addImages(instance);
	this.default(instance);
}

StoryBox.Module.SummitHeader.prototype.addImages = function(instance) {
	for (key in this.images) {
		var url = this.images[key];
		this.createImage(key, url, false, instance);
	}
}

StoryBox.Module.SummitHeader.prototype.createImage = function(key, url, className, append) {
	var img = document.createElement('img');
	img.className = (className ? className : '') + ' ' + 'sb-image ' + key;
	img.src = url;
	var parent = append ? append : this.stage;
	parent.appendChild(img);
}

StoryBox.Module.SummitHeader.prototype.onScroll = function() {
	for (var key in this.instances) {
		var element = this.instances[key];
		this.scrollCheck(element);
	}
}

StoryBox.Module.SummitHeader.prototype.scrollCheck = function(element) {
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

StoryBox.Module.SummitHeader.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

StoryBox.Module.SummitHeader.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-summit_header');
}

StoryBox.Module.SummitHeader.prototype.default = function(instance) {
	var title = instance.getElementsByClassName('summit-title');
	var globe = instance.getElementsByClassName('summit-globe');
	var logos = instance.getElementsByClassName('summit-logo');
	var subtitles = instance.getElementsByClassName('summit-subtitle');

	TweenMax.set([logos, subtitles], {opacity:0, scale:0.2})
	TweenMax.set(title, {opacity:0, left:-100})
	TweenMax.set(globe, {opacity:0, rotation:'-=180'})
}

StoryBox.Module.SummitHeader.prototype.animate = function(instance) {
	var title = instance.getElementsByClassName('summit-title');
	var globe = instance.getElementsByClassName('summit-globe');
	var logos = instance.getElementsByClassName('summit-logo');
	var subtitles = instance.getElementsByClassName('summit-subtitle');

	new TimelineLite()
		.to(globe, 1, {opacity:1, rotation:'+=180', ease:Power1.easeOut})
		.to(title, 1, {opacity:1, left:0, ease:Power1.easeOut})
	new TimelineLite().staggerTo(subtitles, 0.5, {opacity:1, scale:1, ease:Power1.easeInOut}, 0.5)
	new TimelineLite().staggerTo(logos, 0.5, {opacity:1, scale:1, ease:Power1.easeInOut}, 0.2)
}