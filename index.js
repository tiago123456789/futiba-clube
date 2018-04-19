const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const routesApp = require("./routes/Index");
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

/**
 * @description Defined routes application.
 */
routesApp({ app, express });

app.listen(3000, () => console.log("Server ready!!!"));