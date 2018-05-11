const AdivinhacaoFacade = require("./../facade/AdivinhacaoFacade");
const AdivinhacaoController = require("./../controller/AdivinhacaoController");

const ComentarioDAO = require("./../dao/ComentarioDAO");
const ComentarioService = require("./../service/ComentarioService");

const adivinhacaoController = new AdivinhacaoController(new AdivinhacaoFacade());
const comentarioDao = new ComentarioDAO();
const comentarioService = new ComentarioService(comentarioDao);

module.exports = (router) => {

    router.post("/", adivinhacaoController.save);
    router.get("/:id/comentarios", async (request, response) => {
        const comentarios = await comentarioService.findAll();
        return response.json(comentarios);
    });

    router.post("/:id/comentarios", async (request, response) => {
        try {
            const idGuessing = request.params.id;
            const idUser = request.session.user.id;
            const { name } = request.body;
            const novoComentario = { comments: name, guessing_id: idGuessing, user_id: idUser };
            await comentarioService.save(novoComentario);
            response.sendStatus(201);
        } catch(e) {
            console.log(e);
        }
    });

    return router;
};