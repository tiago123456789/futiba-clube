class AdivinhacaoController {

    constructor(adivinhacaoFacade) {
        this._adivinhacaoFacade = adivinhacaoFacade;
        this.save = this.save.bind(this);
    }

    async save(request, response) {
        try {
            const novaAdivinhacao = request.body;
            const idUser = request.session.user.id;
            await this._adivinhacaoFacade.criarAdivinhacao(novaAdivinhacao, idUser);
            response.redirect("/admin/grupos/" + novaAdivinhacao.group);
        } catch(e) {
            console.log(e);
            response.render("games", { error: e.message, games: null });
        }
    }
}

module.exports = AdivinhacaoController;