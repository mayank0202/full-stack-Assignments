var Pg = require('pg').Pool;
var pg = new Pg({
    user: 'mayankdb',
    host: 'localhost',
    database: 'api',
    password: 'mayank',
    port: 5432
});
module.exports = pg;

