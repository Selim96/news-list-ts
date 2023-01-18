import { createAsyncThunk } from "@reduxjs/toolkit";
import IArticle from '../interfaces';

export class NewsAPI {
    private baseURL = 'https://api.spaceflightnewsapi.net/v3/articles';
    private limit = 20;

    private articleId: string | undefined = '';

    private allNews = createAsyncThunk<IArticle[], undefined, {rejectValue: any}>(
        "allNews",
        async (_, { rejectWithValue }) => {
            const response = await fetch(`${this.baseURL}?_limit=${this.limit}`);

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
