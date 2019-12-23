import KoaProject from './koaProject'
import MySQL from './libs/mysql'

const startApp = () => {
    process.on('uncaughtException', (err) => {
        console.log(err)
    })
    MySQL.init()
    const app = new KoaProject()
    app.start()
}

startApp()