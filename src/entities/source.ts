import * as joi from 'joi';

class Source {
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
}

export { Source, SourceQuery };