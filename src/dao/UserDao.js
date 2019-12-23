import BaseDao from './BaseDao'

export default class UserDao extends BaseDao {
    table_name = 'users'

    async addOne(item) {
        return await this._addOne(item)
    }

    async upOne(item, id) {
        return await this._upOne(item, id)
    }

    async getOne(id) {
        return await this._getOne(id)
    }

    async getPageList() {
        
    }
}