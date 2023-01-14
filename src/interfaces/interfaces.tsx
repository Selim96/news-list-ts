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