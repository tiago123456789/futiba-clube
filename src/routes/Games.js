const GameDao = require("../dao/GameDAO");
const GameService = require("../service/GameService");
const GameController = require("../controller/GameController");

const gameDAO = new GameDao();
const gameService = new GameService(gameDAO);
const gameController = new GameController(gameService);

module.exports = (router) => {

    router.get("/", gameController.index);
    router.post("/results", gameController.saveResultGame);
    router.post("/", gameController.save);
    router.get("/:id/delete", gameController.delete);

    return router;
};