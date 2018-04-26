const DAO = require("./DAO");

class GrupoDAO extends DAO {

    constructor() {
        super("groups");
    }

    getColumnsSave() {
        return ["name"];
    }

    getColumnsUpdate() {
        return ["name"];
    }

}

module.exports = GrupoDAO;