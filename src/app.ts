import * as express from "express";
// @ts-ignore
import * as lessMiddleware from "less-middleware";
import * as cookieParser from "cookie-parser";
import * as bodyParser from 'body-parser';
import * as path from 'path';
import passportSetup from './setup/passport.setup';

// routes
import scannerRoutes from './components/scanner';
import authRoutes from './components/auth';
import newsSourcesRoutes from './routes/newsSources.api';
import sourcesRoutes from './routes/sources.api';

// configs
import configs from './configs';

const app = express();
const port : number = parseInt(process.env.PORT) || configs.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// configure passport
passportSetup(app);

app.use('/api/scanner', scannerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/newsSources', newsSourcesRoutes);
app.use('/api/sources', sourcesRoutes);

app.use(lessMiddleware(path.join(__dirname,'../', 'public')));
app.use(express.static(path.join(__dirname,'../', 'public')));
app.use("/", express.static(path.join(__dirname, 'client')));

app.listen(port, () => console.log('listening port :', port));

export default app;