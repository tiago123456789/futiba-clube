const userRouter = require("./User");
const adminRouter = require("./Admin");
const AuthMiddleware = require("./../middleware/AuthMiddleware");

module.exports = ({ app, express }) => {

    /**
     * @description Capture user in session is set on response locals.
     */
    app.use((request, response) => {
        const { user } = request.session;
        if (user) {
            response.locals.user = user; 
        }
    });

    app.use("/users", userRouter(express.Router()));
    app.use("/admin", AuthMiddleware.isPermissionAccessAdmin, adminRouter(express.Router()));
    app.use("/home", (request, response) => response.render("home"));

  
    app.use((request, response) => response.redirect("/home"));
}