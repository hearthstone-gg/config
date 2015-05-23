var fs = require('fs');
var path = require('path');

function get(env) {
	if (!env) { env = 'local'; }

	var cert = {
		key: fs.readFileSync(path.join(__dirname, './sslcert/' + env + '.key'), 'utf8'),
		cert: fs.readFileSync(path.join(__dirname, './sslcert/' + env + '.cert'), 'utf8')
	};
	var services = require('./env/' + env);

	function findByDomain(domain) {
		var service;
		for (service in services) {
			if (services.hasOwnProperty(service) && services[service].domain === domain) {
				return services[service];
			}
		}
		return false;
	}

	return {
		services: services,
		cert: cert,
		findByDomain: findByDomain
	};
}

module.exports = {
	get: get
};