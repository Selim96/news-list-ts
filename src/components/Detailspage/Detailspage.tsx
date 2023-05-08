import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { cleanDetails } from "../../redux/slice";
import allSelectors from '../../redux/selectors';
import { NewsAPI } from "../../services/api";
import Container from "../Container";
import Loader from "../Loader/Loader";
import s from './Detailspage.module.scss';
import { IArticle } from "../../interfaces/interfaces";
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';

const newsAPI = new NewsAPI();

const Detailspage: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(allSelectors.getLoading);
    const newsDetail: IArticle = useAppSelector(allSelectors.getDetails);

    const { id } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
        dispatch(cleanDetails());
    };

    useEffect(() => {
        newsAPI.setArticleId(id);
        dispatch(newsAPI.DetailsNewsResult());
        
    }, [dispatch, id]);

    if (newsDetail !== null) {
        const { title, summary , image_url } = newsDetail;
    
        return (
            <div className={s.main} >
                <div className={s.back} style={{ backgroundImage: `url(${image_url})` }}></div>
                <Container>
                    <div className={s.articleThumb}>
                        <h2 className={s.articleTitle}>{title}</h2>
                        <p className={s.article}>{summary}</p>
                    </div>
                    <button type="button" className={s.button} onClick={handleClick}><WestOutlinedIcon fontSize="small"/> Back to homepage</button>
                </Container>
            </div>
        )
    };
    return (isLoading && <Loader />)
};

export default Detailspage;