class GameService {

    constructor(gameDao) {
        this._gameDao = gameDao;
    }

    async findAll() {
        return await this._gameDao.findAll();
    }

    update(game, id) {
        this._gameDao.update(game, id);
    }

    save(game) {
        this._gameDao.save(game);
    }

    delete(id) {
        this._gameDao.delete(id);
    }
}

module.exports = GameService;