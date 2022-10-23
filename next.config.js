module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	apps: [
		{
			script: 'node_modules/next/dist/bin/next',
			args: 'start',
			exec_mode: 'cluster'
		}
	],
	images: {
		domains: [
			'electrasharing.shop',
			'api.77.222.42.224.nip.io',
			'www.electrasharing.shop',
			'www.api.77.222.42.224.nip.io',
			'localhost',
			'127.0.0.1',
		]
	}
};
