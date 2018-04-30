class AdivinhacaoService {

    constructor(adivinhacaoDao) {
        this._adivinhacaoDao = adivinhacaoDao;
    }

    async findByIdGameAndIdUser() {
        return await this._adivinhacaoDao.findByIdGameAndIdUser();
    }
}

module.exports = AdivinhacaoService;