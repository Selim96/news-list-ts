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
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { IArticle } from "../../interfaces/interfaces";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const newsAPI = new NewsAPI();

const Homepage: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const allNews = useAppSelector(allSelectors.getAllNews);
    const filterValue = useAppSelector(allSelectors.getFilter);
    const isLoading = useAppSelector(allSelectors.getLoading);

    const getFilteredNews = () => {
        const newArray: IArticle[] = [];
        let indexToAdd = 0;
        const value = filterValue.trim().toLowerCase();

        if (value !== '') {
            allNews.forEach((item: IArticle) => {
                if (item.title.toLowerCase().includes(value)) {
                    newArray.splice(indexToAdd, 0, item);
                    indexToAdd += 1;
                    return;
                }
                if (item.summary.toLowerCase().includes(value)) {
                    newArray.push(item);
                    return;
                }
            });
            return newArray;
        } else {
            return allNews;
        }
    };

    useEffect(() => {
        dispatch(newsAPI.AllNewsResult())
    }, [dispatch]);

    return isLoading || (allNews.length === 0) ? (<Loader/>) : (
        <Container>
            <div className={s.mainBox}>
                <Filter />

                <p className={s.results}>Results: {getFilteredNews().length }</p>

                <Grid container spacing={2}>
                    {getFilteredNews().map((item: IArticle) => (
                        <Grid item xs={4} key={item.id}>
                            <Item>
                                <ItemFrame item={item} />
                            </Item>
                        </Grid>
                    ))}
                </Grid>
                {/* <ul className={s.newsList}>
                    {}
                </ul> */}
            </div>
        </Container>
        
    );
}

export default Homepage;