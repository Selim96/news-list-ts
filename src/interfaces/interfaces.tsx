export interface IArticle {
    id: number;
    title: string;
    url: string;
    imageUrl: string;
    newsSite: string;
    summary: string;
    publishedAt: string;
    updatedAt: string;
    featured: boolean;
    launches: ({
        id: number;
        provider: string;
    } | null)[];
    events: ({
        id: number;
        provider: string;
    } | null)[];
};

export interface IState {
    allNews: IArticle[];
    filteredNews: string;
    newsDetails: IArticle;
    error: any;
    loading: boolean;
};