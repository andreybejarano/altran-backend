module.exports = {
	endpoints: {
		users: 'http://www.mocky.io/v2/5808862710000087232b75ac',
		policies: 'http://www.mocky.io/v2/580891a4100000e8242b75c5'
	},
	port: 5000,
	secret: process.env.API_SECRET || '4ndr3ys3cr3t',
	permissions: {
		admin: ['users', 'policies'],
		user: ['users']
	}
};
