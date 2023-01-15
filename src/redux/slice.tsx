import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import  Interfaces from "../interfaces";
import { NewsAPI } from "../services/api";

const initialState: Interfaces.IState = {
    allNews: [],
    filteredNews: '',
    newsDetails: null,
    error: null,
    loading: false
}

const newsAPI = new NewsAPI();

const newsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        addDetails: (state, action: PayloadAction<string>) => {
            const index: number = state.allNews.findIndex((elem: Interfaces.IArticle) => elem.id === action.payload);
            state.newsDetails = state.allNews[index]
        },
        filterNews: (state, action: PayloadAction<string>) => {
            state.filteredNews = action.payload; 
        }
    },
    extraReducers: builder => {
        builder.addCase(newsAPI.getAllNews().pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(newsAPI.getAllNews().fulfilled, (state, { payload }) => {
            state.loading = false;
            state.allNews = payload;
        });
        builder.addCase(newsAPI.getAllNews().rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            if (payload) {
                toast.error("Fatal error");
            }
        });
    }
});

const reducer = newsSlice.reducer;

export const { addDetails, filterNews } = newsSlice.actions;
export default reducer;