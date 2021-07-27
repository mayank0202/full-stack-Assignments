const Pg = require('pg').Pool;
const pg = new Pg({
  user: 'mayankdb',
  host: 'localhost',
  database: 'api',
  password: 'mayank',
  port: 5432,
})
module.exports = pg;
// credentials of database