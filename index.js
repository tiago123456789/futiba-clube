const express = require("express");
const session = require("express-session");
const app = express();

/**
 * @description Configure session in application.
 */
app.use(session({
    secret: 'futiba-club',
    resave: true,
    saveUninitialized: true,
}))

app.get("/", (request, response) => {
    response.send("First route app.");
});

app.listen(3000, () => console.log("Server ready!!!"));