import React from "react";
import { useAppSelector } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import Container from "../Container";
import NewsGallery from '../NewsGallery';
import Filter from "../Filter";
import s from './Homepage.module.scss';

const Homepage: React.FC = () => {
    
    const count = useAppSelector(allSelectors.getCount);

    return (
        <Container>
            <div className={s.mainBox}>
                <Filter />
                <p className={s.results}>Results: {count}</p>
                <NewsGallery/>
            </div>
        </Container>)
}

export default Homepage;

// const getFilteredNews = () => {
//         const newArray: IArticle[] = [];
//         let indexToAdd = 0;
//         const value: string[] = filterValue.trim().toLowerCase().split(" ");

//         if (value.join(" ") !== "") {
//             allNews.forEach((item: IArticle) => {
//                 const isInTitle = item.title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g, " ").toLowerCase().split(" ").some((item) => value.some((elem: string) => elem === item));
//                 if (isInTitle) {
//                     newArray.splice(indexToAdd, 0, item);
//                     indexToAdd += 1;
//                     return;
//                 }

//                 const isInSummary = item.summary.toLowerCase().split(" ").some((item) => value.some((elem: string) => elem === item));
//                 if (isInSummary) {
//                     newArray.push(item);
//                     return;
//                 }
//             });
//             return newArray;
//         } else {
//             return allNews;
//         }
//     };