import React from "react";
import { Link } from "react-router-dom";
import IArticle from "../../interfaces";
import { useAppSelector } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import s from './ItemFrame.module.scss';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';


const ItemFrame: React.FC<IArticle> = ({ item }) => {
    const { title, url, id, imageUrl, newsSite, summary, publishedAt, updatedAt } = item;

    const filterValue = useAppSelector(allSelectors.getFilter);
    
    const toMarkText = () => {
        const trimedValue = filterValue.trim().toLowerCase();
        if (trimedValue !== "") {
            // const isIncludeTitle = title.includes(trimedValue);
            const isIncludeSummary = summary.includes(trimedValue);
            if (title.includes(trimedValue)) {
                const startMatch = title.indexOf(trimedValue)
            }
        }
    };

    
    const slicedSummary = summary.slice(0, 100) + '...';

    return (
        <div className={s.frame}>
            <div className={s.imageThumb}>
                <img src={imageUrl} width='100%' height={217} alt='news' className={s.image} />
            </div>
            <div className={s.frameContent}>
                <p><DateRangeOutlinedIcon fontSize="small" /> {publishedAt || updatedAt ? publishedAt || updatedAt : 'N/A'}</p>
                {/* <div className={s.animationBox}>
                </div> */}
                <h2 className={s.title}>{title}</h2>
                <p className={s.text}>{slicedSummary}</p>
                <Link to={`${id}`} className={s.linkToMore} >Read more <ArrowForwardOutlinedIcon fontSize="small"/></Link>
            </div>
        </div>
    )
};

export default ItemFrame;

