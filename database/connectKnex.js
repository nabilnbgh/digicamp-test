const knex = require('knex');
//using knex to connect to sqlite3 database
const connectKnex = knex(
    {
        client : "sqlite3",
        connection:{
            filename : "task.db"
        }
    }
);

module.exports = connectKnex;