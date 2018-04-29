class ScoreService {

    getScore(game, palpite) {
        let score = 0;

        if (game.result_a === palpite.result_a && game.result_b === palpite.result_b) {
            score = 100;
        } else if(game.result_a === palpite.result_a && game.result_b !== palpite.result_b) {
            score = 25;
            if (palpite.result_a > palpite.result_b) {
                score += 25;
            }
        } else if (game.result_a !== palpite.result_a && game.result_b === palpite.result_b) {
            score = 25;
            if (palpite.result_b > palpite.result_a) {
                score += 25;
            }
        }

        return score;
    }
}

module.exports = ScoreService;