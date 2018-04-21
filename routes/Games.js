const GameDao = require("../dao/GameDAO");
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

    router.get("/:id/delete", async (request, response) => {
        const id = request.params.id;
        await gameDAO.delete(id);
        response.redirect("/admin/games");
    });

    return router;
}