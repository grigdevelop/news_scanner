import { NewsSource } from "./../components/scanner/lib";
import * as underscore from 'underscore';
import { User } from '../entities/user';

interface INewsSourcesServiceContext {
    user: User
}

let dbNewsSources : NewsSource[] = [];

class NewsSourcesService {

    constructor(private context: INewsSourcesServiceContext){

    }

    public async createNewsSource(newsSource : NewsSource) : Promise<NewsSource> {
        //TODO: Validate object

        // mocking identifier
        var id : number = 0;
        dbNewsSources.forEach(ns => { if(ns.id > id) id = ns.id; });
        id += 1;

        // adding to db
        newsSource.id = id;
        // created by user
        newsSource.userId = this.context.user.id;

        dbNewsSources.push(newsSource);

        return newsSource;
    }

    public async updateNewsSource(newsSource: NewsSource) : Promise<NewsSource> {
        //TODO: Validate object

        // wrong id
        if(newsSource.id === 0) throw new Error(`id of newsSource 0 while updating`);

        // user has no access
        if ( newsSource.userId !== this.context.user.id )
            throw new Error('Access for this user denied');

        // remove existing item from array
        const existingItem = dbNewsSources.find(ns => ns.id === newsSource.id);
        if(existingItem == null)
            throw new Error(`Can't find newsSource '${newsSource.url}' by id '${newsSource.id}' while updating`);
        dbNewsSources = underscore.without(dbNewsSources, existingItem);

        // push updated item
        dbNewsSources.push(newsSource);

        return newsSource;
    }

    public async removeNewsSource(id: number) : Promise<void> {

        const newsSource = dbNewsSources.find(ns => ns.id === id && ns.userId === this.context.user.id );

        if( newsSource == null ) throw new Error(`NewsSource by id '${id}' not found.`);

        dbNewsSources = underscore.without(dbNewsSources, newsSource);
    }

    public async getNewsSources() : Promise<NewsSource[]> {

        return dbNewsSources.filter(ns => ns.userId === this.context.user.id );
    }
}

export { NewsSourcesService, INewsSourcesServiceContext };