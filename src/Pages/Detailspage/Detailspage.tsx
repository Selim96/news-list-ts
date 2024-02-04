import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { cleanDetails } from "../../redux/slice";
import allSelectors from '../../redux/selectors';
import { NewsAPI } from "../../services/api";
import Container from "../../components/Container";
import Loader from "../../components/Loader/Loader";
import s from './Detailspage.module.scss';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

const newsAPI = new NewsAPI();

const Detailspage: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(allSelectors.getLoading);
    const newsDetail = useAppSelector(allSelectors.getDetails);

    const { id } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
        dispatch(cleanDetails());
    };

    useEffect(() => {
        newsAPI.setArticleId(id);
        dispatch(newsAPI.DetailsNewsResult());
        return ()=>{
            dispatch(cleanDetails());
        }
    }, [dispatch, id]);

    if (newsDetail !== null) {
        const { title, summary , image_url, news_site, url} = newsDetail;
    
        return (
            <div className={s.main} >
                <div className={s.back} style={{ backgroundImage: `url(${image_url})` }}></div>
                <Container>
                    <div className={s.articleThumb}>
                        <h2 className={s.articleTitle}>{title}</h2>
                        <p className={s.article}>{summary}</p>
                        <div className={s.reference}>
                            <p className={s.reference_text}>See more on:</p>
                            <a className={s.reference_link} href={url} target="blank"><InsertLinkIcon className={s.link_icon}/> {news_site}</a>
                        </div>
                    </div>
                    <button type="button" className={s.button} onClick={handleClick}><WestOutlinedIcon fontSize="small"/> Back to Home</button>
                </Container>
            </div>
        )
    };
    return (isLoading ? <Loader /> : <div>Error</div>)
};

export default Detailspage;