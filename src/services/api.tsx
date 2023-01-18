import { createAsyncThunk } from "@reduxjs/toolkit";
import IArticle from '../interfaces';

export class NewsAPI {
    private baseURL = 'https://api.spaceflightnewsapi.net/v3/articles';

    private articleId: string | undefined = '';

    private allNews = createAsyncThunk<IArticle[], undefined, {rejectValue: any}>(
        "news",
        async (_, { rejectWithValue }) => {
            const response = await fetch(`${this.baseURL}`);

            if (!response.ok) {
                return rejectWithValue('Server Error!');
            }
            const news =await response.json();
            return news;
        }
    ); 

    private detailsNews = createAsyncThunk<IArticle[], undefined, {rejectValue: any}>(
        "news",
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


}

// const apiObj = new NewsAPI();
// apiObj.getAllNews()
// console.log(apiObj.getAllNews().fulfilled);