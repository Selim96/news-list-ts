import { createAsyncThunk } from "@reduxjs/toolkit";
import IArticle from '../interfaces';

interface IResults {
    count: number;
    next: string;
    previous: string | null;
    results: IArticle[];
}

// https://api.spaceflightnewsapi.net/v3/articles
const str ='https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=0&summary_contains_one=%2C+&title_contains_one=nasa%2C%20space'

export class NewsAPI {
    private baseURL = 'https://api.spaceflightnewsapi.net/v4/articles/';
    private limit = 20;
    private ofset = 0;
    private wordInSummery = "";
    private wordInTitle = "";

    private articleId: string | undefined = '';

    private allNews = createAsyncThunk<IResults, undefined, {rejectValue: any}>(
        "allNews",
        async (_, { rejectWithValue }) => {
            const response = await fetch(`${this.baseURL}?limit=${this.limit}&offset=${this.ofset}&summary_contains_one=${this.wordInSummery}&title_contains_one=${this.wordInTitle}`);
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
            const response = await fetch(`${this.baseURL}${this.articleId}`);

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

    public setWordsToFilter(string: string) {
        const finalString = string.replace(/\s{1,}/g, "%2C%20");
        console.log(finalString)
        this.wordInSummery = finalString;
        this.wordInTitle = finalString;
    }
}
