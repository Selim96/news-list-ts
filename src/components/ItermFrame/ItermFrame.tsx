import React from "react";
import  IArticle  from "../../interfaces";
import s from './ItermFrame.module.scss';

// interface IArticle {
//     id: number;
//     title: string;
//     url: string;
//     imageUrl: string;
//     newsSite: string;
//     summary: string;
//     publishedAt: string;
//     updatedAt: string;
//     featured: boolean;
//     launches: ({
//         id: number;
//         provider: string;
//     } | null)[];
//     events: ({
//         id: number;
//         provider: string;
//     } | null)[];
// };

const ItermFrame: React.FC<IArticle> = ({ item }) => {
    const { title, url, id, imageUrl, newsSite, summary, publishedAt, updatedAt } = item;
    const slicedSummary = summary.slice(0, 100)

    return (
        <div className={s.frame}>
            <img src={imageUrl} width='100%' height={217} alt='news' />
            <div className={s.frameContent}>
                <p>{publishedAt | updatedAt ? publishedAt | updatedAt : 'N/A'}</p>
                <h2>{title}</h2>
                <p>{slicedSummary}</p>
            </div>
        </div>
    )
};

export default ItermFrame