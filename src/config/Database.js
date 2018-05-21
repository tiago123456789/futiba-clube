const mysql = require("mysql2/promise");
require("./LoaderConfiguration");

let connection = null;

const getConnection = async () => {
    if (connection == null) {
        connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
    }

    return connection;
};


module.exports = getConnection;