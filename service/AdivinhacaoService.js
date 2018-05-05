class AdivinhacaoService {

    constructor(adivinhacaoDao) {
        this._adivinhacaoDao = adivinhacaoDao;
    }

    async findByIdGameAndIdUserAndIdGroup(idGame, idUser, idGroup) {
        return await this._adivinhacaoDao.findByIdGameAndIdUserAndIdGroup(idGame, idUser, idGroup);
    }

    save(adivinhacao) {
        this._adivinhacaoDao.save(adivinhacao);
    }
}

module.exports = AdivinhacaoService;