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
		domains: ['www.electrasharing.shop', 'electrasharing.shop', 'localhost']
	}
};
