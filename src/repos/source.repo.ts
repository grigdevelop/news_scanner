import {Source} from "../entities";
import * as mongoose from "mongoose";
import {SourceDocument} from "../entities/source";

interface ISourceRepo {
    add(source: Source) : Promise<Source>;
    getAll():Promise<Source[]>;
}

class SourceRepo implements ISourceRepo{

    private readonly table : mongoose.Model<SourceDocument>;

    constructor(db: mongoose.Mongoose){
        this.table =  db.model<SourceDocument>('sources', Source.dbSchema());
    }

    async add(source: Source): Promise<Source> {
        const result = await this.table.insertMany(source);
        return result;
    }

    async getAll() : Promise<Source[]> {
        return await this.table.find();
    }
}

export { ISourceRepo, SourceRepo };