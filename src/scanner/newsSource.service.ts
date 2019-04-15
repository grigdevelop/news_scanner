import {NewsDocument, NewsLink, NewsSource} from "./lib";
import {IHttpUtil, AsyncUtil, IConfigUtil, ConfigUtil} from "./utils";

interface INewsServiceContext {
    http: IHttpUtil;
}

class NewsSourceService {

    constructor(private context : INewsServiceContext){

    }

    async getSources(): Promise<NewsSource[]> {
        return await this.getSourcesFromJson();
    }

    async scanSources(): Promise<NewsLink[]> {
        const sources : NewsSource[] = await this.getSourcesFromJson();
        const newsLinks : NewsLink[] = [];

        await AsyncUtil.forEach(sources, async ( source : NewsSource ) => {
            const html  = await this.context.http.doGet(source.url);
            const document = await NewsDocument.loadAsync(source, html);
            const links = await document.getAllNewsLinks();

            for(let linkKey in links){
                newsLinks.push(links[linkKey]);
            }
        });

        return newsLinks;
    }

    async scanSource(source: NewsSource) : Promise<NewsLink[]> {
        const html = await this.context.http.doGet(source.url);
        const document = await NewsDocument.loadAsync(source, html);
        return await document.getAllNewsLinks();
    }

    private async getSourcesFromJson() : Promise<NewsSource[]> {
        const configUtil : IConfigUtil  = new ConfigUtil();
        return configUtil.readDataAsync<NewsSource[]>('sources.json');
    }

}

export { NewsSourceService, INewsServiceContext };