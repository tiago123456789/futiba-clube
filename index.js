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
 * @description Defined dir asserts application.
 */
app.use(express.static("public"))

app.get("/", async (request, response) => {
    try {
        connectionDB.then(async (connection) =>{
            const [rows, fields] = await connection.execute("SELECT * FROM users")
            console.log(rows);
        });
        response.send("First route app.");
    } catch(e) {
        console.log(e);
    }
    
});



app.listen(3000, () => console.log("Server ready!!!"));