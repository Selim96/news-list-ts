import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import  {IState, IArticle} from "../interfaces/interfaces";
import { NewsAPI } from "../services/api";
import { ReportsAPI } from "../services/reportsApi";

const initialState: IState = {
    allNews: [],
    blogs: [],
    allReports: [],
    nextPage: null,
    count: 0,
    filterWords: '',
    newsDetails: null,
    error: null,
    loading: false,
    modalIsOpen: false,
    isFetching: true,
    isMenuClicked: false,
}

const newsAPI = new NewsAPI();
const allNews = newsAPI.AllNews();
const detailsNews = newsAPI.DetailsNews();
const reportsApi = new ReportsAPI();
const allReports = reportsApi.getReports();


const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        resetAllNews: (state) => {
            state.allNews = [];
        },
        filterNews: (state, action: PayloadAction<string>) => {
            state.filterWords = action.payload;
        },
        cleanDetails: (state) => {
            state.newsDetails = null;
        },
        toggleModal: (state) => {
            state.modalIsOpen = !state.modalIsOpen;
        },
        setIsFetching: (state) => {
            state.isFetching = true;
        },
        setIsMenuClicked: (state) => {
            state.isMenuClicked = !state.isMenuClicked;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(allNews.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(allNews.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.allNews.push(...payload.results);
            state.nextPage = payload.next;
            state.count = payload.count;
            state.isFetching = false;
        });
        builder.addCase(allNews.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            if (payload) {
                toast.error("Fatal error");
            }
        });
        builder.addCase(allReports.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(allReports.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.allReports.push(...payload.results);
        });
        builder.addCase(allReports.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            if (payload) {
                toast.error("Fatal error");
            }
        });
        // builder.addCase(onLoadMore.pending, (state) => {
            
        //     state.error = null;
        // });
        // builder.addCase(onLoadMore.fulfilled, (state, { payload }) => {
            
        //     state.allNews = [...state.allNews, ...payload.results];
        //     state.nextPage = payload.next;
            
        // });
        // builder.addCase(onLoadMore.rejected, (state, { payload }) => {
            
        //     state.error = payload;
        //     if (payload) {
        //         toast.error("Fatal error");
        //     }
        // });

        builder.addCase(detailsNews.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(detailsNews.fulfilled, (state, action: PayloadAction<IArticle>) => {
            state.loading = false;
            state.newsDetails = action.payload;
        });
        builder.addCase(detailsNews.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            if (payload) {
                toast.error("Fatal error");
            }
        });
        builder.addCase(newsAPI.getBlogs.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(newsAPI.getBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = action.payload.results;
        });
        builder.addCase(newsAPI.getBlogs.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            if (payload) {
                toast.error("Fatal error");
            }
        });
    }
});

const reducer = newsSlice.reducer;

export const {resetAllNews, filterNews, cleanDetails, toggleModal, setIsFetching, setIsMenuClicked } = newsSlice.actions;
export default reducer;