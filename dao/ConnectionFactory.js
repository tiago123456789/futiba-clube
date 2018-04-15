const conexaoDB = require("./../config/Database");

class ConnectionFactory {

    async static getConexao() {
        return await conexaoDB;
    };
};

module.exports = ConnectionFactory;