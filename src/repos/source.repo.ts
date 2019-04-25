import {Source} from "../entities";
import { IDatabase } from "../setup/database.setup";

interface ISourceRepo {
    add(source: Source) : Promise<Source>;
    update(source: Source): Promise<Source>;
    getAll():Promise<Source[]>;
}

class SourceRepo implements ISourceRepo{

    constructor(private db: IDatabase){
    }

    async add(source: Source): Promise<Source> {
        const result = await this.db.sourcesTable.insertMany(source);
        return result;
    }

    async update(source: Source): Promise<Source> {
        // TODO: update result is different
        /* something like this
            n: 1
            nModified: 1
            ok: 1
         */
        const result = await this.db.sourcesTable.update({_id: source._id}, source);
        return result;
    }

    async getAll() : Promise<Source[]> {
        return await this.db.sourcesTable.find();
    }
}

export { ISourceRepo, SourceRepo };