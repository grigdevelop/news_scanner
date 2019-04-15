import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import * as windows1251 from "windows-1251";

interface IHttpUtil {
    doGet(url: string): Promise<string>;
}

class HttpUtil implements IHttpUtil{


    doGet(url: string): Promise<string> {
        return new Promise<string>( async ( resolve, reject) => {
            try{
                const result = await axios.get(url);
                resolve(result.data);
            } catch (e) {
                reject(e);
            }
        } );
    }

    doGetEncode(url: string, encode: string) : Promise<string> {
        return new Promise<string>( async ( resolve, reject ) => {
            try{
                const config : AxiosRequestConfig = {
                    url: url,
                    method: 'GET',
                    responseType: 'stream'
                };
                const stream : AxiosResponse<NodeJS.ReadStream> = await axios(config);
                let result = stream.data.read().toString('latin1');
                result = windows1251.decode(result);
                //TODO: stream not fully downloaded.

                resolve(result);
            } catch (e) {
                reject(e);
            }
        } );
    }

}

export { IHttpUtil, HttpUtil };