const DAO = require("./DAO");

class ComentarioDAO extends DAO {

    constructor() {
        super("comments");
    }

    getColumnsSave() {
        return ["comments", "user_id", "guessings_id"];
    }

}

module.exports = ComentarioDAO;