import * as joi from 'joi';
import * as mongoose from 'mongoose';

interface SourceDocument extends Source, mongoose.Document {
    id: any;
}

abstract class Source  {
    id: number;
    title: string;
    url: string;
    encoding: string;
    userId: number;
    queries: SourceQuery[] = [];

    static validationSchema() : joi.ObjectSchema {
        const schema = joi.object().keys({
            id: joi.number(),
            title: joi.string().required(),
            url: joi.string().uri().required(),
            encoding: joi.string().required(),
            userId: joi.number().allow(null),
            queries: joi.array().items(SourceQuery.validationSchema())
        });
        return schema;
    }

    static dbSchema() : mongoose.Schema {
        return new mongoose.Schema<Source>({
            title: { type: String },
            url: { type: String },
            encoding: { type: String },
            userId: { type: Number },
            queries: SourceQuery.dbSchema()
        });
    }
}

class SourceQuery {
    textQuery: string;
    urlQuery: string;
    relative: boolean;

    static validationSchema() : joi.ObjectSchema {
        const schema = joi.object().keys({
            textQuery: joi.string().allow(null),
            urlQuery: joi.string().required(),
            relative: joi.boolean().required()
        });
        return schema;
    }

    static dbSchema() : mongoose.Schema {
      return new mongoose.Schema<SourceQuery>({
          textQuery: { type: String },
          urlQuery: { type: String },
          relative: { type: Boolean }
      });
    };
}


export { Source, SourceQuery, SourceDocument };