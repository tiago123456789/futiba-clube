class GameService {

    constructor(gameService) {
        this._gameService = gameService;
    }

    async findAll() {
        return await this._gameService.findAll();
    }
}

module.exports = GameService;