const connectionDB = require("./../config/Database");

class DAO {
    
    constructor(table) {
        this.table = table;
    }

    async getConexao() {
        return await connectionDB();
    }

    async save(newContent) {
        const connection = await this.getConexao();
        const paramValuePreparedStatement = this.getColumnsSave().map(() => "?").join(", ");
        const valuesInReplaceNamedParameters = this.getColumnsSave()
                                                    .map((itens) => newContent[itens])
                                                    .filter(itens => (itens != null || itens != undefined));
        return await connection
                .execute(
                    `INSERT INTO ${this.table}(${this.getColumnsSave().join(",")}) VALUES(${paramValuePreparedStatement})`,
                    valuesInReplaceNamedParameters
                );
    }

    async findAll() {
        const connection = await this.getConexao();
        return this.extractRegisterQuery(await connection.execute(`SELECT * FROM ${this.table}`));
    }

    async findById(id) {
        const connection = await this.getConexao();
        return this.extractRegisterQuery(await connection.execute(`SELECT * FROM ${this.table} WHERE id = ?`, [id])); 
    }

    async delete(id) {
        const connection = await this.getConexao();
        await connection.execute(`DELETE FROM ${this.table} WHERE id = ?`, [id]);   
    }

    async update(contentModified, id) {
        const connection = await this.getConexao();
        const columnsUpdatedPreparedStatement = (this.getColumnsUpdate().join("= ?, ")).concat("= ?");
        const valuesInReplaceNamedParameters = this.getColumnsUpdate()
                                                    .map((itens) => contentModified[itens])
                                                    .filter(itens => (itens != null || itens != undefined))

        await connection
                .execute(
                    `UPDATE ${this.table} SET ${columnsUpdatedPreparedStatement} WHERE id = ? `,
                    [ ...valuesInReplaceNamedParameters, id]
                );
    }

    getColumnsSave() {}

    getColumnsUpdate() {}

    extractRegisterQuery(query) {
        const [rows, fields] = query;
        return rows;
    }
}

module.exports = DAO;