import { createAsyncThunk } from "@reduxjs/toolkit";
import IArticle from '../interfaces';

export class NewsAPI {
    static baseURL = 'https://api.spaceflightnewsapi.net/v3/articles';

    private allNews = createAsyncThunk<IArticle[], undefined, {rejectValue: any}>(
        "news",
        async (_, { rejectWithValue }) => {
            const response = await fetch(`${NewsAPI.baseURL}`);

            if (!response.ok) {
                return rejectWithValue('Server Error!');
            }
            const news =await response.json();
            return news;
        }
    ); 
    
    // constructor() {
    //     this.allNews = createAsyncThunk<IArticle[], string>(
    //     "news",
    //     async (_, { rejectWithValue }) => {
    //         const response = await fetch(`${NewsAPI.baseURL}`);

    //         if (!response.ok) {
    //             return rejectWithValue('Server Error!');
    //         }
    //         const news =await response.json();
    //         return news;
    //     }
    // );
    // }

    public getAllNews() {
        return this.allNews;
    }

    public getResult() {
        return this.allNews();
    }

    static getBaseURL() {
        return NewsAPI.baseURL;
    }

    static setBaseURL(url: string) {
        NewsAPI.baseURL = url;
    }
}

// const apiObj = new NewsAPI();
// apiObj.getAllNews()
// console.log(apiObj.getAllNews().fulfilled);