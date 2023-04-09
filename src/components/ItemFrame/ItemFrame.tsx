import React from "react";
import { Link } from "react-router-dom";
import IArticle from "../../interfaces";
import { useAppSelector } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import s from './ItemFrame.module.scss';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { v4 as uuidv4 } from 'uuid';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const ItemFrame: React.FC<IArticle> = ({ item }) => {
    const { title, id, image_url, summary, published_at, updated_at } = item;
    const slicedSummary = summary.slice(0, 100) + '...';

    const filterValue: string = useAppSelector(allSelectors.getFilter);
    const trimValue = filterValue.trim().toLowerCase();
    
    const getMarkedText = (text: string) => {
        const wordsArray = text.split(" ");
        const filterArray = trimValue.split(" ");

        console.log(wordsArray)
        
        const result = wordsArray.map((word, index) => {
            const isInFilter = filterArray.some((item: string) => word.toLowerCase() === item);
            if (isInFilter) {
                return <>
                        <span key={uuidv4()} className={s.yellow}>{word}</span>
                    </>
            }
            return <span key={uuidv4()} >{word} </span>
        });

        return <span>{result}</span> ;
    };
    
    

    return (
        <Link to={`${id}`} >
            <div className={s.frame}>
                <div className={s.imageThumb}>
                    <img src={image_url} width='100%' height={217} alt='news' className={s.image} />
                </div>
                <div className={s.frameContent}>
                    <p className={s.dateText}><DateRangeOutlinedIcon fontSize="small" /> {published_at || updated_at ? published_at || updated_at : 'N/A'}</p>
                    {/* <div className={s.animationBox}>
                    </div> */}
                    <h2 className={s.title}>{trimValue ? getMarkedText(title) : title}</h2>
                    <p className={s.text}>{trimValue ? getMarkedText(slicedSummary) : slicedSummary}</p>
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