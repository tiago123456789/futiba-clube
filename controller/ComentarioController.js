class ComentarioController {

    constructor(service) {
        this._service = service;
        this.index = this.index.bind(this);
        this.save = this.save.bind(this);
    }

    async index(request, response) {
        const comentarios = await this._service.findAll();
        return response.json(comentarios);
    }

    async save(request, response) {
        try {
            const idGuessing = request.params.id;
            const idUser = request.session.user.id;
            const { name } = request.body;
            const novoComentario = { comments: name, guessing_id: idGuessing, user_id: idUser };
            await this._service.save(novoComentario);
            response.sendStatus(201);
        } catch(e) {
            response.status(400).json({ error: e.message });
        }
    }
}

module.exports = ComentarioController;