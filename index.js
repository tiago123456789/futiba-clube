const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const UserDAO = require("./dao/UserDAO");
const userDAO = new UserDAO();

/**
 * @description Configure session in application.
 */
app.use(session({
    secret: 'futiba-club',
    resave: true,
    saveUninitialized: true,
}));

/**
 * @description Defined template engine used in app.
 */
app.set("view engine", "ejs");

/**
 * @description Defined dir asserts application.
 */
app.use(express.static("public"));

/**
 * @description Middleware do parse data to json.
 */
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (request, response) => {
    try {
        const rows = await userDAO.findAll();
        console.log(rows);
        response.render("home");
    } catch (e) {
        console.log(e);
    }

});

app.get("/login", (request, response) => {
    response.render("login");
});

app.get("/new-account", (request, response) => {
    response.render("new-account", { message: "", name: "", password: "" });
});


app.post("/new-account", async (request, response) => {
    try {
        const newAccount = request.body;
        const isExistUserEmail = userDAO.searchUserPerEmail(newAccount.email).length > 0;
        if (!isExistUserEmail) {
            newAccount.role = "USER";
            await userDAO.save(newAccount);
            response.redirect("/new-account");
        } else {
            response.render("new-account", { message: "Email já está em uso!", ...newAccount });
        }
    } catch (e) {
        console.log(e);
    }
});


app.listen(3000, () => console.log("Server ready!!!"));