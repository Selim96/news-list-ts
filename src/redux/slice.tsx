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
const allNews = newsAPI.AllNews();
const detailsNews = newsAPI.DetailsNews();

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        filterNews: (state, action: PayloadAction<string>) => {
            state.filteredNews = action.payload; 
        }
    },
    extraReducers:(builder) => {
        builder.addCase(allNews.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(allNews.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.allNews = payload;
        });
        builder.addCase(allNews.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            if (payload) {
                toast.error("Fatal error");
            }
        });
        builder.addCase(detailsNews.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(detailsNews.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.newsDetails = payload;
        });
        builder.addCase(detailsNews.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            if (payload) {
                toast.error("Fatal error");
            }
        });
    }
});

const reducer = newsSlice.reducer;

export const { filterNews } = newsSlice.actions;
export default reducer;