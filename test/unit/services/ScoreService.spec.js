const chai  = require("chai");
const ScoreService = require("./../../../src/service/ScoreService");

describe("Test ScoreService", () => {

    let gameFake = {};
    let palpiteFake = {};

    /**
     * @description Executed after each test.
     */
    afterEach(() => {
        gameFake = {};
        palpiteFake = {};
    });

    it ("Should getting score equal 100.", () => {
        gameFake.result_a = 7;
        gameFake.result_b = 17;
        palpiteFake.result_a = 7;
        palpiteFake.result_b = 17;

        const result = ScoreService.getScore(gameFake, palpiteFake);
        chai.assert(result == 100);
    });

    it ("Should getting score equal 50.", () => {
        gameFake.result_a = 17;
        gameFake.result_b = 10;
        palpiteFake.result_a = 17;
        palpiteFake.result_b = 9;

        const result = ScoreService.getScore(gameFake, palpiteFake);
        chai.assert(result == 50);
    });


    it ("Should getting score equal 50. Hits result_b in shot", () => {
        gameFake.result_a = 10;
        gameFake.result_b = 17;
        palpiteFake.result_a = 9;
        palpiteFake.result_b = 17;

        const result = ScoreService.getScore(gameFake, palpiteFake);
        chai.assert(result == 50);
    });
});