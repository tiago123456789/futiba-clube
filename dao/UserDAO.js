const DAO = require("./DAO");

class UserDao extends DAO {

    constructor() {
        super("users");
    }

    async searchUserPerEmail(email) {
        const connection = await this.getConexao();
        return this.extractRegisterQuery(await connection.execute("SELECT * FROM users WHERE email = ?", [email]))
    }

    getColumnsSave() {
        return ["name", "email", "password", "role"];
    }

    getColumnsUpdate() {
        return ["name", "email", "password", "role"];
    }

}

module.exports = UserDao;