import {IConfig} from "./config";

const config : IConfig = {
    conn: null,
    env: 'dev',
    port: parseInt(process.env.PORT) || 4444
};

export default config;