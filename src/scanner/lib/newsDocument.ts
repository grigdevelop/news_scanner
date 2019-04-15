import {JSDOM} from "jsdom";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import * as windows1251 from "windows-1251";
import {NewsSource} from "./newsSource";
import {NewsLink} from "./NewsLink";
import { QueryNewsLink} from "./queryNewsLink";

class NewsDocument {

    private constructor(private newsSource: NewsSource, private dom: JSDOM){

    }

    public getAllNewsLinks(): Promise<NewsLink[]> {
        return new Promise<NewsLink[]>( async ( resolve, reject ) => {

            try {

                const linkList : NewsLink[] = [];

                for(let queryKey  in this.newsSource.queries){
                    const query : QueryNewsLink = this.newsSource.queries[queryKey];

                    const urlList = this.dom.window.document.querySelectorAll(query.urlQuery);
                    const textList = this.dom.window.document.querySelectorAll(query.textQuery);

                    // TODO: text should by child or current node of url node
                    //if(urlList.length != textList.length){
                    //   reject(new Error('text results and link results are different'));
                    //   return;
                    //}

                    const length : number = urlList.length;
                    for(let i = 0; i < length; i++){
                        const url = urlList[i];



                        // getting text from query
                        let textText: string = 'not found';
                        if(query.textQuery){

                            const text = url.querySelector(query.textQuery);
                            if( text ) {
                                textText = text.textContent;
                            }
                            else {
                                reject(new Error(`Text in ${this.newsSource.url} not found.`));
                                return;
                            }
                        } else {
                            textText = url.textContent;
                        }

                        // getting url from query
                        let urlUrl: string = url.getAttribute('href');
                        if( query.relative ) {
                            urlUrl = this.newsSource.url + urlUrl;
                        }

                        // adding url link
                        linkList.push(new NewsLink(urlUrl, textText, this.newsSource.url, this.newsSource.id));
                    }
                }

                resolve(linkList);

            } catch (e) {
                reject(e);
            }

        } );
    }

    static loadAsync(newsSource: NewsSource) : Promise<NewsDocument>{
        return new Promise<NewsDocument>( async (resolve, reject) => {
            try {

                const dom = await this.loadHtml(newsSource.url, newsSource.encoding);
                const document = new NewsDocument(newsSource, dom);

                resolve(document);

            } catch (e) {

                reject(e);

            }
        });
    }

    private static loadHtml(url: string, encoding: string): Promise<JSDOM> {
        return new Promise<JSDOM>( async ( resolve, reject ) => {
            try{
                // download page
                const result = await this.downloadHtml(url);

                // creating dom
                const dom = new JSDOM(result);
                resolve(dom);

            } catch (e) {

                reject(e);

            }


        } );
    }

    private static async downloadHtml(url: string) : Promise<string> {
        return (await axios.get(url) ).data;
    }

    private static async downloadHtmlEncode(url: string) : Promise<string> {
        const config : AxiosRequestConfig = {
            url: url,
            method: 'GET',
            responseType: 'stream'
        };
        const stream : AxiosResponse<NodeJS.ReadStream> = await axios(config);
        let result = stream.data.read().toString('latin1');
        result = windows1251.decode(result);
        return result;
    }
}

export { NewsDocument };