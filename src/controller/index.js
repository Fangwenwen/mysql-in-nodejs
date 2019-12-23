import { RequestMapping, requestMethod } from './requestMapping'
import UserService from '../service/UserService'

export class IndexController {
    @RequestMapping({
        method: requestMethod.GET,
        path: '/'
    })
    static async indexRoute(ctx) {
        await ctx['render']('index', {

        })
    }

    @RequestMapping({
        method: requestMethod.GET,
        path: '/user'
    })
    static async userRoute(ctx) {
        const userId = 1
        const userInfoRes = await UserService.getUserInfo(userId)
        await ctx['render']('user', {
            userInfo: userInfoRes.data
        })
    }
}