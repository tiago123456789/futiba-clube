const DAO = require("./../dao/DAO");

class AdivinhacaoDAO extends DAO {

    constructor() {
        super("guessings");
    }

    async findByIdGameAndIdUser(idGame, idUser) {
        const connection = await this.getConexao();
        return this.extractRegisterQuery(
            await connection.execute(
                `SELECT * FROM ${this.table} WHERE game_id = ? AND user_id = ? `,
                [idGame, idUser]
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