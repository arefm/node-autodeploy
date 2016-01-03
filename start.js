'use strict';

const Configs = require('node-configloader').setPath(__dirname + '/configs').setEnv(process.env.NODE_ENV || 'production'),
	Http = require('http'),
	Util = require('util');

class AutoDeploy {

	constructor() {
		this.connect((message) => {
			Util.log(message);
		});
	}

	connect(cb) {
		Http.createServer((request, response) => {
			response.status = this.status.bind({response:response});
			response.send = this.send.bind({response:response});
			response.json = this.json.bind({response:response});
			this.route(request, response);
		}).listen(Configs.get('app.server.port', 'app.server.host'), function(){
			cb(`App is running on ${Configs.get('app.server.host')}:${Configs.get('app.server.port')}`);
		});
	}

	route(req, res) {
		let route = Configs.get('routes.' + req.url + '.' + req.method.toLowerCase());
		let ctrl = require(__dirname + '/controllers/' + route.controller);
		let runCtrl = new ctrl(req, res);
	}

	status(code, message) {
		this.response.statusCode = code;
		if (message) 
			this.response.statusMessage = message;
		return this.response;
	}

	send(str, statusCode, statusMessage) {
		this.response.setHeader('Content-Type', 'text/html');
		if (statusCode) {
			this.response.statusCode = statusCode;
			if (statusMessage) 
				this.response.statusMessage = statusMessage;
		}
		this.response.end(str);
	}

	json(obj, statusCode, statusMessage) {
		this.response.setHeader('Content-Type', 'application/json');
		if (statusCode) {
			this.response.statusCode = statusCode;
			if (statusMessage) 
				this.response.statusMessage = statusMessage;
		}
		this.response.end(JSON.stringify(obj));
	}
}

const run = new AutoDeploy();