StoryBox.Module.ConnrevMap = function() {

	var self = this;

	this.Viewport = this.Helpers.Viewport;

	// Get em
	this.instances = this.getInstances();

	// Default tooltip category switch (0 or 1)
	this.activeCat = 1;

	// Do nowt?
	if (this.instances.length == 0) return;

	for (var i = 0; i < this.instances.length; i++) {
		// Go go go
		this.createInstances(this.instances[i]);
		// Anim defaults
		this.setDefault(this.instances[i]);
	}

};

StoryBox.Module.ConnrevMap.prototype.images = {
	map_connections : 'https://res.cloudinary.com/rgdigital/image/upload/v1547330498/StoryBox/modules/connrev_map/im_map.jpg',
	map_revenue : 'https://res.cloudinary.com/rgdigital/image/upload/v1548423584/StoryBox/modules/connrev_map/im_map_purple.jpg',
	icon_connections : 'https://res.cloudinary.com/rgdigital/image/upload/v1547330927/StoryBox/modules/connrev_map/im_map_title_icon_connections.png',
	icon_revenue : 'https://res.cloudinary.com/rgdigital/image/upload/v1547994918/StoryBox/modules/connrev_map/im_map_title_icon_revenue.jpg',
	title_connections : 'https://res.cloudinary.com/rgdigital/image/upload/v1549373058/StoryBox/modules/connrev_map/im_map_title_connections.jpg',
	title_revenue : 'https://res.cloudinary.com/rgdigital/image/upload/v1547994919/StoryBox/modules/connrev_map/im_map_title_revenue.jpg',
	'nav_link nav_connections' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548439084/StoryBox/modules/connrev_map/im_map_nav_connections.png',
	'nav_link nav_revenue' : 'https://res.cloudinary.com/rgdigital/image/upload/v1548439095/StoryBox/modules/connrev_map/im_map_nav_revenue.png',
}

StoryBox.Module.ConnrevMap.prototype.text = {
	caption : 'Source: GSMA Intelligence'
}

StoryBox.Module.ConnrevMap.prototype.tooltips = {
	connections  : {
		north_america : { x:19, y:49, title:'North America', subtitle:'5.9 billion' },
		europe : { x:55, y:42, title:'Europe', subtitle:'4.9 billion' },
		cis : { x:67, y:53, title:'CIS', subtitle:'0.7 billion' },
		latin_america : { x:29, y:73, title:'Latin America', subtitle:'1.3 billion' },
		middle_east : { x:47, y:59, title:'Middle East<br>& Africa', subtitle:'1.1 billion' },
		sub_sahara : { x:51, y:75, title:'Sub-Saharan<br>Africa', subtitle:'0.3 billion' },
		asia : { x:76, y:66, title:'Asia-Pacific', subtitle:'11 billion' }
	},
	revenue  : {
		north_america : { x:19, y:49, title:'North America', subtitle:'$337 billion' },
		europe : { x:55, y:42, title:'Europe', subtitle:'$242 billion' },
		cis : { x:67, y:53, title:'CIS', subtitle:'$26 billion' },
		latin_america : { x:29, y:73, title:'Latin America', subtitle:'$47 billion' },
		middle_east : { x:47, y:59, title:'Middle East<br>& Africa', subtitle:'$55 billion' },
		sub_sahara : { x:51, y:75, title:'Sub-Saharan<br>Africa', subtitle:'$12 billion' },
		asia : { x:76, y:66, title:'Asia-Pacific', subtitle:'$386 billion' }
	}
}

StoryBox.Module.ConnrevMap.prototype.onScroll = function() {
	for (var key in this.instances) {
		var element = this.instances[key];
		this.scrollCheck(element);
	}
}

StoryBox.Module.ConnrevMap.prototype.getInstances = function() {
	return document.getElementsByClassName('sb-connrev_map');
}

