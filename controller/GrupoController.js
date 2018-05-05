const GroupFacade = require("./../facade/GroupFacade");


class GrupoController {

    constructor(grupoService, grupoUserService) {
        this._grupoService = grupoService;
        this._grupoUserService = grupoUserService;
        this._groupFacade = new GroupFacade();
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.juntarAoGrupo = this.juntarAoGrupo.bind(this);
        this.confirmarEntraAoGrupo = this.confirmarEntraAoGrupo.bind(this);
        this.rejeitarEntradaAoGrupo = this.rejeitarEntradaAoGrupo.bind(this);
        this.classification = this.classification.bind(this);
    }

    async classification(request, response) {
        const classifications = await this._grupoService.getClassification();
        response.render("classification", { classifications })
    }

    async index(request, response) {
        const groups = await this._grupoUserService.findAll();
        response.render("groups", { error: "", groups: groups });
    }

    async create(request, response) {
        const newGroup = request.body;
        const idUser = request.session.user.id;
        try {
            const group = await this._grupoService.save(newGroup);
            await this._grupoUserService.save(
                { user_id: idUser, group_id: group[0].insertId, role: "OWNER"});
            return response.redirect("/admin/grupos/");
        } catch (e) {
            console.log(e);
            response.render("groups", { ...newGroup, error: e.message, groups: []});
        }
    }

    async findOne(request, response) {
        const idGroup = request.params.id;
        const idUser = request.session.user.id;
        const informationGroup = await this._groupFacade.getGroupInformations(idGroup, idUser);
        response.render("group", informationGroup);
    }

    async delete(request, response) {
        const id = request.params.id;
        await this._grupoUserService.deleteAllRegisterRelatedGroup(id);
        await this._grupoService.delete(id);
        response.redirect("/admin/grupos");
    }

    async juntarAoGrupo(request, response) {
        const idGroup = request.params.id;
        const idUser = request.session.user.id;
        await this._grupoUserService.save({ user_id: idUser, group_id: idGroup, role: "PENDENTING"});
        response.redirect("/admin/grupos");
    }

    async confirmarEntraAoGrupo(request, response) {
        const { id, idUser } = request.params;
        await this._grupoUserService.aceitarUsuarioNoGrupo(id, idUser);
        response.redirect(`/admin/grupos/${id}`);
    }

    async rejeitarEntradaAoGrupo(request, response) {
        const { id, idUser } = request.params;
        await this._grupoUserService.negarAcessoAoGrupoParaUsuarioEspecifico(id, idUser);
        response.redirect(`/admin/grupos/${id}`);
    }
}

module.exports = GrupoController;