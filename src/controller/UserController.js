const MESSAGE_APP = require("./../lib/MessagesApp");

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
        response.render("login", { "error": "", email: "", password: "" })
    }

    newAccountPage(request, response) {
        response.render("new-account", { error: "", message: "", email: "", name: "", password: "" });
    }

    async newAccount(request, response) {
        const newAccount = request.body;
        try {
            this.validationForm(request, ["name", "email", "password"], (errors, fieldsInformated) => {
                return response.render("new-account", { error: errors, ...fieldsInformated })
            });
            await this._userService.create(newAccount);
            response.redirect("/new-account");
        } catch (e) {
            response.render("new-account", { error: [ { msg: e.message } ], ...newAccount });
        }
    }

    async login(request, response) {
        const credenciais = request.body;

        try {
            this.validationForm(request, ["email", "password"], (errors, fieldsInformated) => {
                return response.render("login", { error: errors, ...fieldsInformated })
            });
            const userAuthenticated = await this._userService.authenticate(credenciais);
            request.session.user = userAuthenticated;
            response.redirect("/home");
        } catch(e) {
            response.render("login", { "error": [ { msg: e.message } ], ...credenciais });
        }
    }

    logout(request, response) {
        request.session.destroy(() => response.redirect("/home"));
    }

    validationForm(request, fieldsValidated, callbackFormInvalid) {
        if (fieldsValidated.includes("name")) {
            request
                .checkBody("name", `Name ${MESSAGE_APP.CAMPO_OBRIGATORIO}`)
                .isLength({ min: 1 });
        }

        if (fieldsValidated.includes("email")) {
            request
                .checkBody("email", MESSAGE_APP.EMAIL_INVALIDO)
                .isEmail();
        }

        if (fieldsValidated.includes("password")) {
            request
                .checkBody("password", MESSAGE_APP.SENHA_MAXIMO_10_CARACTERES)
                .isLength({max: 11 });

            request
                .checkBody("password", MESSAGE_APP.SENHA_MINIMO_3_CARACTERES)
                .isLength({ min: 3 });
        }


        const errors = request.validationErrors();

        if (errors) {
            callbackFormInvalid(errors, request.body);
        }

    }
}

module.exports = UserController;