StoryBox.Module.ConnrevMap.prototype.scrollCheck = function(element) {
	var self = this;
	var select = this.HTML;
	var animated = false;
	var isVisible = this.Viewport.inView(element, 80);
	if (isVisible && !animated) {
		animated = true;
		var hasClass = select.hasClass(element, 'shown');
		if (!hasClass) {
			select.addClass(element, 'shown');
			if (self.activeCat==0) {
				self.showRevenue(element, function() {
					self.activeCat = self.activeCat==0 ? 1 : 0;
					running = false;
				});
			} else {
				self.showConnections(element, function() {
					self.activeCat = self.activeCat==0 ? 1 : 0;
					running = false;
				});
			}
		}
	}
}

StoryBox.Module.ConnrevMap.prototype.createInstances = function(instance) {
	this.addImages(instance);
	this.addCaption(instance);
	this.addTooltips(instance);
	this.navListener(instance);
}

StoryBox.Module.ConnrevMap.prototype.addImages = function(instance) {
	for (key in this.images) {
		var url = this.images[key];
		this.createImage(key, url, '', instance);
	}
}

StoryBox.Module.ConnrevMap.prototype.createImage = function(key, url, className, append) {
	var img = document.createElement('img');
	img.className = (className ? className : '') + ' ' + 'sb-image ' + key;
	img.src = url;
	var parent = append ? append : this.stage;
	parent.appendChild(img);
}

StoryBox.Module.ConnrevMap.prototype.addTooltips = function(instance) {
	var wrapper = document.createElement('div');
	wrapper.className = "tooltip-container";
	for (var key in this.tooltips) {
		var category_data = this.tooltips[key];
		var category_name = key;
		for (var key in category_data) {
			var data = category_data[key];
			this.createTooltip(wrapper, data.x, data.y, key, category_name, data.title, data.subtitle);
		}
	}
	instance.appendChild(wrapper);
}

StoryBox.Module.ConnrevMap.prototype.addCaption = function(appendTo) {
	var html = '<div class="sb-caption">' +
				'<p>'+this.text.caption+'</p>' +
				'</div>';
	appendTo.innerHTML += html;

}

StoryBox.Module.ConnrevMap.prototype.createTooltip = function(appendTo, x, y, point_name, category, title, subtitle) {
	var html = 	'<div class="tooltip cat-'+category+' tooltip-'+point_name+'" style="left:'+x+'%; top:'+y+'%;">' +
				'<div class="tooltip-content-wrapper">' +
				'<div class="tooltip-content">' +
				'<p class="headline">'+title+'</p>' +
				'<p class="subtitle">'+subtitle+'</p>' +
				'</div>' +
				'<div class="arrow"></div>' +
				'</div>' +
				'</div>';
	var cache = document.createElement('div');
	cache.innerHTML = html;
	appendTo.appendChild(cache.firstChild);
}

StoryBox.Module.ConnrevMap.prototype.navListener = function(instance) {

	var self = this;

	var navButtons = instance.getElementsByClassName('nav_link');

	for (var i = 0; i < navButtons.length; i++) {
		click(navButtons[i]);
	}

	function click(button) {
		var running = false;
		button.addEventListener('click', function(e) {
			e.preventDefault();
			if (running) return;
			running = true;
			
			if (self.activeCat==0) {
				self.showRevenue(instance, function() {
					self.activeCat = self.activeCat==0 ? 1 : 0;
					running = false;
				});
			} else {
				self.showConnections(instance, function() {
					self.activeCat = self.activeCat==0 ? 1 : 0;
					running = false;
				});
			}

		})
	}
}

StoryBox.Module.ConnrevMap.prototype.setDefault = function(instance) {

	var icon_revenue = instance.getElementsByClassName('icon_revenue');
	var icon_connections = instance.getElementsByClassName('icon_connections');
	var title_revenue = instance.getElementsByClassName('title_revenue');
	var title_connections = instance.getElementsByClassName('title_connections');
	var tooltips_connections = instance.getElementsByClassName('cat-connections');
	var tooltips_revenue = instance.getElementsByClassName('cat-revenue');
	var map_connections = instance.getElementsByClassName('map_connections');
	var map_revenue = instance.getElementsByClassName('map_revenue');
	var navButtons = instance.getElementsByClassName('nav_link');

	TweenMax.set([tooltips_connections, tooltips_revenue], {opacity:0, scale:0.2});

	if (this.activeCat==0) {
		// Revenue
		TweenMax.set(map_connections, {opacity:0});
		TweenMax.set(icon_revenue, {opacity:0, rotationY:'-=180'});
		TweenMax.set(icon_connections, {opacity:0, rotationY:'+=180'});
	} else {
		// Connections
		TweenMax.set(map_revenue, {opacity:0});
		TweenMax.set(icon_revenue, {opacity:0, rotationY:'+=180'});
		TweenMax.set(icon_connections, {opacity:0, rotationY:'-=180'});
	}
}

