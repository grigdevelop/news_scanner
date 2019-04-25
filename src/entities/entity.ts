import * as joi from 'joi';

class Entity{
    static validateOrThrow(obj: any, schema : joi.ObjectSchema){
        const validationResult = joi.validate(obj, schema);
        if ( validationResult.error ) throw validationResult.error;
    }
}

export { Entity };