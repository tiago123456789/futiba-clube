const ConnectionFactory = require("./ConnectionFactory");

function UserDao() {
    const conexao = null;

    const initialize = async () => {
        conexao = await ConnectionFactory.getConexao();
    };

    const extractRegisterQuery = (query) => {
        const [rows, fields] = query;
        return rows;
    }

    this.searchSpecifiedUserPerEmail = async (email) => {
        const registers = extractRegisterQuery(
                                    await conexao.execute("SELECT * FROM users WHERE email = ?", [email]));

        return registers;
    };

    this.create = async (newAccount) => {
        return await conexao.execute("INSERT INTO users(name, email, password, role) VALUES(?, ?, ?, ?)",
            [newAccount.name, newAccount.email, newAccount.password, "ROOT"])
    }

    initialize();
}