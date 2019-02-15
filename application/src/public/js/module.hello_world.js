StoryBox.Module.Hello_World = function(options) {

	var self = this;

	this.Viewport = this.Helpers.Viewport;

	// Get em
	this.instances = this.getInstances();

	// Do nowt?
	// if (this.instances.length == 0) return;

}

StoryBox.Module.Hello_World.prototype.getInstances = function() {
	console.log('Hello World');
}