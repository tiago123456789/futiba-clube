class GroupUserService {

    constructor(groupUserDao) {
        this._groupUserDao = groupUserDao;
    }

    async save(groupUser) {
        await this._groupUserDao.save(groupUser);
    }

    async findAll() {
        return await this._groupUserDao.findAll();
    }

    async deleteAllRegisterRelatedGroup(idGroup) {
        return this._groupUserDao.deleteAllRegisterRelatedGroup(idGroup);
    }

    async findAllByIdGroupAndRole(id, status) {
        return await this._groupUserDao.findAllByIdGroupAndRole(id, status);
    }

    async findByIdGroupAndUserOwner(id) {
        return await this._groupUserDao.findByIdGroupAndUserOwner(id);
    }

    async aceitarUsuarioNoGrupo(id, idUser) {
        return await this._groupUserDao.aceitarUsuarioNoGrupo(id, idUser);
    }

    async negarAcessoAoGrupoParaUsuarioEspecifico(id, idUser) {
        return await this._groupUserDao.negarAcessoAoGrupoParaUsuarioEspecifico(id, idUser);
    }
}

module.exports = GroupUserService;