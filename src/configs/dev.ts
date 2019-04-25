import {IConfig} from "./config";

const config : IConfig = {
    conn: 'mongodb://localhost:27017/scanner_dev',
    env: 'dev',
    port: parseInt(process.env.PORT) || 4444
};

export default config;