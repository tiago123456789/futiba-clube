const gamesRoute = require("./Games");
const groupRoute = require("./Grupo");
const AuthMiddleware = require("./../middleware/AuthMiddleware");

module.exports = (express) => {
    const router  = express.Router();
    
    router.use("/grupos", AuthMiddleware.isPermissionAccess, groupRoute(express.Router()));  
    router.use("/games",  AuthMiddleware.isPermissionAccessAdmin, gamesRoute(express.Router()));

    return router;
}