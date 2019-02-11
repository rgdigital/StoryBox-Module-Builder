StoryBox.Module.IotBarchart = function(options) {
	
	var self = this;

	this.Viewport = this.Helpers.Viewport;

	// Get em
	this.instances = this.getInstances();

	// Do nowt?
	if (this.instances.length == 0) return;

	for (var i = 0; i < this.instances.length; i++) {		
		this.createInstance(this.instances[i]);
	}
}

StoryBox.Module.IotBarchart.prototype.onScroll = function() {
	for (var key in this.instances) {
		var element = this.instances[key];
		this.scrollCheck(element);
	}
}

StoryBox.Module.IotBarchart.prototype.scrollCheck = function(element) {
	var self = this;
	var select = this.HTML;
	var animated = false;
	var isVisible = this.Viewport.inView(element, 90);
	if (isVisible && !animated) {
		animated = true;
		var hasClass = select.hasClass(element, 'shown');
		if (!hasClass) {
			select.addClass(element, 'shown');
			self.animate(element);
		}
	}
}

StoryBox.Module.IotBarchart.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

StoryBox.Module.IotBarchart.prototype.objectLength = function(object) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};

StoryBox.Module.IotBarchart.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-iot-barchart');
}

StoryBox.Module.IotBarchart.prototype.createWrapper = function(className, appendTo) {
	var div = document.createElement('div');
	div.className = className || '';
	appendTo.appendChild(div);
	return div;
}

StoryBox.Module.IotBarchart.prototype.data = {
	title : 'MOBILE IoT NETWORK DEPLOYMENTS',
	data : {
		'H1 2017' : 9,
		'H2 2017' : 29,
		'H1 2018' : 53,
		'H2 2018' : 83
	}
}

StoryBox.Module.IotBarchart.prototype.createInstance = function(instance) {
	var title = this.createWrapper('sb-title-wrapper', instance);
	var bg = this.createWrapper('sb-data-background', instance);
	var key = this.createWrapper('sb-data-key', instance);
	var data = this.createWrapper('sb-data', instance);
	var annotations = this.createWrapper('sb-data-annotations', instance);

	// Add title text
	this.createTitle(title, this.data.title);
	// Create key
	this.createKey(key, this.data.data);
	// Create bg
	this.createBg(bg);
	// Create data bars
	this.createDataBars(data, this.data.data);
	// Create annotations
	this.createAnnotations(annotations, this.data.data);
	// Default anim
	this.default(instance);
}

StoryBox.Module.IotBarchart.prototype.getCountExtension = function(count) {
	if (count == 4) return 'quarter';
}

StoryBox.Module.IotBarchart.prototype.getMaxValue = function(data) {
	var max = 0;
	for (var key in data) {
		if (data[key] > max) max = data[key];
	}
	return max;
}

StoryBox.Module.IotBarchart.prototype.getPercentage = function(total, val) {
	var change = (val - total) / total;
	return Math.abs(change * 100);
}

StoryBox.Module.IotBarchart.prototype.createTitle = function(wrapper, title) {
	wrapper.innerHTML = '<h5>'+title+'</h5>';
}

StoryBox.Module.IotBarchart.prototype.createBg = function(wrapper) {
	var str = '<div class="sb-data-background-line sb-data-background-line-quarter sb-data-background-line-01"></div>';
		str += '<div class="sb-data-background-line sb-data-background-line-quarter sb-data-background-line-02"></div>';
		str += '<div class="sb-data-background-line sb-data-background-line-quarter sb-data-background-line-03"></div>';
		str += '<div class="sb-data-background-line sb-data-background-line-quarter sb-data-background-line-04"></div>';
	wrapper.innerHTML = str;
}

StoryBox.Module.IotBarchart.prototype.createKey = function(wrapper, data) {
	var length = this.objectLength(data);
	var ext = this.getCountExtension(length);
	var i = 0;
	for (var key in data) {
		++i;
		var num = ("0" + i).slice(-2);
		wrapper.innerHTML += '<div class="sb-data-key-item sb-data-key-item-'+ext+' sb-data-key-item-'+num+'"><h6>'+key+'</h6></div>'
	}
}

StoryBox.Module.IotBarchart.prototype.createDataBars = function(wrapper, data) {
	var length = this.objectLength(data);
	var ext = this.getCountExtension(length);
	var max = this.getMaxValue(data);
	this.data.heights = [];
	var i = 0;
	for (var key in data) {
		++i;
		var num = ("0" + i).slice(-2)
		var pct = 100 - Math.round(this.getPercentage(max, data[key]));
		this.data.heights.push(pct);
		wrapper.innerHTML += '<div class="sb-data-bar sb-data-bar-'+ext+' sb-data-bar-'+num+'" style="height:'+pct+'%;"></div>';
	}
}

StoryBox.Module.IotBarchart.prototype.createAnnotations = function(wrapper, data) {
	var length = this.objectLength(data);
	var ext = this.getCountExtension(length);
	var max = this.getMaxValue(data);
	var i = 0;
	for (var key in data) {
		++i;
		var num = ("0" + i).slice(-2)
		var pct = 100 - Math.round(this.getPercentage(max, data[key]));
		wrapper.innerHTML += '<div class="sb-data-annotation sb-data-annotation-'+ext+' sb-data-annotation-'+num+'" style="height:'+pct+'%;"><h5>'+data[key]+'</h5></div>';
	}
}

StoryBox.Module.IotBarchart.prototype.default = function(instance) {
	TweenMax.set('.sb-data-bar', {height:0});
	TweenMax.set('.sb-data-annotation', {opacity:0, height:0});
	TweenMax.set('.sb-data-key-item', {opacity:0});
}

StoryBox.Module.IotBarchart.prototype.animate = function(instance) {
	var bars = instance.getElementsByClassName('sb-data-bar');
	var annotations = instance.getElementsByClassName('sb-data-annotation');
	var keys = instance.getElementsByClassName('sb-data-key-item');
	for (var i = 0; i < this.data.heights.length; i++) {
		var bar = bars[i];
		var annotation = annotations[i];
		var key = keys[i];
		var height = this.data.heights[i]+'%';
		var delay = 0.3*i;
		TweenMax.to(bar, 0.5, {height:height, delay:delay});
		TweenMax.to(annotation, 0.5, {opacity:1, height:height, delay:delay});
		TweenMax.to(key, 0.5, {opacity:1, delay:delay});
	}
}