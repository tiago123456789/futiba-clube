const DAO = require("./DAO");

class ComentarioDAO extends DAO {

    constructor() {
        super("comments");
    }

    async findAll() {
        const connection = await this.getConexao();
        return this.extractRegisterQuery(await connection.execute(`
        SELECT comment.comments, user.name FROM comments AS comment INNER JOIN users AS user ON 
        comment.user_id = user.id`));
    }

    getColumnsSave() {
        return ["comments", "user_id", "guessing_id"];
    }

}

module.exports = ComentarioDAO;