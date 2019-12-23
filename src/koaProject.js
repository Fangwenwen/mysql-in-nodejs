import Koa from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static'
import KoaViews from 'koa-views'
import path from 'path'
import { registerRoutes } from './controller/requestMapping'
import CONFIG from './config.json'

export * from './controller/index'

export default class Project {
    app

    constructor() {
        this.app = new Koa()
    }

    _setApp() {
        this.app.use(KoaBody({
            jsonLimit: '100mb',
            formLimit: '100mb',
            multipart: true
        }))

        this.app.use(KoaStatic(path.join(__dirname, './webroot')))

        this.app.use(KoaViews(path.join(__dirname, './views'), {extension: 'ejs'}))
    }

    _setRouter() {
        registerRoutes(this.app)
    }

    start() {
        this._setApp()
        this._setRouter()
        this.app.listen(CONFIG.SERVER_CONFIG.PORT, () => {
            console.log(`Server Listening on ${CONFIG.SERVER_CONFIG.PORT}`)
        })
    }
}