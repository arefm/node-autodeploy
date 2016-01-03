**Node Configloader**
==================

Simple Node.js Configloader by Aref Mirhosseini

*github.com/arefm/node-configloader*

----------

How it Works
----------------

node-configloader works with 3 different config file (all in json format).
the **common.cfg.json** is the main one. **production.cfg.json** and **development.cfg.json** are other files which are required when application environment is set to *production* or *development*.
all these 3 files are placed into node-configloader directory but you can change path manually.

Install from NPM
--------------------
```
$ npm i node-configloader
```

How to use
-------------
```
var configs = require("node-configloader");
```

Get Configurations
----------------------
```
// all settings
var all = configs.get();

// only one object
var serverConfigs = configs.get("app.server");
```

Change Configuration Files Path
--------------------------------------
```
configs.setPath('/home/user/projects/files');
```

Change Application Environment
---------------------------------------
```
// development
configs.setEnv('development');

// production
configs.setEnv('production');
```

Set New Configurations
----------------------------
```
configs.set({
	app: {
		server: {
			port: 4000
		}
	}
});
```

*contact me:*
		*github: github.com/arefm/node-configloader*
	*email: code@arefmirhosseini.com*
	*url: arefmirhosseini.com*