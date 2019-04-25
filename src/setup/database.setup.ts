import * as mongoose from 'mongoose';
import configs from './../configs';

const configure = async () : Promise<mongoose.Mongoose> => {
    const db = await mongoose.connect(configs.conn, { useNewUrlParser: true});
    return db;
};

export default configure;