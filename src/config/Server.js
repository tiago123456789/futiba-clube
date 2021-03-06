const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const validator = require("express-validator");
const morgan = require("morgan");

const routesApp = require("./../routes/Index");
const logger = require("./../config/Logger");
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

app.use(morgan('combined', { stream: logger.stream }));

/**
 * @description Middleware do parse data to json.
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @description Middleware to the validation forms.
 */
app.use(validator());

/**
 * @description Defined routes application.
 */
routesApp({ app, express });

module.exports = app;