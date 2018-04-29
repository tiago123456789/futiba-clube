const DAO = require("./../dao/DAO");

class AdivinhacaoDAO extends DAO {

    constructor() {
        super("guessings");
    }

    getColumnsSave() {
        return ["result_a", "result_b", "score", "game_id", "group_id", "user_id"];
    }

    getColumnsUpdate() {
        return ["result_a", "result_b", "score", "game_id", "group_id", "user_id"];
    }

}

module.exports = AdivinhacaoDAO;