const UserDAO = require("./../dao/UserDAO");
const UserService = require("./../service/UserService");
const UserController = require("./../controller/UserController");

const userDAO = new UserDAO();
const userService = new UserService(userDAO);
const userController = new UserController(userService);

module.exports = (router) => {
    
    router.get("/logout", userController.logout);
    router.get("/login", userController.loginPage);
    router.post("/login", userController.login);
    router.get("/new-account", userController.newAccountPage);
    router.post("/new-account", userController.newAccount);

    return router;
};