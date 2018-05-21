const MESSAGES_APP = require("./../lib/MessagesApp");

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
        const newGame = request.body;
        try {
            this.validationForm(request, ["team_a", "team_b"], (error, fieldInformated) => {
                response.render("games", { error: error, ...fieldInformated, games: [ newGame ] });
            });
            await this._gameService.save(newGame);
            response.redirect("/admin/games");
        } catch(e) {
            response.render("games", { error:[{ msg: e.message }], ...newGame, games: [ newGame ]});
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

    validationForm(request, fieldValidated, callbackInformationInvalid) {
        if (fieldValidated.includes("team_a")) {
            request
                .checkBody("team_a", `Time A ${MESSAGES_APP.MINIMO_3_CARACTERES}`)
                .isLength({ min: 3 });            
        }
        
        if (fieldValidated.includes("team_b")) {
            request
                .checkBody("team_b", `Time B ${MESSAGES_APP.MINIMO_3_CARACTERES}`)
                .isLength({ min: 3 });             
        }

        const errors = request.validationErrors();

        if (errors) {
            callbackInformationInvalid(errors, request.body);
        }
    }
}

module.exports = GameController;