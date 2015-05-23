var fs = require('fs');
var path = require('path');

function findByDomain(services, domain) {
	var service;
	for (service in services) {
		if (services.hasOwnProperty(service) && services[service].domain === domain) {
			return services[service];
		}
	}
	return false;
}

function get(env) {
	if (!env) { env = 'local'; }

	var services = require('./envs/' + env + ".json");

	var cert = {
		key: fs.readFileSync(path.join(__dirname, './sslcert/' + services.key), 'utf8'),
		cert: fs.readFileSync(path.join(__dirname, './sslcert/' + services.cert), 'utf8')
	};

	return {
		services: services,
		cert: cert,
		findByDomain: function(domain) { return findByDomain(services, domain); }
	};
}

module.exports = {
	get: get
};