import React, {useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import IArticle from "../../interfaces";
import { useAppSelector } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import s from './ItemFrame.module.scss';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { nanoid } from 'nanoid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// const  {Mark} = require('mark.js') ;

const text = 'lalala!!! fff? aaaaaa';

const myReg = new RegExp('la', 'gi');
const myArr = myReg.exec(text);

const partsText = text.split(new RegExp('fff', 'gi'));

console.log()



const punctuationless = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
const finalString = punctuationless.replace(/\s{2,}/g, " ");


const ItemFrame: React.FC<IArticle> = ({ item }) => {
    const [styles, setStyles] = useState([s.image]);

    const { title, id, image_url, summary, published_at, updated_at } = item;
    const slicedTitle = title.length > 60 ? title.slice(0, 60) + '...' : title;
    const slicedSummary = summary.slice(0, 100) + '...';

    const filterValue: string = useAppSelector(allSelectors.getFilter);
    const trimFilterValue = filterValue.trim().toLowerCase();
    
    const getMarkedText = useMemo(() => (text: string) => {
        const wordsArray = text.split(" ");
        const filterArray = trimFilterValue.split(" ");
        const idForKey = nanoid();
        
        const result = wordsArray.map((word, index) => {
            const punctuationIndex = word.search(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g);
        
            const isInFilter = filterArray.some((item: string) => {
                if (punctuationIndex !== -1) {
                    if (punctuationIndex === 0) {
                        const pureWord = word.slice(1, word.length);
                        return pureWord.toLowerCase() === item;
                    } else {
                        const pureWord = word.slice(0, punctuationIndex);
                        // console.log(pureWord)
                        return pureWord.toLowerCase() === item;
                    }
                }
                return word.toLowerCase() === item;
            });
            if (isInFilter) {
                // if (punctuationIndex !== -1) {
                //     const first = word.slice(0, punctuationIndex);
                //     const second = word.slice(punctuationIndex, word.length);
                //     return <>
                //         <li key={`${idForKey}-${index}-0`} className={s.yellow}>{first}</li>
                //         <li key={`${idForKey}-${index}-1`}>{second}</li>
                //     </>
                // }
                return <li key={`${idForKey}-${index}`} className={s.yellow}>{word}</li>;
            }
            return <li key={`${idForKey}-${index}`}>{word} </li>;
        });
        
        return result;
    }, [trimFilterValue]);

    const onLoadCallback = useCallback(() => {setStyles([...styles, s.onloadedImage])}, [styles]);

    const date = new Date(published_at);
    const publishedAt = date.toDateString().split(" ").slice(1).join(" ");

    return (
        <>
        <Link to={`${id}`} >
            <div className={s.frame}>
                {/* <ImegeItem image_url={image_url} /> */}
                
                <div className={s.imageThumb}>
                        <LazyLoadImage src={image_url} alt='Image alt' width='100%' height={217} className={styles.join(' ')} onLoadCapture={onLoadCallback} />
                    {/* <img src={image_url} width='100%' height={217} alt='news' className={styles.join(' ')} loading="lazy" onLoad={addAnimationOnload}/> */}
                </div>
                <div className={s.frameContent}>
                    <p className={s.dateText}><DateRangeOutlinedIcon fontSize="small" /> {publishedAt}</p>
                    <div className={s.animationBox}>
                        {trimFilterValue ? <ul className={`${s.textList} ${s.title}`}>{getMarkedText(title)}</ul> : <h2 className={s.title}>{slicedTitle}</h2>}
                    </div>
                    {trimFilterValue ? <ul className={`${s.textList} ${s.text}`}>{getMarkedText(slicedSummary)}</ul> : <p className={s.text}>{slicedSummary}</p>}
                    <p className={s.linkToMore} >Read more <ArrowForwardOutlinedIcon fontSize="small" /></p>
                </div>
            </div>
        </Link>
            {/* <button onClick={addAnimationOnload}>Click</button> */}
        </>
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