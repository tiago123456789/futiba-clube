const MESSAGES_APP = require("./../lib/MessagesApp");
const Encode = require("./../lib/Encode");

class UserService {

    constructor(userDao) {
        this._userDao = userDao;
    }

    async create(account) {
        account.role = "USER";
        const user = await this.searchUserPerEmail(account.email);
        if (user.length > 0) {
            throw new Error(MESSAGES_APP.EMAIL_SENDO_USADO);
        }
        account.password = await Encode.getHash(account.password);
        await this._userDao.save(account);
    }

    async authenticate(credenciais) {
        const user = await this.searchUserPerEmail(credenciais.email);
        const passwordValid = await this._isPasswordValid(credenciais.password, user[0].password);
        if (user.length > 0 && passwordValid) {
            user[0].password = "";
            return user[0];
        }

        throw new Error(MESSAGES_APP.EMAIL_SENHA_INVALIDOS);
    }

    async searchUserPerEmail(email) {
        return await this._userDao.searchUserPerEmail(email);
    }

    async _isPasswordValid(password, passwordHash) {
        return await Encode.compare(passwordHash, password);
    }

}

module.exports = UserService;