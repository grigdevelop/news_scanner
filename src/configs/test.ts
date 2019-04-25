import {IConfig} from "./config";

const config : IConfig = {
    conn: 'mongodb://localhost:27017/scanner_test',
    env: 'test',
    port: parseInt(process.env.PORT) || 8844
};

export default config;