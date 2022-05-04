import "reflect-metadata"
import * as express from "express"
import * as cors from 'cors'
import * as helmet from 'helmet'
import routes from './routes'
import { createConnection } from "typeorm"
import { _Auth } from './miscs'
import { checkJwt } from './middlewares';

const PORT = process.env.PORT || 3001
const jwtPL:any = global;
const permissionsPolicy = require('permissions-policy')


//createConnection().then(async () => {

    // create express app
    const app = express()

    // middlewares
    app.use(cors())
    app.use(helmet())

    app.use(express.json())

    app.use(permissionsPolicy({
        features: {
            fullscreen: ['self'],
            vibrate: ['none'],
            notifications: []
        }
    }))


    // routes
    app.use('/', routes)
    app.get('*', function(req, res){
        res.status(404).send(_Auth.AUTH400);
    });

    // starting express server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

//}).catch(error => console.log(error))
