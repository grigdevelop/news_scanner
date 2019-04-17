import { Request, Response, NextFunction } from 'express';
import * as passport from "passport";


function validateAuth(request : Request, response : Response, next : NextFunction){

    passport.authenticate('jwt', (error, user, info) => {

        console.log(error, user, info);

        if ( user ) {
            return next();
        } else {
            return response.json(info);
        }

    })(request, response, next);

}

export default validateAuth;