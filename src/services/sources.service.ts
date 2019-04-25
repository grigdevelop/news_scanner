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

    public async update(source: Source) : Promise<Source> {
        Entity.validateOrThrow(source, Source.validationSchema());

        if(source.userId !== this.context.user.id)
            throw new Error('Permission for change this source denied');
        source = await this.context.repo.update(source);
        return source;
    }

    public async getAll() : Promise<Source[]> {
        return (await this.context.repo.getAll())
            .filter(item => item.userId === this.context.user.id);
    }
}

export { SourcesService, ISourcesServiceContext };