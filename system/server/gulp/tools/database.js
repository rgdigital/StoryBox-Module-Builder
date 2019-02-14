module.exports = {
	path : './application/database/',
	connect : function() {
		var fs = require("fs");
		return JSON.parse(fs.readFileSync(this.path+'config.json'));
	},
	update : function(key, value, completeMessage) {
		var fs = require("fs");
		var tools = require('../tools/tools');
		var db = this.connect();
		db[key] = value;
		var json = JSON.stringify(db);
		fs.writeFile(this.path+'config.json', json, 'utf8', function() {
			tools.log(completeMessage);
		});
	},
	add : function(key, value, completeMessage) {
		var fs = require("fs");
		var tools = require('../tools/tools');
		var db = this.connect();
		db[key] = value;
		var json = JSON.stringify(db);
		fs.writeFile(this.path+'config.json', json, 'utf8', function() {
			tools.log(completeMessage);
		});	
	},
	addTheme : function(themeName) {
		var tools = require('../tools/tools');
		var db = this.connect();
		var obj = db.theme;
		if (obj.themes.indexOf(themeName) > -1) {
			// Theme exists
			tools.log('Theme exists: '+themeName);
		} else {
			// New theme
			obj.themes = themeName;
			this.update('theme', obj, 'Theme added: '+themeName);
		}
	}
};