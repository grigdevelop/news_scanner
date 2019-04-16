import * as passport from 'passport';
import { Strategy } from 'passport-local';
import {User, UserService} from "./../services/user.service";
import * as express from 'express';

function setup(app: express.Application){

    passport.use(new Strategy( async(username, password, done) => {
        const userService : UserService = new UserService();
        const user = await userService.getUserByUsernameAndPassword(username, password);
        if(user){
            return done(null, user);
        }else{
            return done(new Error('User not found'), false);
        }
    }));

    passport.serializeUser( (user : User , done) => {
        done(user.id);
    });

    passport.deserializeUser( async (id : number, done) => {
        const userService : UserService = new UserService();
        const user : User = await userService.getUserById(id);
        if( user ) {
            return done(null, user);
        } else {
            return done(new Error('User not found'));
        }
    });

    app.use(passport.initialize());
    app.use(passport.session());
}

export default setup;