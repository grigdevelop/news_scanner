import {JSDOM} from "jsdom";
import {NewsSource} from "./newsSource";
import {NewsLink} from "./NewsLink";
import { QueryNewsLink} from "./queryNewsLink";

class NewsDocument {

    private constructor(
        private newsSource: NewsSource,
        private dom: JSDOM){
    }

    public async getAllNewsLinks(): Promise<NewsLink[]> {

        const linkList : NewsLink[] = [];

        for(let queryKey  in this.newsSource.queries){
            const query : QueryNewsLink = this.newsSource.queries[queryKey];

            const urlList = this.dom.window.document.querySelectorAll(query.urlQuery);

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
                        throw new Error(`Text in ${this.newsSource.url} not found.`);
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

        return linkList;
    }

    static async loadAsync(newsSource: NewsSource, html: string) : Promise<NewsDocument>{
        const dom = new JSDOM(html);
        return new NewsDocument(newsSource, dom);
    }
}

export { NewsDocument };