import {NewsDocument, NewsLink, NewsSource} from "./newsSource";
import * as fs from 'fs';
import * as path from 'path';

class NewsSourceService {

    getSources(): Promise<NewsSource[]> {
        return new Promise( async ( resolve, reject) => {
            const sources = this.getSourcesFromJson();
            resolve(sources);
        });
    }

    scanSources(): Promise<NewsLink[]> {
        return new Promise<NewsLink[]>( async (resolve, reject) => {
            try {
                const sources = this.getSourcesFromJson();
                const newsLinks : NewsLink[] = [];

                await this.asyncForeach(sources, async ( source ) => {
                    const document = await NewsDocument.loadAsync(source);
                    const links = await document.getAllNewsLinks();

                    for(let linkKey in links){
                        newsLinks.push(links[linkKey]);
                    }
                });

                resolve(newsLinks);
            } catch (e) {
                reject(e);
            }
        });
    }

    private async asyncForeach<T>(array : T[], callback: (T) => void){
        for (let index = 0; index < array.length; index++) {
            await callback(array[index]);
        }
    }

    private getSourcesFromJson() : NewsSource[] {
        const sPath = path.join(__dirname, '../../', 'sources.json');
        const sources : NewsSource[] = JSON.parse(fs.readFileSync(sPath, 'utf8'));
        return sources;
    }

}

export { NewsSourceService };