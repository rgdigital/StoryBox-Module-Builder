StoryBox.Module.InnoCity = function(options) {
	
	var self = this;

	this.Viewport = this.Helpers.Viewport;

	this.triggered = false;

	// Get em
	this.instances = this.getInstances();

	// Do nowt?
	if (this.instances.length == 0) return;

	// Go go go
	this.stage = this.createInstances();

	this.setDefault();
}

StoryBox.Module.InnoCity.prototype.images = {
	// template : 'https://res.cloudinary.com/rgdigital/image/upload/v1548713804/StoryBox/modules/innovation_city/template.jpg',
	bg : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712596/StoryBox/modules/innovation_city/im_bg.jpg',
	title : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712597/StoryBox/modules/innovation_city/im_inno_city_title.png',
	drone : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712717/StoryBox/modules/innovation_city/im_drone.png',
	'building building_01' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712596/StoryBox/modules/innovation_city/im_inno_city_building_01.png',
	'building building_02' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712596/StoryBox/modules/innovation_city/im_inno_city_building_02.png',
	'building building_03' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712596/StoryBox/modules/innovation_city/im_inno_city_building_03.png',
	'building building_04' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712596/StoryBox/modules/innovation_city/im_inno_city_building_04.png',
	'building building_05' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712596/StoryBox/modules/innovation_city/im_inno_city_building_05.png',
	'building building_06' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712596/StoryBox/modules/innovation_city/im_inno_city_building_06.png',
	'building building_07' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712596/StoryBox/modules/innovation_city/im_inno_city_building_07.png',
	'building building_08' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712597/StoryBox/modules/innovation_city/im_inno_city_building_08.png',
	'building building_09' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712597/StoryBox/modules/innovation_city/im_inno_city_building_09.png',
	'building building_10' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712597/StoryBox/modules/innovation_city/im_inno_city_building_10.png',
	'building building_11' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712597/StoryBox/modules/innovation_city/im_inno_city_building_11.png',
	'building building_12' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712597/StoryBox/modules/innovation_city/im_inno_city_building_12.png',
	'building building_13' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712597/StoryBox/modules/innovation_city/im_inno_city_building_13.png',
	'building building_14' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712597/StoryBox/modules/innovation_city/im_inno_city_building_14.png',
	'building building_15' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548712597/StoryBox/modules/innovation_city/im_inno_city_building_15.png',
	'building building_16' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548713047/StoryBox/modules/innovation_city/im_inno_city_building_16.png',
}

StoryBox.Module.InnoCity.prototype.selectors =  {
	buildings : '.building_01, .building_02, .building_03, .building_04, .building_05, .building_06, .building_07, .building_08, .building_09, .building_10, .building_11, .building_12, .building_13, .building_14, .building_15, .building_16',
	title : '.title',
	drone : '.drone',
	bg : '.bg'
}

StoryBox.Module.InnoCity.prototype.throwError = function(msg) {
	throw new Error('StoryBox: '+msg);
}

StoryBox.Module.InnoCity.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-innocity');
}

StoryBox.Module.InnoCity.prototype.onScroll = function(data) {
	// console.log(data)
	var self = this;
	for (var i = 0; i < this.instances.length; i++) {
		var element = this.instances[i];
		this.scrollCheck(element);
		this.parallax(element, data);
	}
}

StoryBox.Module.InnoCity.prototype.scrollCheck = function(element) {

	var isVisible = this.Viewport.inView(element, 80);
	if (isVisible && !this.triggered) {
		this.triggered = true;
		this.animate();
	}
}

StoryBox.Module.InnoCity.prototype.addImages = function() {
	var background = document.getElementsByClassName('background')[0];
	var foreground = document.getElementsByClassName('foreground')[0];
	for (key in this.images) {
		var url = this.images[key];
		this.createImage(key, url);
	}
}

StoryBox.Module.InnoCity.prototype.createImage = function(key, url, className, append) {
	var img = document.createElement('img');
	img.className = (className ? className : '') + ' ' + 'sb-image ' + key;
	img.src = url;
	var parent = append ? append : this.stage;
	parent.appendChild(img);
}

StoryBox.Module.InnoCity.prototype.createInstances = function() {
	this.stage = this.instances[0];
	this.addImages();
}

StoryBox.Module.InnoCity.prototype.setDefault = function() {
	var bg = this.selectors.bg;
	var drone = this.selectors.drone;
	var title = this.selectors.title;
	var buildings = this.selectors.buildings;

	// Anim defaults
	// TweenMax.set(bg, {top:'-10%', scale:1.2});
	TweenMax.set(drone, {top:'-10%', opacity:0.6});
	TweenMax.set(title, {top:'-10%', opacity:0.6});
	TweenMax.set(buildings, {rotationX:-90, opacity:0.6});
}

StoryBox.Module.InnoCity.prototype.animate = function() {

	var drone = this.selectors.drone;
	var title = this.selectors.title;
	var buildings = this.selectors.buildings;

	function hoverDrone() {
		new TimelineMax({ repeat: -1 })
			.to(drone, 1, {top:'20%', ease:Power1.easeInOut})
			.to(drone, 1, {top:'25%', ease:Power1.easeInOut})
	}

	// Anim timeline
	var tl = new TimelineLite();
	tl
		.staggerTo(buildings, 0.5, {rotationX:0, transformOrigin:"50% 100%", opacity:1, ease:Linear.easeNone}, 0.1)
		.to(title, 0.5, {top:'11%', opacity:1, ease:Power1.easeInOut})
		.to(drone, 1.5, {top:'25%', opacity:1, ease:Power1.easeInOut, onComplete : hoverDrone})


}

StoryBox.Module.InnoCity.prototype.parallax = function(instance, data) {

	var title = this.selectors.title;
	var buildings = this.selectors.buildings;
	var drone = this.selectors.drone;
	var bg = this.selectors.bg;
	var isVisible = this.Viewport.inView(instance);

	if (isVisible) {
		var scrollTop = this.Viewport.scrollTop();
		var winHeight = this.Viewport.Height();
		// var percentageVisible = this.Viewport.amountVisible(instance, true);

		var bgModifier = scrollTop * 0.02;
		var fgModifier = scrollTop * 0.1;

		// TweenMax.to([title, buildings, drone], 0.01, {top:fgModifier, ease:Power1.easeInOut});
		
		// TweenMax.to(bg, 0.01, {y:bgModifier, ease:Power1.easeInOut});
		// TweenMax.to([title, drone], 0.01, {y:fgModifier, ease:Power1.easeInOut});
	}

}