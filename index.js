const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const connectionDB = require("./config/Database");
const app = express();

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
        connectionDB.then(async (connection) => {
            const rows = extractRegisterQuery(await connection.execute("SELECT * FROM users"));
            console.log(rows);
        });
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


app.post("/new-account", (request, response) => {
    const newAccount = request.body;
    connectionDB.then(async (connection) => {
        const rows = extractRegisterQuery(await connection.execute("SELECT * FROM users WHERE email = ?", [newAccount.email]));
        if (rows.length == 0) {
            await connection.execute("INSERT INTO users(name, email, password) VALUES(?, ?, ?)",
                [newAccount.name, newAccount.email, newAccount.password]);
            response.redirect("/new-account");
        } else {
            response.render("new-account", { message: "Email já está em uso!", ...newAccount });
        }
    }).catch(error => console.log(error));
});

function extractRegisterQuery(query) {
    const [rows, fields] = query;
    return rows;
}


app.listen(3000, () => console.log("Server ready!!!"));