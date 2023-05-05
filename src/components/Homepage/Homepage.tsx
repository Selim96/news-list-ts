import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import { NewsAPI } from "../../services/api";
import Container from "../Container";
import Filter from "../Filter";
import ItemFrame from "../ItemFrame";
import Loader from "../Loader/Loader";
import s from './Homepage.module.scss';
import Grid from '@mui/material/Grid';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { IArticle } from "../../interfaces/interfaces";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 400,
    // height: 530,
}));

const theme = createTheme({
    breakpoints: {
    values: {
        xs: 0,
        sm: 480,
        md: 860,
        lg: 1440,
        xl: 1536,
    },
  }
});

const newsAPI = new NewsAPI();

const Homepage: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const allNews = useAppSelector(allSelectors.getAllNews);
    const count = useAppSelector(allSelectors.getCount);
    const filterValue = useAppSelector(allSelectors.getFilter);
    const isLoading = useAppSelector(allSelectors.getLoading);

    useEffect(() => {
        if (filterValue) {
            newsAPI.setWordsToFilter(filterValue);
        }
        dispatch(newsAPI.AllNewsResult());
        return () => {
            newsAPI.setWordsToFilter("");
        }
    }, [dispatch, filterValue]);

    return (
        <Container>
            <div className={s.mainBox}>
                <Filter />

                <p className={s.results}>Results: {count}</p>

                {isLoading ? <Loader/> : <ThemeProvider theme={theme}>
                    <Grid container rowSpacing={5} columnSpacing={[0, 0, 2, 6]} >
                        {allNews.map((item: IArticle) => (
                            <Grid item xs={12} md={6} lg={4} key={item.id}>
                                <Item>
                                    <ItemFrame item={item} />
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </ThemeProvider>}
                
            </div>
        </Container>)
}

export default Homepage;

// const getFilteredNews = () => {
//         const newArray: IArticle[] = [];
//         let indexToAdd = 0;
//         const value: string[] = filterValue.trim().toLowerCase().split(" ");

//         if (value.join(" ") !== "") {
//             allNews.forEach((item: IArticle) => {
//                 const isInTitle = item.title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g, " ").toLowerCase().split(" ").some((item) => value.some((elem: string) => elem === item));
//                 if (isInTitle) {
//                     newArray.splice(indexToAdd, 0, item);
//                     indexToAdd += 1;
//                     return;
//                 }

//                 const isInSummary = item.summary.toLowerCase().split(" ").some((item) => value.some((elem: string) => elem === item));
//                 if (isInSummary) {
//                     newArray.push(item);
//                     return;
//                 }
//             });
//             return newArray;
//         } else {
//             return allNews;
//         }
//     };