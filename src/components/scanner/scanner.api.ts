import * as express from 'express';
import { IScannerServiceContext, ScannerService} from "./scanner.service";
import {NewsSource} from "./lib";
import {HttpUtil} from "./utils";

const router = express.Router();

router.get('/', (request: express.Request, response: express.Response) => {
    response.render('components/scanner/views/index');
});

router.post('/getSources', async (request, response, next) => {
    try{
        const context : IScannerServiceContext = {
          http: new HttpUtil()
        };
        const service: ScannerService = new ScannerService(context);
        const result = await service.getSources();
        response.json(result);
    } catch (e) {
        next(e);
    }

});

router.post('/scanSources', async (request, response, next) => {
    try{
        const context : IScannerServiceContext = {
            http: new HttpUtil()
        };
        const service: ScannerService = new ScannerService(context);
        const result = await service.scanSources();
        response.json(result);
    } catch (e) {
        next(e);
    }

});

router.post('/scanSource', async (request, response, next) => {
   try{
       const context : IScannerServiceContext = {
           http: new HttpUtil()
       };

       const source : NewsSource = request.body.source;
       const service : ScannerService = new ScannerService(context);
       const result = await service.scanSource(source);
       response.json(result);

   }  catch (e) {
       next(e);
   }
});


export default router;