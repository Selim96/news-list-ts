import { createAsyncThunk } from "@reduxjs/toolkit";
import IArticle from '../interfaces';

interface IResults {
    count: number;
    next: string;
    previous: string | null;
    results: IArticle[];
}

// https://api.spaceflightnewsapi.net/v3/articles

export class NewsAPI {
    private baseURL = 'https://api.spaceflightnewsapi.net/v4/articles';
    private limit = 20;

    private articleId: string | undefined = '';

    private allNews = createAsyncThunk<IResults, undefined, {rejectValue: any}>(
        "allNews",
        async (_, { rejectWithValue }) => {
            const response = await fetch(`${this.baseURL}?_limit=${this.limit}`);
            // console.log(await response.json())
            if (!response.ok) {
                return rejectWithValue('Server Error!');
            }
            const news =await response.json();
            return news;
        }
    ); 

    private detailsNews = createAsyncThunk<IArticle[], undefined, {rejectValue: any}>(
        "detailNews",
        async (_, { rejectWithValue }) => {
            const response = await fetch(`${this.baseURL}/${this.articleId}`);

            if (!response.ok) {
                return rejectWithValue('Server Error!');
            }
            const news =await response.json();
            return news;
        }
    );


    public AllNews() {
        return this.allNews;
    };
    public AllNewsResult() {
        return this.allNews();
    };

    public DetailsNews() {
        return this.detailsNews;
    };
    public DetailsNewsResult() {
        return this.detailsNews();
    }

    public getArticleId() {
        return this.articleId;
    }
    public setArticleId(id: string | undefined) {
        this.articleId = id;
    };

    public getBaseURL() {
        return this.baseURL;
    };
    public setBaseURL(url: string) {
        this.baseURL = url;
    };

    public getLimit() {
        return this.limit;
    };
    public setLimit(num: number) {
        this.limit = num;
    };
}
