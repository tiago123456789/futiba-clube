const DAO = require("./DAO");

class GrupoDAO extends DAO {

    constructor() {
        super("groups");
    }

    async findByName(name) {
        const connection = await this.getConexao();
        return this.extractRegisterQuery(
            await connection.execute(`SELECT * FROM ${this.table} WHERE name = ?`, [name])
        );
    }

    getColumnsSave() {
        return ["name"];
    }

    getColumnsUpdate() {
        return ["name"];
    }

}

module.exports = GrupoDAO;