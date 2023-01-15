import  Interfaces from "../interfaces";

const getAllNews = (state: Interfaces.Istate) => state.allNews;
const getFilter = (state: Interfaces.Istate) => state.filteredNews;
const getDetails = (state: Interfaces.Istate) => state.newsDetails;
const getError = (state:Interfaces.Istate) => state.error;
const getLoading = (state: Interfaces.Istate) => state.loading;

const allSelectors = {
    getAllNews,
    getFilter,
    getDetails,
    getError,
    getLoading
}

export default allSelectors;