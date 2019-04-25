import * as express from 'express';
import * as passport from "passport";
import dbSetup from './../setup/database.setup';
import {ISourcesServiceContext, SourcesService} from "../services/sources.service";
import {ISourceRepo, SourceRepo} from "../repos/source.repo";
import {User} from "../entities";

const router = express.Router();
router.use(passport.authenticate('jwt', { session: false}));

router.post('/create', async (request, response, next) => {
    try {
        const db = await dbSetup();
        const repo : ISourceRepo = new SourceRepo(db);
        const user = request.user as User;

        const context : ISourcesServiceContext = {
            repo: repo,
            user: user
        };
        const service = new SourcesService(context);
        const data = await service.create(request.body.source);
        response.json(data);
    } catch (e) {
        next(e);
    }
});

router.post('/update', async (request, response, next) => {
    try {
        const db = await dbSetup();
        const repo : ISourceRepo = new SourceRepo(db);
        const user = request.user as User;

        const context : ISourcesServiceContext = {
            repo: repo,
            user: user
        };
        const service = new SourcesService(context);
        const data = await service.update(request.body.source);
        response.json(data);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (request, response, next) => {
    try{
        const db = await dbSetup();
        const repo : ISourceRepo = new SourceRepo(db);
        const user = request.user as User;

        const context : ISourcesServiceContext = {
            repo: repo,
            user: user
        };
        const service = new SourcesService(context);
        const data = await service.getAll();
        response.json(data);
    } catch (e) {
        next(e);
    }

});

export default router;