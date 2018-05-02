class GameController {

    constructor(gameService) {
        this._gameService = gameService;
        this.index = this.index.bind(this);
        this.save = this.save.bind(this);
        this.saveResultGame = this.saveResultGame.bind(this);
        this.delete = this.delete.bind(this);
    }

    async index(request, response) {
        const games = await this._gameService.findAll();
        response.render("games", { error: "", games })
    }

    async save(request, response) {
        try {
            const newGame = request.body;
            await this._gameService.save(newGame);
            response.redirect("/admin/games");
        } catch(e) {
            response.render("games", { error: e.message })
        }
    }

    async saveResultGame(request, response) {
        try {
            const game = request.body;
            await this._gameService.update(game, game.id);
            response.redirect("/admin/games");
        } catch(e) {
            response.render("games", { error: e.message })
        }
    }

    async delete(request, response) {
        const id = request.params.id;
        await this._gameService.delete(id);
        response.redirect("/admin/games");
    }
}

module.exports = GameController;