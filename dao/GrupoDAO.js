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

    async getClassification() {
        const connection = await this.getConexao();
        return this.extractRegisterQuery(
            await connection.execute(`SELECT g.id, g.name, 
            (SELECT SUM(score) FROM guessings as guess WHERE guess.group_id = g.id) as score
            FROM groups AS g order by score`));
    }

    getColumnsSave() {
        return ["name"];
    }

    getColumnsUpdate() {
        return ["name"];
    }

}

module.exports = GrupoDAO;