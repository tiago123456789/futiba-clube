class ComentarioService {

    constructor(dao) {
        this._dao = dao;
    }

    save(comentario) {
        this._dao.save(comentario);
    }

    async findAll() {
        return await this._dao.findAll();
    }
}

module.exports = ComentarioService;