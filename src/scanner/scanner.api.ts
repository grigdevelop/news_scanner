import * as express from 'express';
import {NewsSourceService} from "./newsSource.service";

const router = express.Router();

router.get('/', (request: express.Request, response: express.Response) => {
    response.render('scanner/views/index');
});

router.post('/getSources', async (request, response) => {
    const service: NewsSourceService = new NewsSourceService();
    const result = await service.getSources();
    response.json(result);
});

router.post('/scanSources', async (request, response) => {
    try{
        const service: NewsSourceService = new NewsSourceService();
        const result = await service.scanSources();
        response.json(result);
    } catch (e) {
        response.json(e.message);
    }

});


export default router;