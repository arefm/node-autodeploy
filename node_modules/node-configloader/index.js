'use strict';

//load required modules
var fs = require('fs'),
	_  = require('lodash');

var CFGLoader = function () {
	
	var cls = {
		
		path: __dirname,

		configs: {},
		
		uiduser: process.env.USER || "root",
		
		env: process.env.NODE_ENV || 'production',

		__init: function() {
			//set env
			cls.env = ['production', 'development'].indexOf(cls.env) > -1 ? cls.env : "production";
			//load common config file
			cls.configs = JSON.parse(fs.readFileSync(cls.path + "/common.cfg.json"));
			//set uid user
			cls.configs['app']['user'] = cls.uiduser;
			//set env
			cls.configs['app']['env'] = cls.env;
			//load env config file
			var configFile = {};
			if (fs.existsSync(cls.path + "/" + cls.env + ".cfg.json")) {
				configFile = JSON.parse(fs.readFileSync(cls.path + "/" + cls.env + ".cfg.json"));
			}
			cls.configs = _.merge(cls.configs, configFile);
		},

		setPath: function(path) {
			if (fs.existsSync(path) + "/common.cfg.json") {
				cls.path = path;
				cls.__init();
			}
			return cls;
		},

		setEnv: function(env) {
			cls.env = env;
			cls.__init();
			return cls;
		},

		set: function(obj) {
			if (Object.keys(obj).length) {
				if (Object.keys(obj).indexOf('path') > -1) {
					if (fs.existsSync(obj.path) + "/common.cfg.json") {
						cls.path = obj.path;
					}
					delete obj.path;
				}
				if (_.result(obj, 'app.env')) {
					cls = cls.setEnv(_.result(obj, 'app.env'));
				}
				cls.configs = _.merge(cls.configs, obj);
			}
			return cls;
		},

		get: function(key) {
			return (!key) ? cls.configs : _.result(cls.configs, key);
		}
	}

	//load init
	cls.__init()
	return cls;
}

module.exports = new CFGLoader();