import Router from 'koa-router'

const router = new Router()

export const requestMethod = {
    HEAD: 'head',
    OPTIONS: 'options',
    GET: 'get',
    PUT: 'put',
    PATCH: 'patch',
    POST: 'post',
    DELETE: 'delete'
}

const routerMap = new Map()
export function RequestMapping(config) {
    return (target, key, descriptor) => {
        routerMap.set({
            target: target,
            name: key,
            method: config.method,
            path: config.path,
            middleware: config.middleware
        }, target[key])
    }
}

const defaultMiddleware = []

export function registerRoutes(app) {
    for(let [config, controller] of routerMap) {
        let middleware = config.middleware == null ? [] : config.middleware
        middleware = defaultMiddleware.concat(middleware)
        router[config.method](config.path, ...middleware, controller)
    }
    app.use(router.routes())
}