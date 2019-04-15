import * as express from "express";
// @ts-ignore
import * as lessMiddleware from "less-middleware";
import * as cookieParser from "cookie-parser";
import * as bodyParser from 'body-parser';
import * as path from 'path';

// routes
import scannerRoutes from './scanner';

const app = express();
const port : number = parseInt(process.env.PORT) || 4444;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', __dirname);


app.use('/scanner', scannerRoutes);

app.use(lessMiddleware(path.join(__dirname,'../', 'public')));
app.use(express.static(path.join(__dirname,'../', 'public')));
console.log(__dirname);

app.listen(port, () => console.log('listening port :', port));