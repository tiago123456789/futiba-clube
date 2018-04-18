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
        return ["name", "email", "senha", "role"];
    }

    getColumnsUpdate() {
        return ["name", "email", "senha", "role"];
    }

}

module.exports = UserDao;