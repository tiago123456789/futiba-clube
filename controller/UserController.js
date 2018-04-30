class UserController {

    constructor(userService) {
        this._userService = userService;
        this.login = this.login.bind(this);
        this.loginPage = this.loginPage.bind(this);
        this.logout = this.logout.bind(this);
    }

    loginPage(request, response) {
        response.render("login", { "error": "" })
    }

    newAccountPage(request, response) {
        response.render("new-account", { message: "", email: "", name: "", password: "" });
    }

    newAccount(request, response) {

    }

    async login(request, response) {
        try {
            const credenciais = request.body;
            const userAuthenticated = await this._userService.authenticate(credenciais);
            request.session.use = userAuthenticated;
            response.redirect("/home");
        } catch(e) {
            response.render("login", { "error": e.message });
        }
    }

    logout(request, response) {
        request.session.destroy(() => response.redirect("/home"));
    }
}