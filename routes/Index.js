const userRouter = require("./User");

module.exports = ({ app, express }) => {

    app.use("/user", userRouter(express.Router()));
    app.use("/home", (request, response) => response.render("home"));
}