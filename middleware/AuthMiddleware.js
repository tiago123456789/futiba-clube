class AuthMiddleware {

    static isPermissionAccessAdmin(request, response, next) {
        const { user } = request.session;
        if (user && user.role == "ROOT") {
            next();
        } else {
            response.redirect("/home");
        }
    }
}


module.exports = AuthMiddleware;