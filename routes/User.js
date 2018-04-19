const UserDAO = require("./../dao/UserDAO");
const userDAO = new UserDAO();

module.exports = (router) => {
    
    router.get("/logout", (request, response) => request.session.destroy(() => response.redirect("/home")));

    router.get("/login", (request, response) => response.render("login", { "error": "" }));

    router.post("/login", async (request, response) => {
        const credenciais = request.body;
        const userExist = await userDAO.searchUserPerEmail(credenciais.email);
        if (userExist.length > 0) {
            const session = request.session;
            delete userExist[0].password;
            session.user = userExist[0];
            return response.redirect("/home");
        } else {
            response.render("login", { "error": "Email ou senha inválido!" });
        }
    })

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