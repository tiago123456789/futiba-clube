const AdivinhacaoFacade = require("./../facade/AdivinhacaoFacade");
const AdivinhacaoController = require("./../controller/AdivinhacaoController");

const adivinhacaoController  = new AdivinhacaoController(new AdivinhacaoFacade());

module.exports = (router) => {

    router.post("/", adivinhacaoController.save);

    return router;
};