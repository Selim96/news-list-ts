import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import { NewsAPI } from "../../services/api";
import Container from "../Container";
import Loader from "../Loader/Loader";
import s from './Detailspage.module.scss';

const Detailspage: React.FC = () => {
    const newsAPI = new NewsAPI();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(allSelectors.getLoading);
    const newsDetail = useAppSelector(allSelectors.getDetails);

    const { id } = useParams();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };

    

    useEffect(() => {
        newsAPI.setArticleId(id);
        dispatch(newsAPI.DetailsNewsResult());
    }, [dispatch, id]);


    return isLoading ? (<Loader/>) : (
        <Container>
            This is details page
        </Container>
    )
};

export default Detailspage;