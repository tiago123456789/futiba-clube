const DAO = require("./DAO");

class GameDao extends DAO {

    constructor() {
        super("games");
    }

    getColumnsSave() {
        return ["team_a", "team_b"];
    }

    getColumnsUpdate() {
        return ["team_a", "team_b"];
    }

}

module.exports = GameDao;