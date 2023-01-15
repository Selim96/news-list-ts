import { createAsyncThunk } from "@reduxjs/toolkit";
import IArticle from '../interfaces';

export class NewsAPI {
    static baseURL = 'https://api.spaceflightnewsapi.net/v3/articles';

    private allNews = createAsyncThunk<IArticle[], string>(
        "news",
        async (_, { rejectWithValue }) => {
            const response = await fetch(`${NewsAPI.baseURL}`);

            if (!response.ok) {
                return rejectWithValue('Server Error!');
            }
            const news = response.json();
            return news;
        }
    );

    getAllNews() {
        return this.allNews;
    }

    static getBaseURL() {
        return NewsAPI.baseURL;
    }

    static setBaseURL(url: string) {
        NewsAPI.baseURL = url;
    }
}

const apiObj = new NewsAPI();
apiObj.getAllNews()
console.log(apiObj.getAllNews().fulfilled);