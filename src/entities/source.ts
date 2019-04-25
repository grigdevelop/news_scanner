class Source {
    id: number;
    title: string;
    url: string;
    encoding: string;
    queries: SourceQuery[] = []
}

class SourceQuery {
    textQuery: string;
    urlQuery: string;
    relative: boolean
}

export { Source, SourceQuery };