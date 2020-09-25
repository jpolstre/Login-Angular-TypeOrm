import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
// import {Request, Response} from "express";
// import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import Routes from "./routes";


const PORT = process.env.PORT || 4500


createConnection({
    type: "sqlite",
    database: "database.sqlite3",
    synchronize: true,
    logging: false,
    entities: [
        __dirname + "/entity/**/*.*"//ya que al compilarse se tendrá que usar .js y no .ts
    ],
    migrations: [
        __dirname + "/migration/**/*.ts"
    ],
    subscribers: [
        __dirname + "/subscriber/**/*.ts"
    ],
    cli: {
        entitiesDir: __dirname + "/entity",
        migrationsDir: __dirname + "/migration",
        subscribersDir: __dirname + "/subscriber"
    }
}).then(async connection => {


    // create express app
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    const routes = Routes(connection)
    app.use('/', routes)

    // register express routes from defined application routes
    // Routes.forEach(route => {
    //     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    //         const result = (new (route.controller as any))[route.action](req, res, next);
    //         if (result instanceof Promise) {
    //             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

    //         } else if (result !== null && result !== undefined) {
    //             res.json(result);
    //         }
    //     });
    // });

    // setup express app here
    // ...

    // start express server
    app.listen(PORT);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Marcelo",
    //     lastName: "Cabrera",
    //     age: 39
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));

    console.log("Express server has Listen on: http://localhost:4500/users");

}).catch(error => console.log(error));

