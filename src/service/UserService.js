import UserDao from '../dao/UserDao'
import RpcResult, { RpcCode, RpcMsg } from '../libs/RpcResult'

export default class UserService {
    static userDao = new UserDao()

    static async getUserInfo(userId) {
        let userInfoRes = await UserService.userDao.getOne(userId)
        if(userInfoRes.errMsg != null) {
            return new RpcResult(null, RpcMsg.UNKNOW_ERROR, RpcCode.UNKNOW_ERROR)
        }
        return new RpcResult(userInfoRes.data)
    }
}