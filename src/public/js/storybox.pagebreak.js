StoryBox.Module.PageBreak = function(options) {
	
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

StoryBox.Module.PageBreak.prototype.images = {
	icon_01 : 'https://res.cloudinary.com/rgdigital/image/upload/v1547313383/StoryBox/modules/page_break/im_br_icon_ai.png',
	icon_02 : 'https://res.cloudinary.com/rgdigital/image/upload/v1547312134/StoryBox/modules/page_break/im_br_icon_industrial_iot.png',
	icon_03 : 'https://res.cloudinary.com/rgdigital/image/upload/v1547312134/StoryBox/modules/page_break/im_br_icon_mobile_iot.png',
	icon_04 : 'https://res.cloudinary.com/rgdigital/image/upload/v1547312134/StoryBox/modules/page_break/im_br_icon_utilities.png',
	icon_05 : 'https://res.cloudinary.com/rgdigital/image/upload/v1547313383/StoryBox/modules/page_break/im_br_icon_robotics.png'
}

StoryBox.Module.PageBreak.prototype.extraImage = {
	line_break : 'https://res.cloudinary.com/rgdigital/image/upload/v1548435523/StoryBox/modules/page_break/im_link_arrow.jpg'
}

StoryBox.Module.PageBreak.prototype.onScroll = function() {
	for (var key in this.instances) {
		var element = this.instances[key];
		this.scrollCheck(element);
	}
}

StoryBox.Module.PageBreak.prototype.scrollCheck = function(element) {
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

StoryBox.Module.PageBreak.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

StoryBox.Module.PageBreak.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-pagebreak');
}

StoryBox.Module.PageBreak.prototype.addImages = function(instance) {
	for (key in this.images) {
		var url = this.images[key];
		this.createImage(key, url, 'sb-icon', instance);
	}
}

StoryBox.Module.PageBreak.prototype.createImage = function(key, url, className, append) {
	var img = document.createElement('img');
	img.className = (className ? className : '') + ' ' + 'sb-image ' + key;
	img.src = url;
	var parent = append ? append : this.stage;
	parent.appendChild(img);
}

StoryBox.Module.PageBreak.prototype.createInstances = function(instance) {
	var linebreak = this.createLineBreak(instance);
	var link = this.createTopButton(linebreak);
	this.topLinkAction(link);
}

StoryBox.Module.PageBreak.prototype.createTopButton = function(appendTo) {
	var link = document.createElement('a');
	link.className = "sb-scrolltop";
	link.innerHTML = '<img src="'+this.extraImage.line_break+'" class="sb-topbutton">';
	link.href = '#';
	appendTo.appendChild(link);
	return link;
}

StoryBox.Module.PageBreak.prototype.topLinkAction = function(link) {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		// var y = target.getBoundingClientRect().top;
		var y = 0;
		TweenMax.to(window, 0.6, {
			scrollTo : { y: y, autoKill:true },
				ease: Power1.easeInOut,
				autoKill: true,
				overwrite: 5
			});
	})
}

StoryBox.Module.PageBreak.prototype.createLineBreak = function(instance) {
	var line = document.createElement('div');
	line.className = "sb-line";
	instance.appendChild(line);
	return line;
}

StoryBox.Module.PageBreak.prototype.setDefault = function(instance) {

	var line = instance.getElementsByClassName('sb-line')[0];
	var icons = instance.getElementsByClassName('sb-icon');
	var link = instance.getElementsByClassName('sb-scrolltop');
	var icon = instance.getElementsByClassName('sb-topbutton');

	// Anim defaults
	TweenMax.set([icons, icon], {opacity:0, scale: 0.2});
	TweenMax.set(line, {width:'0%'});
}

StoryBox.Module.PageBreak.prototype.animate = function(instance) {

	var line = instance.getElementsByClassName('sb-line')[0];
	var icons = instance.getElementsByClassName('sb-icon');
	var link = instance.getElementsByClassName('sb-scrolltop');
	var icon = instance.getElementsByClassName('sb-topbutton');

	// Anim timeline
	var tl = new TimelineLite({delay: 0});

	tl
		.to(line, 1, {width:'100%', ease:Power1.easeInOut})
		.staggerTo(icons, 0.2, {scale:1, opacity:1, ease:Linear.easeNone}, 0.1)
		.to(icon, 0.4, {scale:1, opacity:1, ease:Power1.easeInOut})

}