StoryBox.Module.ConnrevMap.prototype.showRevenue = function(instance, callback) {
	
	var icon_revenue = instance.getElementsByClassName('icon_revenue');
	var icon_connections = instance.getElementsByClassName('icon_connections');
	var title_revenue = instance.getElementsByClassName('title_revenue');
	var title_connections = instance.getElementsByClassName('title_connections');
	var tooltips_connections = instance.getElementsByClassName('cat-connections');
	var tooltips_revenue = instance.getElementsByClassName('cat-revenue');
	var map_connections = instance.getElementsByClassName('map_connections');
	var map_revenue = instance.getElementsByClassName('map_revenue');
	var navButtons = instance.getElementsByClassName('nav_link');

	// Map
	TweenMax.to(map_revenue, 0.5, {opacity:1});
	TweenMax.to(map_connections, 0.5, {opacity:0});

	// Title icon
	TweenMax.to(icon_revenue, 0.5, {opacity:1, rotationY:'+=180'});
	TweenMax.to(icon_connections, 0.5, {opacity:0, rotationY:'-=180'});

	// Titles
	TweenMax.to(title_revenue, 0.5, {opacity:1});
	TweenMax.to(title_connections, 0.5, {opacity:0});

	// Tooltips
	TweenMax.staggerTo(tooltips_revenue, 0.2, {scale:1, opacity:0.8, ease:Linear.easeNone}, 0.1, callback)
	TweenMax.to(tooltips_connections, 0.2, {scale:0.2, opacity:0, ease:Linear.easeNone})

	// Nav
	TweenMax.to(navButtons[1], 0.5, {opacity:1, rotationY:'-=180'});
	TweenMax.to(navButtons[0], 0.5, {opacity:0, rotationY:'+=180'});
}

StoryBox.Module.ConnrevMap.prototype.showConnections = function(instance, callback) {
	
	var icon_revenue = instance.getElementsByClassName('icon_revenue');
	var icon_connections = instance.getElementsByClassName('icon_connections');
	var title_revenue = instance.getElementsByClassName('title_revenue');
	var title_connections = instance.getElementsByClassName('title_connections');
	var tooltips_connections = instance.getElementsByClassName('cat-connections');
	var tooltips_revenue = instance.getElementsByClassName('cat-revenue');
	var map_connections = instance.getElementsByClassName('map_connections');
	var map_revenue = instance.getElementsByClassName('map_revenue');
	var navButtons = instance.getElementsByClassName('nav_link');

	// Map
	TweenMax.to(map_connections, 0.5, {opacity:1});
	TweenMax.to(map_revenue, 0.5, {opacity:0});

	// Title icons
	TweenMax.to(icon_revenue, 0.5, {opacity:0, rotationY:'-=180'});
	TweenMax.to(icon_connections, 0.5, {opacity:1, rotationY:'-=180'});

	// Titles
	TweenMax.to(title_revenue, 0.5, {opacity:0});
	TweenMax.to(title_connections, 0.5, {opacity:1});

	// Tooltips
	TweenMax.staggerTo(tooltips_connections, 0.2, {scale:1, opacity:0.8, ease:Linear.easeNone}, 0.1, callback)
	TweenMax.to(tooltips_revenue, 0.2, {scale:0.2, opacity:0, ease:Linear.easeNone})

	// Nav
	TweenMax.to(navButtons[0], 0.5, {opacity:1, rotationY:'-=180'});
	TweenMax.to(navButtons[1], 0.5, {opacity:0, rotationY:'+=180'});
}