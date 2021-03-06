import { QueryNewsLink} from "./queryNewsLink";

class NewsSource {
    public id: number;
    public queries: QueryNewsLink[] = [];
    public url: string;
    public encoding: string;
}

export { NewsSource };