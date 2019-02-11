StoryBox.Module.IotTable = function(options) {
	
	var self = this;

	this.Viewport = this.Helpers.Viewport;

	// Get em
	this.instances = this.getInstances();

	// Do nowt?
	if (this.instances.length == 0) return;

	for (var i = 0; i < this.instances.length; i++) {
		// Go go go
		// this.createInstances(this.instances[i]);
		// Anim defaults
		this.setDefault(this.instances[i]);
	}
}

StoryBox.Module.IotTable.prototype.onScroll = function() {
	for (var key in this.instances) {
		var element = this.instances[key];
		this.scrollCheck(element);
	}
}

StoryBox.Module.IotTable.prototype.scrollCheck = function(element) {
	var self = this;
	var select = this.HTML;
	var animated = false;
	var isVisible = this.Viewport.inView(element, 50);
	if (isVisible) {
		if (!animated) {
			var hasClass = select.hasClass(element, 'shown');
			if (!hasClass) {
				select.addClass(element, 'shown');
				self.show(element, function() {
					animated = true;
				});
			}
		}
	} else {
		if (!animated) {
			var hasClass = select.hasClass(element, 'shown');
			if (hasClass) {
				select.removeClass(element, 'shown');
				self.hide(element, function() {
					animated = false;
				});
			}
		}
	}
}

StoryBox.Module.IotTable.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

StoryBox.Module.IotTable.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-iottable');
}

StoryBox.Module.IotTable.prototype.setDefault = function(instance) {

	var thead = instance.getElementsByTagName('thead');
	var td = instance.getElementsByTagName('td');
	TweenMax.set([thead, td], {rotationX:-90, opacity:0, y:'-100px'});
}

StoryBox.Module.IotTable.prototype.show = function(instance, complete) {

	var thead = instance.getElementsByTagName('thead');
	var td = instance.getElementsByTagName('td');

	TweenMax.to(thead, 0.6, {rotationX:0, transformOrigin:"50% 0", opacity:1, y:0, ease:Bounce.easeOut})
	var tl = new TimelineLite();
	tl
		.staggerTo(td, 0.6, {rotationX:0, transformOrigin:"50% 0", opacity:1, y:0, ease:Bounce.easeOut, onComplete : complete}, 0.06)
}

StoryBox.Module.IotTable.prototype.hide = function(instance, complete) {

	var thead = instance.getElementsByTagName('thead');
	var td = instance.getElementsByTagName('td');
	
	TweenMax.to(thead, 0.6, {rotationX:-90, transformOrigin:"50% 0", opacity:0, y:'-100px', ease:Bounce.easeOut})
	var tl = new TimelineLite();
	tl
		.staggerTo(td, 0.6, {rotationX:-90, transformOrigin:"50% 0", opacity:0, y:'-100px', ease:Bounce.easeOut, onComplete : complete}, 0.06)

}