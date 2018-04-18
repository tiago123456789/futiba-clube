const mysql = require("mysql2/promise");
let connection = null;

const getConnection = async () => {
    if (connection == null) {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "futiba_clube"
        });
    }

    return connection;
};


module.exports = getConnection;