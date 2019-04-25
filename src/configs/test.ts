import {IConfig} from "./config";

const config : IConfig = {
    conn: null,
    env: 'test',
    port: parseInt(process.env.PORT) || 8844
};

export default config;