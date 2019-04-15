import * as express from "express";
// @ts-ignore
import * as lessMiddleware from "less-middleware";
import * as cookieParser from "cookie-parser";
import * as bodyParser from 'body-parser';


const app = express();
const port : number = 4444;
import * as path from 'path';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('view engine', 'ejs');
app.set('views', __dirname);

import btcMarkets from './btc-markets';
import scannerRoutes from './scanner';

app.use('/markets', btcMarkets);
app.use('/scanner', scannerRoutes);

app.use(lessMiddleware(path.join(__dirname,'../', 'public')));
app.use(express.static(path.join(__dirname,'../', 'public')));
console.log(__dirname);

app.listen(port, () => console.log('listening port :', port));