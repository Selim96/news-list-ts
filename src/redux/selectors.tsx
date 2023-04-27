import  Interfaces from "../interfaces";

const getAllNews = (state: Interfaces.Istate) => state.allNews;
const getCount = (state: Interfaces.Istate) => state.count;
const getNextPage = (state: Interfaces.Istate) => state.nextPage;
const getFilter = (state: Interfaces.Istate) => state.filteredNews;
const getDetails = (state: Interfaces.Istate) => state.newsDetails;
const getError = (state:Interfaces.Istate) => state.error;
const getLoading = (state: Interfaces.Istate) => state.loading;

const allSelectors = {
    getAllNews,
    getCount,
    getNextPage,
    getFilter,
    getDetails,
    getError,
    getLoading
}

export default allSelectors;