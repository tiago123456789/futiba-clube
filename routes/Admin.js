const gamesRoute = require("./Games");
const groupRoute = require("./Group");
const AuthMiddleware = require("./../middleware/AuthMiddleware");

module.exports = (router) => {
    
    router.use("/games", gamesRoute(router));  
    router.use("/grupos", AuthMiddleware.isPermissionAccess, groupRoute(router));  

    return router;
}