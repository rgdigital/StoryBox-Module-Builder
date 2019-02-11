StoryBox.Module.ScrollList = function(options) {
	
	var self = this;

	this.Viewport = this.Helpers.Viewport;

	// Get em
	this.instances = this.getInstances();

	// Do nowt?
	if (this.instances.length == 0) return;

	for (var i = 0; i < this.instances.length; i++) {		
		this.attachClicks(this.instances[i]);
	}
}

StoryBox.Module.ScrollList.prototype.onScroll = function() {
	for (var key in this.instances) {
		var element = this.instances[key];
		this.scrollCheck(element);
	}
}

StoryBox.Module.ScrollList.prototype.scrollCheck = function(element) {
	var self = this;
	var select = this.HTML;
	var animated = false;
	var isVisible = this.Viewport.inView(element);
	if (isVisible && !animated) {
		animated = true;
		var hasClass = select.hasClass(element, 'shown');
		if (!hasClass) {
			select.addClass(element, 'shown');
			// self.animate(element);
		}
	}
}

StoryBox.Module.ScrollList.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

StoryBox.Module.ScrollList.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-scrolllist');
}

StoryBox.Module.ScrollList.prototype.attachClicks = function(instance) {
	var links = instance.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		this.attachClick(links[i]);
	}
}

StoryBox.Module.ScrollList.prototype.attachClick = function(link) {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		var id = link.href.split('#')[1];
		var target = document.getElementById(id);
		var y = target.getBoundingClientRect().top;
		TweenMax.to(window, 0.6, {
			scrollTo : { y: y, autoKill:true },
				ease: Power1.easeInOut,
				autoKill: true,
				overwrite: 5						
			});
	});
}