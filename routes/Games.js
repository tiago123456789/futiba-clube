const GameDao = require("./../dao/GameDao");
const gameDAO = new GameDao();

module.exports = (router) => {
    
    router.get("/", async (request, response) => {
        const games = await gameDAO.findAll();
        response.render("games", { error: "", games }) 
    });

    router.post("/", async (request, response) => {
        const newGame = request.body;
        await gameDAO.save(newGame);
        response.redirect("/admin/games");
    });

    return router;
}