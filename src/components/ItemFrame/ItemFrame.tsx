import React, {useEffect} from "react";
import IArticle from "../../interfaces";
import { useAppSelector } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import s from './ItemFrame.module.scss';


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


    useEffect(() => {

    }, []);

    
    const slicedSummary = summary.slice(0, 100) + '...';

    return (
        <div className={s.frame}>
            <img src={imageUrl} width='100%' height={217} alt='news' />
            <div className={s.frameContent}>
                <p>{publishedAt || updatedAt ? publishedAt || updatedAt : 'N/A'}</p>
                <h2>{title}</h2>
                <p>{slicedSummary}</p>
                <button type="button">Read more</button>
            </div>
        </div>
    )
};

export default ItemFrame

