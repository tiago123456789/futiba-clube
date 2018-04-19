const userRouter = require("./User");
const adminRouter = require("./Admin");
const AuthMiddleware = require("./../middleware/AuthMiddleware");

module.exports = ({ app, express }) => {

    app.use("/user", userRouter(express.Router()));
    app.use("/admin", AuthMiddleware.isPermissionAccessAdmin, adminRouter(express.Router()));
    app.use("/home", (request, response) => response.render("home"));
}