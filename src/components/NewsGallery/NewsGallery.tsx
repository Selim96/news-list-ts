import React, {useState, useEffect, useCallback, useRef} from 'react';
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import ItemFrame from "../ItemFrame";
import Loader from "../Loader/Loader";
import { NewsAPI } from "../../services/api";
import Grid from '@mui/material/Grid';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { IArticle } from "../../interfaces/interfaces";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 400,
    // height: 530,
}));

const theme = createTheme({
    breakpoints: {
    values: {
        xs: 0,
        sm: 480,
        md: 860,
        lg: 1440,
        xl: 1536,
    },
  }
});

// interface IResponse {
//     results: IArticle[];
//     count: number;
//     next: null | string;
//     previous: null | string;
// }

const newsAPI = new NewsAPI();

const NewsGallery: React.FC = () => {
    const [cards, setCards] = useState<IArticle[]>([]);
    const [count, setCount] = useState(0);
    const [isFetching, setIsFetching] = useState(true);
    const notInitialRender = useRef(false)

    const dispatch = useAppDispatch();
    // const allNews = useAppSelector(allSelectors.getAllNews);
    // const count = useAppSelector(allSelectors.getCount);
    const filterValue = useAppSelector(allSelectors.getFilter);
    // const isLoading = useAppSelector(allSelectors.getLoading);

    const onScrollHandler = useCallback((e: any) => {
        if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 250) && count !== cards.length ) {
            console.log('scroll');
            
            setIsFetching(true);
            console.log(newsAPI.getPage());
        }
    }, [cards, count]);

    useEffect(() => {
        document.addEventListener('scroll', onScrollHandler);
        return () => {
            document.removeEventListener('scroll', onScrollHandler);
        }
    }, [onScrollHandler]);

    useEffect(() => {
        if (isFetching) {
            console.log('fetching effect');
            console.log(newsAPI.getPage());
            newsAPI.fetchingNews().then(res => {
                setCards(prev => [...prev, ...res.results]);
                setCount(res.count);
                newsAPI.increasePage();
            }).finally(() => setIsFetching(false));
            dispatch(newsAPI.AllNewsResult());
        }
        // dispatch(newsAPI.AllNewsResult());
        
    }, [isFetching]);

    useEffect(() => {
        console.log('2 effect')
        if (filterValue) {
            console.log('filter effect')
            
            newsAPI.setWordsToFilter(filterValue);
        }
        if (notInitialRender.current) {
            newsAPI.resetPage();
            newsAPI.fetchingNews().then(res => {
                setCards(res.results);
                setCount(res.count);
                newsAPI.increasePage();
            });
            dispatch(newsAPI.AllNewsResult());
        } else {
            notInitialRender.current = true;
        }
        // return () => { newsAPI.setWordsToFilter("") }
    }, [filterValue]);

    const isLoading = false;

    return (<>
        {isLoading ? <Loader /> : <ThemeProvider theme={theme}>
            <Grid container rowSpacing={5} columnSpacing={[0, 0, 2, 6]} >
                {cards.map((item: IArticle) => (
                    <Grid item xs={12} md={6} lg={4} key={item.id}>
                        <Item>
                            <ItemFrame item={item} />
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </ThemeProvider>}
    </>
    );
};

export default NewsGallery;
