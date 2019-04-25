import {ISourceRepo} from "../repos/source.repo";
import {User, Source, Entity } from "../entities";

interface ISourcesServiceContext {
    repo : ISourceRepo;
    user: User
}

class SourcesService {

    constructor(private context: ISourcesServiceContext){

    }

    public async create(source: Source) : Promise<Source> {

        Entity.validateOrThrow(source, Source.validationSchema());

        source.userId = this.context.user.id;
        source = await this.context.repo.add(source);
        return source;
    }
}

export { SourcesService, ISourcesServiceContext };