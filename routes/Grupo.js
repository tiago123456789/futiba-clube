const GroupUserDAO = require("./../dao/GroupUserDAO");
const GrupoDAO = require("./../dao/GrupoDAO");
const GroupController = require("./../controller/GrupoController");
const GroupService = require("./../service/GroupService");
const GroupUserService = require("./../service/GroupUserService");

const groupUserDAO = new GroupUserDAO();
const grupoDAO = new GrupoDAO();
const groupUserService = new GroupUserService(groupUserDAO);
const groupService = new GroupService(grupoDAO);
const groupController = new GroupController(groupService, groupUserService);

module.exports = (router) => {
    
    router.get("/", groupController.index);
    router.post("/", groupController.create);
    router.get("/:id", groupController.findOne);
    router.get("/:id/delete", groupController.delete);
    router.get("/:id/join", groupController.juntarAoGrupo);
    router.get("/:id/aceitar/:idUser", groupController.confirmarEntraAoGrupo);
    router.get("/:id/negar/:idUser", groupController.rejeitarEntradaAoGrupo);

    return router;
};