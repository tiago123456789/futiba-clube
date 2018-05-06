const AdivinhacaoFacade = require("./../facade/AdivinhacaoFacade");
const AdivinhacaoController = require("./../controller/AdivinhacaoController");

const adivinhacaoController  = new AdivinhacaoController(new AdivinhacaoFacade());

module.exports = (router) => {

    router.post("/", adivinhacaoController.save);
    router.get("/:id/comentarios", (request, response) => {
        const comentarios = [
            {
                "user": {
                    "name": "Tiago R. da costa"
                },
                "comentario": "Ótimo palpite sobre o jogo."
            },
            {
                "user": {
                    "name": "Tiago R. da costa"
                },
                "comentario": "Ótimo palpite sobre o jogo."
            }
        ];
        return response.json(comentarios);
    });

    // router.post("/:id/comentarios", (request, response) => {
    //
    // });

    return router;
};