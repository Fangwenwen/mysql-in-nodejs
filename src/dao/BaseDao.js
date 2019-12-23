import MySQL from '../libs/mysql'

export default class BaseDao {
    table_name = '_mock_table_'

    // 创建某条数据
    async _addOne(item) {
        return await MySQL.insertItem(this.table_name, item)
    }

    // 更新某条数据
    async _upOne(item, id) {
        return await MySQL.updateItemById(this.table_name, item, id)
    }

    // 获取某条数据
    async _getOne(id) {
        return await MySQL.getItemById(this.table_name, id)
    }

    // 获取列表数据
    async _getPageList() {
        
    }
}