import * as express from 'express';
import * as passport from "passport";
import * as jwt from 'jsonwebtoken';
import {User} from "./../../services/user.service";

const router = express.Router();

router.post('/login', (request, response, next) => {

    passport.authenticate('local', { session: false}, (error, user : User, info)=> {
        if ( error || !user ){
            return response.status(400).json({
                message: 'something goes wrong',
                user: user
            });
        }

        request.logIn(user, { session: false}, (err) => {
           if( err ){
               response.send( err );
           }

           const token = jwt.sign(user, 'super_secret');
           return response.json({user: token});
        });
    })(request, response);

});

router.post('/validate', (request, response, next) => {

    //passport.authorize('local', )

});

export default router;