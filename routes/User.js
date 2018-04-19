const UserDAO = require("./../dao/UserDAO");
const userDAO = new UserDAO();

module.exports = (router) => {
    
    router.get("/login", (request, response) => response.render("login"));
    
    router.get("/new-account", (request, response) => {
        response.render("new-account", { message: "", name: "", password: "" });
    });
    
    
    router.post("/new-account", async (request, response) => {
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

    return router;
}