import {Source} from "../entities/source";
import {ISourceRepo} from "../repos/source.repo";

interface ISourcesServiceContext {
    repo : ISourceRepo;
}

class SourcesService {

    constructor(private context: ISourcesServiceContext){

    }

    public async create(source: Source) : Promise<Source> {
        source = await this.context.repo.add(source);
        return source;
    }
}

export { SourcesService, ISourcesServiceContext };