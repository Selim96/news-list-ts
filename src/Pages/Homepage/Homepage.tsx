import React from "react";
import { useAppSelector } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import Container from "../../components/Container";
import NewsGallery from '../../components/NewsGallery';
import Filter from "../../components/Filter";
import UpButton from "../../components/UpButton";
import s from './Homepage.module.scss';

const Homepage: React.FC = () => {
    
    const count = useAppSelector(allSelectors.getCount);

    return (
        <Container>
            <main className={s.mainBox}>
                <h1 className={s.title} id="title">All Spaceflight News Of The World</h1>
                <Filter />
                <p className={s.results}>Results: {count}</p>
                <NewsGallery />
                <UpButton/>
            </main>
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