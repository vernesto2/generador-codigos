require('dotenv/config')

const usr = {
	development	: "root",
	production	: "root",
	test		: "root"
}

const pwd = {
	development	: "MySQLAdmin2020",
	production	: "MySQLAdmin2021",
	test		: "MySQLAdmin2020"
}

const dbn = {
	development	: "carxi_db",
	production	: "carxi_db",
	test		: "carxi_db"
}

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
	type		: 'mysql',
	host		: 'localhost',
	port		: 3306,
	username	: usr[process.env.NODE_ENV],
	password	: pwd[process.env.NODE_ENV],
	database	: dbn[process.env.NODE_ENV],
	synchronize	: false,
	logging		: false,
	entities	: [ isDevelopment ? `src/entities/**/*.ts` : `dist/entities/**/*.js` ],
	migrations	: [ "src/migration/**/*.ts" ],
	subscribers	: [ "src/subscriber/**/*.ts" ],
	cli			: {
		entitiesDir		: "src/entities",
		migrationsDir	: "src/migration",
		subscribersDir	: "src/subscriber"
	}
}