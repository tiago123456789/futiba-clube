const MESSAGES_APP = require("./../lib/MessagesApp");

class GroupService {

    constructor(groupDao) {
        this._groupDao = groupDao;
    };

    async save(group) {
        const nameAlreadyUsedOtherGroup = await this._verifyExistGroupWithName(group.name);
        if (nameAlreadyUsedOtherGroup) {
            throw new Error(MESSAGES_APP.GRUPO_EXISTE);
        }

        return await this._groupDao.save(group);
    }

    async findById(id) {
        return await this._groupDao.findById(id);
    }

    async delete(id) {
        await this._groupDao.delete(id);
    }

    async _verifyExistGroupWithName(name) {
        const groups = await this._groupDao.findByName(name);
        return groups.length > 0;
    }
}

module.exports = GroupService;