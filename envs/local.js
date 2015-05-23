var services = {
	auth: {
		domain: 'local-auth.hearthstone.gg',
		serviceAddress: 'http://localhost:3002',
		name: 'auth',
		https: true,
		redirectTo: 'https://localhost:3004'
	},
	api: {
		domain: 'local-api.hearthstone.gg',
		serviceAddress: 'http://localhost:3000',
		name: 'api'
	},
	socket: {
		domain: 'local-socket.hearthstone.gg',
		serviceAddress: 'http://localhost:3003',
		name: 'socket',
		proxySocket: true
	},
	app: {
		domain: 'local-app.hearthstone.gg',
		serviceAddress: 'http://localhost:3001',
		name: 'app'
	}
};

module.exports = {
	services: services,
	cert: cert,
	findByDomain: findByDomain
};