import {Source} from "../entities/source";

interface ISourceRepo {
    add(source: Source) : Promise<Source>;
}

export { ISourceRepo };