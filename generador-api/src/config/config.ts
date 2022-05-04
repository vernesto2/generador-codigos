export default { jwtSecret: 'rfRU9LNkLw5pswL4xRdjjLYwd6bFLFfqPn3jwab8BbYHBSDdyTWTryJGrqn4T9nmhtGFbuAePFrprBP4fPzzVvDkutW9WtPvpmBa8J7ZxTRJEyPKpue4saYvgbSPccXG' };  

export function random(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export const CONFIG = {
	MSSQL: {
	  user: 'sa',
	  password: '@dminDB.2021',
	  database: 'SivetWeb',
	  server: '51.51.51.3',
	  port: 1443,
	  pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000
	  },
	  options: {
		encrypt: false, // for azure
		trustServerCertificate: false, // change to true for local dev / self-signed certs
		enableArithAbort: false
	  }
	},
	SECRET_TOKEN: 'In4bv32021'
  };
  