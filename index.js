const express = require("express");
const session = require("express-session");

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
app.use(express.static("public"))

app.get("/", async (request, response) => {
    try {
        connectionDB.then(async (connection) =>{
            const rows = extractRegisterQuery(await connection.execute("SELECT * FROM users"));
            console.log(rows);
        });
        response.render("home");
    } catch(e) {
        console.log(e);
    }
    
});

app.get("/login", (request, response) => {
    response.render("login");
});

app.get("/new-account", (request, response) => {
    response.render("new-account");
})

function extractRegisterQuery(query) {
    const [rows, fields] = query;
    return rows;
}

app.listen(3000, () => console.log("Server ready!!!"));