import { User } from "./user.service";
import { NewsSource } from "./../components/scanner/lib";

interface INewsSourcesServiceContext {
    user: User
}

const dbNewsSources : NewsSource[] = [];

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
        dbNewsSources.push(newsSource);

        return newsSource;
    }

}

export { NewsSourcesService };