const gamesRoute = require("./Games");

module.exports = (router) => {
    
    router.use("/games", gamesRoute(router));    

    return router;
}