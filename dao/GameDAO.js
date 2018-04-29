const DAO = require("./DAO");

class GameDAO extends DAO {

    constructor() {
        super("games");
    }

    getColumnsSave() {
        return ["team_a", "team_b"];
    }

    getColumnsUpdate() {
        return ["result_a", "result_b"];
    }

}

module.exports = GameDAO;