const DAO = require("./DAO");

class UserDao extends DAO {

    constructor() {
        super("users");
    }
    
    getColumnsSave() {
        return ["name", "email", "senha", "role"];
    }

    getColumnsUpdate() {
        return ["name", "email", "senha", "role"];
    }

}