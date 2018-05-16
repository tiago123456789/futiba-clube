const DAO = require("./../dao/DAO");

class AdivinhacaoDAO extends DAO {

    constructor() {
        super("guessings");
    }

    async findByIdGameAndIdUserAndIdGroup(idGame, idUser, idGroup) {
        const connection = await this.getConexao();
        return this.extractRegisterQuery(
            await connection.execute(
                `SELECT * FROM ${this.table} WHERE game_id = ? AND user_id = ? AND group_id = ? `,
                [idGame, idUser, idGroup]
            )
        );
    }

    getColumnsSave() {
        return ["result_a", "result_b", "score", "game_id", "group_id", "user_id"];
    }

    getColumnsUpdate() {
        return ["result_a", "result_b", "score", "game_id", "group_id", "user_id"];
    }

}

module.exports = AdivinhacaoDAO;