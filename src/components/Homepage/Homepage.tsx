import React, { useEffect, useState } from "react";
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

const Homepage: React.FC = () => {
    const newsAPI = new NewsAPI();
    const dispatch = useAppDispatch();
    const allNews = useAppSelector(allSelectors.getAllNews);
    const isLoading = useAppSelector(allSelectors.getLoading);
    console.log(isLoading)
    console.log(allNews)

    useEffect(() => {
        dispatch(newsAPI.getResult())
    }, [dispatch]);

    return isLoading || (allNews.length === 0) ? (<Loader/>) : (
        <Container>
            <div className={s.mainBox}>
                <Filter />
                <p className={s.results}>Results:</p>
                <Grid container spacing={2}>
                    {allNews.map((item: IArticle) => (
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