const GroupDAO = require("./../dao/GrupoDAO");
const GroupUserDAO = require("./../dao/GroupUserDAO");
const GameDAO  = require("./../dao/GameDAO");
const AdivinhacaoDAO = require("./../dao/AdivinhacaoDAO");

const GameService = require("./../service/GameService");
const GroupService = require("./../service/GroupService");
const GroupUserService = require("./../service/GroupUserService");
const AdivinhacaoService = require("./../service/AdivinhacaoService");

const groupDao = new GroupDAO();
const groupUserDao = new GroupUserDAO();
const gameDao = new GameDAO();
const adivinhacaoDao = new AdivinhacaoDAO();

const groupService = new GroupService(groupDao);
const groupUserService = new GroupUserService(groupUserDao);
const gameService = new GameService(gameDao);
const adivinhacaoService = new AdivinhacaoService(adivinhacaoDao);

class GroupFacade {

    constructor() {
        this._groupService = groupService;
        this._groupUserService = groupUserService;
        this._gameService = gameService;
    }

    async getGroupInformations(idGroup, idUser) {
        const group = await this._groupService.findById(idGroup);
        const userPendenting = await this._groupUserService.findAllByIdGroupAndRole(idGroup, 'PENDENTING');
        const userOwnerOfGroup = await this._groupUserService.findByIdGroupAndUserOwner(idGroup);
        const games = await this._getGames(idUser, idGroup);
        return { group: group[0], users: userPendenting, isOwner: userOwnerOfGroup, games };
    }

    async _getGames(idUser, idGroup) {
        const games = await this._gameService.findAll();
        let gamesWithGuessings = games.map((game) => {
            return adivinhacaoService
                .findByIdGameAndIdUserAndIdGroup(game.id, idUser, idGroup)
                .then((adivinhacao) => {
                    adivinhacao = adivinhacao[0] || {};
                    game.adivinhacao = {
                        score: adivinhacao.score,
                        id_guessing: adivinhacao.id,
                        result_a: adivinhacao.result_a,
                        result_b: adivinhacao.result_b
                    };
                    return game;
                });
        });
        gamesWithGuessings = await Promise.all(gamesWithGuessings);
        return gamesWithGuessings;
    }
}


module.exports = GroupFacade;