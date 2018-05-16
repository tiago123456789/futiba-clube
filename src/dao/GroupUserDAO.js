const DAO = require("./../dao/DAO");

class GroupUserDAO extends DAO {

    constructor() {
        super("groups_users");
    }

    async findAll() {
        const connection = await this.getConexao();
        return this.extractRegisterQuery(await connection
            .execute("SELECT groups.*, groups_users.user_id, groups_users.role FROM groups LEFT JOIN groups_users on groups.id = groups_users.group_id and groups_users.role = 'OWNER'"));
    }

    async findAllByIdGroupAndRole(idGroup, role) {
        role = role.toUpperCase();
        const connection = await this.getConexao();
        return this.extractRegisterQuery(await connection
            .execute("SELECT gpu.*, u.name FROM groups_users AS gpu INNER JOIN groups AS g INNER JOIN users AS u ON gpu.user_id = u.id AND gpu.group_id = ? AND gpu.role = ?",
                [idGroup, role ]));

    }

    async findByIdGroupAndUserOwner(idGroup) {
        const connection = await this.getConexao();
        return this.extractRegisterQuery(await connection.execute(`SELECT * FROM groups_users AS gu 
        WHERE gu.group_id = ? AND gu.role = ?`, [idGroup, 'OWNER']));
    }

    async aceitarUsuarioNoGrupo(idGroup, idUser) {
        const connection = await this.getConexao();
        await connection.execute("UPDATE groups_users SET role = ? WHERE user_id = ? AND group_id = ?",
            ['USER', idUser, idGroup])
    }

    async negarAcessoAoGrupoParaUsuarioEspecifico(idGroup, idUser) {
        const connection = await this.getConexao();
        await connection.execute("DELETE FROM groups_users WHERE user_id = ? AND group_id = ?",
            [idUser, idGroup]);
    }

    async deleteAllRegisterRelatedGroup(idGroup) {
        const connection = await this.getConexao();
        await connection.execute("DELETE FROM groups_users WHERE group_id = ?",
            [idGroup]);
    }

    getColumnsSave() {
        return ["user_id", "group_id", "role"];
    }

    getColumnsUpdate() {
        return ["user_id", "group_id", "role"];
    }

}

module.exports = GroupUserDAO;