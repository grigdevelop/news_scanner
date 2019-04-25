import test from './test';
import dev from './dev';
import {IConfig} from "./config";

const configs : {[key: string] : IConfig } = {};
configs['test'] = test;
configs['dev'] = dev;

export default configs[process.env.name];