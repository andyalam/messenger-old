import * as dotenv from 'dotenv';
dotenv.load();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { Routes } from './routes';
import { User } from './entity/User';

createConnection().then(async connection => {

  // create express app
  const app = express();
  app.use(bodyParser.json());

  // register express routes from defined application routes
  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      try {
        const result = (new (route.controller as any))[route.action](req, res, next);

        if (result instanceof Promise) {
          result.then(result =>
              result !== null && result !== undefined
                ? res.send(result)
                : res.send(null)
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        } else {
          res.json(null);
        }
      } catch (e) {
        res.json({ error: e });
      }
    });
  });

  // setup express app here
  // ...

  // start express server
  app.listen(3000);

  // insert new users for test
  // await connection.manager.save(connection.manager.create(User, {
  //   firstName: 'Timber',
  //   lastName: 'Saw',
  //   age: 27
  // }));
  // await connection.manager.save(connection.manager.create(User, {
  //   firstName: 'Phantom',
  //   lastName: 'Assassin',
  //   age: 24
  // }));

  console.log('Express server has started on port 3000. Open http://localhost:3000/users to see results');

}).catch(error => console.log(error));
