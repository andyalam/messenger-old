import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import * as passportLocal from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { getRepository } from 'typeorm';

import { User } from '@messenger-entity/index';

const JWTStrategy = passportLocal.Strategy;
const { ExtractJwt } = passportLocal;
const userRepository = getRepository(User);

/**
 * Sign in with JWT
 */
 passport.use(new JWTStrategy(
   {
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: process.env.JWT_SECRET
   },
  (jwtPayload, done) => {
     console.log(jwtPayload);
     return userRepository
       .findOne({ id: jwtPayload.id })
       .then((user: User) => done(null, user))
       .catch(err => done(err));
   }
 ))
