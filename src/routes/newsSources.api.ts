import * as express from 'express';
import * as passport from "passport";
import { NewsSourcesService, INewsSourcesServiceContext } from './../services';

const router = express.Router();
router.use(passport.authenticate('jwt', { session: false}));

router.post('/getAll', async ( request, response ) => {

    const context : INewsSourcesServiceContext = {
      user : request.user
    };
    const service : NewsSourcesService = new NewsSourcesService(context);

    response.json(await service.getNewsSources());
});

export default router;