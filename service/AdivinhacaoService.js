class AdivinhacaoService {

    constructor(adivinhacaoDao) {
        this._adivinhacaoDao = adivinhacaoDao;
    }

    async findByIdGameAndIdUser(idGame, idUser) {
        return await this._adivinhacaoDao.findByIdGameAndIdUser(idGame, idUser);
    }

    save(adivinhacao) {
        this._adivinhacaoDao.save(adivinhacao);
    }
}

module.exports = AdivinhacaoService;