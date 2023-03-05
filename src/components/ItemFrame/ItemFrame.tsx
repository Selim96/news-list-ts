import React from "react";
import { Link } from "react-router-dom";
import IArticle from "../../interfaces";
import { useAppSelector } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import s from './ItemFrame.module.scss';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

const ItemFrame: React.FC<IArticle> = ({ item }) => {
    const { title, id, imageUrl, summary, publishedAt, updatedAt } = item;
    const slicedSummary = summary.slice(0, 100) + '...';

    const filterValue: string = useAppSelector(allSelectors.getFilter);
    const trimValue = filterValue.trim().toLowerCase();
    
    const getMarkedText = (text: string) => {
        const wordsArray = text.split(" ");
        const filterArray = trimValue.split(" ");
        
        const result = wordsArray.map((word, index) => {
            const isInFilter = filterArray.some((item: string) => word.toLowerCase() === item);
            if (isInFilter) {
                return <span key={index} className={s.yellow}>{word} </span>
            }
            return <span key={index} >{word} </span>
        });

        return <span>{result}</span> ;
    };
    
    

    return (
        <Link to={`${id}`} >
            <div className={s.frame}>
                <div className={s.imageThumb}>
                    <img src={imageUrl} width='100%' height={217} alt='news' className={s.image} />
                </div>
                <div className={s.frameContent}>
                    <p className={s.dateText}><DateRangeOutlinedIcon fontSize="small" /> {publishedAt || updatedAt ? publishedAt || updatedAt : 'N/A'}</p>
                    {/* <div className={s.animationBox}>
                    </div> */}
                    <h2 className={s.title}>{getMarkedText(title)}</h2>
                    <p className={s.text}>{getMarkedText(slicedSummary)}</p>
                    <p className={s.linkToMore} >Read more <ArrowForwardOutlinedIcon fontSize="small" /></p>
                </div>
            </div>
        </Link>
        
    );
};

export default ItemFrame;

// function getHighlightedWord(text: string, highlight: string) {
    //     const partsText = text.split(new RegExp(`(${highlight})`, 'gi'));
    // return <span> { partsText.map((part, i) => 
    //         <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { backgroundColor: 'yellow' } : {} }>
    //             { part }
    //         </span>)
    //     } </span>;
    // };