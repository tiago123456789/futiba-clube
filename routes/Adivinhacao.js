const GameDAO = require("./../dao/GameDAO");
const AdivinhacaoDAO = require("./../dao/AdivinhacaoDAO");
const ScoreService = require("./../service/ScoreService");

const gameDAO = new GameDAO();
const scoreService = new ScoreService();
const adivinhacaoDAO = new AdivinhacaoDAO();

module.exports = (router) => {

    router.post("/", async (request, response) => {
        const novaAdivinhacao = request.body;
        const game = await gameDAO.findById(novaAdivinhacao.game);
        const score = scoreService.getScore(
            { result_a: parseInt(game[0].result_a), result_b: parseInt(game[0].result_b) },
            { result_a: parseInt(novaAdivinhacao.result_a), result_b: parseInt(novaAdivinhacao.result_b) });
        novaAdivinhacao.score = score;
        await adivinhacaoDAO.save({
            result_a: novaAdivinhacao.result_a,
            result_b: novaAdivinhacao.result_b,
            score: novaAdivinhacao.score,
            game_id: novaAdivinhacao.game,
            group_id: novaAdivinhacao.group,
            user_id: request.session.user.id
        });
        response.redirect("/admin/grupos/" + novaAdivinhacao.group);
    });

    return router;
};