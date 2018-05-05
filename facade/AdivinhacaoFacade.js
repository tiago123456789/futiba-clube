const GameDao = require("./../dao/GameDAO");
const GameService = require("./../service/GameService");
const AdivinhacaoDao = require("./../dao/AdivinhacaoDAO");
const AdivinhacaoService = require("./../service/AdivinhacaoService");
const ScoreService  = require("./../service/ScoreService");

class AdivinhacaoFacade {

    constructor() {
        const gameDao = new GameDao();
        const adivinhacaoDao = new AdivinhacaoDao();
        this._gameService = new GameService(gameDao);
        this._adivinhacaoService = new AdivinhacaoService(adivinhacaoDao);
    }

    async criarAdivinhacao(novaAdivinhacao, idUser) {
        try {
            const game = await this._gameService.findById(novaAdivinhacao.game);
            const score = this._getScore(game, novaAdivinhacao);
            this._adivinhacaoService.save({
                result_a: novaAdivinhacao.result_a,
                result_b: novaAdivinhacao.result_b,
                score: score,
                game_id: novaAdivinhacao.game,
                group_id: novaAdivinhacao.group,
                user_id: idUser
            });
        } catch(e) {
            console.log(e);
        }
    }

    _getScore(game, adivinhacao) {
        return ScoreService.getScore(
            { result_a: parseInt(game[0].result_a), result_b: parseInt(game[0].result_b) },
            { result_a: parseInt(adivinhacao.result_a), result_b: parseInt(adivinhacao.result_b) }
        );
    }
}

module.exports = AdivinhacaoFacade;