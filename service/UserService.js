const MESSAGES_APP = require("./../lib/MessagesApp");

class UserService {

    constructor(userDao) {
        this._userDao = userDao;
    }

    async create(account) {

    }

    async authenticate(credenciais) {
        const user = await this.searchUserPerEmail(credenciais.email);
        if (user.length > 0) {
            user[0].password = "";
            return user[0];
        }

        throw new Error(MESSAGES_APP.EMAIL_SENHA_INVALIDOS);
    }

    async searchUserPerEmail(email) {
        return await this._userDao.searchUserPerEmail(email);
    }

}

module.exports = UserService;