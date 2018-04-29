const GroupUserDAO = require("./../dao/GroupUserDAO");
const GameDAO = require("./../dao/GameDAO");
const GrupoDAO = require("./../dao/GrupoDAO");
const AdivinhacaoDAO = require("./../dao/AdivinhacaoDAO");

const groupUserDAO = new GroupUserDAO();
const grupoDAO = new GrupoDAO();
const gameDAO = new GameDAO();
const adivinhacaoDAO = new AdivinhacaoDAO();

module.exports = (router) => {
    
    router.get("/", async (request, response) => {
        const groups = await groupUserDAO.findAll();
        response.render("groups", { error: "", groups });
    });

    router.post("/", async (request, response) => {
        try {
            const newGroup = request.body;
            const [ groupInserted ] = await grupoDAO.save(newGroup);
            const newGroupUser = getGroupUser(request.session.user.id, groupInserted.insertId, "OWNER");
            await groupUserDAO.save(newGroupUser);
            response.redirect("/admin/grupos");
        } catch (e) {
            console.log(e);
        }
    });

    router.get("/:id", async (request, response) => {
        const id = request.params.id;
        const idUser = request.session.user.id;
        const group = await grupoDAO.findById(id);
        const registersPendenting = await groupUserDAO.findAllByIdGroupAndRole(id, 'PENDENTING');
        const isUserOwnerGroup = await groupUserDAO.findByIdGroupAndUserOwner(id);
        const games = await gameDAO.findAll();
        let gamesWithGuessings = games.map(game => {
            return adivinhacaoDAO
                    .findByIdGameAndIdUser(game.id, idUser)
                    .then((adivinhacao) => {
                        adivinhacao = adivinhacao[0] || {};
                        game.adivinhacao = {
                            score: adivinhacao.score,
                            result_a: adivinhacao.result_a,
                            result_b: adivinhacao.result_b
                        };
                        return game;
                    });
        });

        gamesWithGuessings = await Promise.all(gamesWithGuessings);
        response.render("group", {
            group: group[0],
            users: registersPendenting,
            isOwner: isUserOwnerGroup,
            games: gamesWithGuessings
        });
    });

    router.get("/:id/delete", async (request, response) => {
       const id = request.params.id;
       await grupoDAO.delete(id);
       response.redirect("/admin/grupos");
    });

    router.get("/:id/join", async (request, response) => {
        const id = request.params.id;
        await groupUserDAO.save(getGroupUser(request.session.user.id, id, "PENDENTING"));
        response.redirect("/admin/grupos");
    });


    router.get("/:id/aceitar/:idUser", async (request, response) => {
        const { id, idUser } = request.params;
        await groupUserDAO.aceitarUsuarioNoGrupo(id, idUser);
        response.redirect(`/admin/grupos/${id}`);
    });

    router.get("/:id/negar/:idUser", async (request, response) => {
        const { id, idUser } = request.params;
        await groupUserDAO.negarAcessoAoGrupoParaUsuarioEspecifico(id, idUser);
        response.redirect(`/admin/grupos/${id}`);
    });

    function getGroupUser(idUser, idGroup, role) {
        return  {
            "user_id": idUser,
            "group_id": idGroup,
            "role": role
        };
    }

    return router;
};