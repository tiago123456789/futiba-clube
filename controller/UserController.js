class UserController {

    constructor(userService) {
        this._userService = userService;
        this.login = this.login.bind(this);
        this.loginPage = this.loginPage.bind(this);
        this.logout = this.logout.bind(this);
        this.newAccount = this.newAccount.bind(this);
        this.newAccountPage = this.newAccountPage.bind(this);
    }

    loginPage(request, response) {
        response.render("login", { "error": "" })
    }

    newAccountPage(request, response) {
        response.render("new-account", { message: "", email: "", name: "", password: "" });
    }

    async newAccount(request, response) {
        const newAccount = request.body;
        try {
            await this._userService.create(newAccount);
            response.redirect("/new-account");
        } catch (e) {
            response.render("new-account", { message: e.message, ...newAccount });
        }
    }

    async login(request, response) {
        try {
            const credenciais = request.body;
            const userAuthenticated = await this._userService.authenticate(credenciais);
            request.session.user = userAuthenticated;
            response.redirect("/home");
        } catch(e) {
            response.render("login", { "error": e.message });
        }
    }

    logout(request, response) {
        request.session.destroy(() => response.redirect("/home"));
    }
}

module.exports = UserController;