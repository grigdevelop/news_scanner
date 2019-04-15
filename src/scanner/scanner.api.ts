import * as express from 'express';
import {NewsSourceService} from "./newsSource.service";
import {NewsSource} from "./lib";

const router = express.Router();

router.get('/', (request: express.Request, response: express.Response) => {
    response.render('scanner/views/index');
});

router.post('/getSources', async (request, response, next) => {
    try{
        const service: NewsSourceService = new NewsSourceService();
        const result = await service.getSources();
        response.json(result);
    } catch (e) {
        next(e);
    }

});

router.post('/scanSources', async (request, response, next) => {
    try{
        const service: NewsSourceService = new NewsSourceService();
        const result = await service.scanSources();
        response.json(result);
    } catch (e) {
        next(e);
    }

});

router.post('/scanSource', async (request, response, next) => {
   try{
       const source : NewsSource = request.body.source;

       const service : NewsSourceService = new NewsSourceService();
       const result = await service.scanSource(source);
       response.json(result);

   }  catch (e) {
       next(e);
   }
});


export default router;