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

function sanitize(servicesConfig) {
	var sanitized = {};
	for (var service in servicesConfig.services) {
		if (servicesConfig.services.hasOwnProperty(service)) {
			sanitized[service] = {
				domain: servicesConfig.services[service].domain,
				name: servicesConfig.services[service].name
			};
		}
	}
	console.log(sanitized);
	return sanitized;
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
		findByDomain: function(domain) { return findByDomain(services, domain); },
		sanitize: sanitize
	};
}

module.exports = {
	get: get,
	sanitize: sanitize
};