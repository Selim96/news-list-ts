export interface IArticle {
    id: number;
    title: string;
    url: string;
    image_url: string | null;
    news_site: string;
    summary: string;
    published_at: string;
    updated_at: string;
    featured: boolean;
    launches: ({
        id: string;
        provider: string;
    } | null)[];
    events: ({
        id: number | string;
        provider: string;
    } | null)[];
};

export interface IState {
    allNews: IArticle[];
    nextPage: string | null;
    count: number;
    filteredNews: string;
    newsDetails: IArticle;
    error: any;
    loading: boolean;
    modalIsOpen: boolean;
};