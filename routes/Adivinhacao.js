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

    router.post("/:id/comentarios", (request, response) => {
    
    });

    return router;
};