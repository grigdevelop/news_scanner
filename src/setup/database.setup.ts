import * as mongoose from 'mongoose';
import configs from './../configs';
import {Source, SourceDocument} from "../entities/source";

let instance : IDatabase;
const configure = async () : Promise<IDatabase> => {
    if( !instance ) {
        const db = await mongoose.connect(configs.conn, { useNewUrlParser: true});
        instance =  new Database(db);
    }
    return instance;
};

interface IDatabase {
    readonly sourcesTable : mongoose.Model<SourceDocument>;
}

class Database implements IDatabase {
    public readonly sourcesTable : mongoose.Model<SourceDocument>;

    constructor(private db: mongoose.Mongoose) {
        this.sourcesTable = db.model<SourceDocument>('sources', Source.dbSchema());
    }
}

export default configure;
export { IDatabase };