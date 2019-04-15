import * as fs from 'fs';
import * as path from 'path';

interface IConfigUtil {
    readDataAsync<T>(filePath: string) : Promise<T>;
}

class ConfigUtil implements IConfigUtil{
    readDataAsync<T>(filePath: string): Promise<T> {
        return new Promise<T>( ( resolve, reject ) => {
            try {
                const sPath = path.join(__dirname, '../../../', filePath);
                const data : T = JSON.parse(fs.readFileSync(sPath, 'utf8'));
                resolve(data);
            } catch (e) {
                reject(e);
            }
        } );
    }
}

export { IConfigUtil, ConfigUtil };