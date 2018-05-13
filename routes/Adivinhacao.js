const AdivinhacaoFacade = require("./../facade/AdivinhacaoFacade");
const AdivinhacaoController = require("./../controller/AdivinhacaoController");

const ComentarioDAO = require("./../dao/ComentarioDAO");
const ComentarioService = require("./../service/ComentarioService");
const ComentarioController = require("./../controller/ComentarioController");

const adivinhacaoController = new AdivinhacaoController(new AdivinhacaoFacade());
const comentarioDao = new ComentarioDAO();
const comentarioService = new ComentarioService(comentarioDao);
const comentarioController = new ComentarioController(comentarioService);

module.exports = (router) => {

    router.post("/", adivinhacaoController.save);
    router.get("/:id/comentarios", comentarioController.index);
    router.post("/:id/comentarios", comentarioController.save);

    return router;
};