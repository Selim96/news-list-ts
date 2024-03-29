import React, {useMemo, useEffect } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {filterNews} from '../../redux/slice';
import allSelectors from '../../redux/selectors';
import debounce from 'lodash.debounce';
import s from './Filter.module.scss';

const Filter: React.FC = () => {
    const dispatch = useAppDispatch();
    const filterValue = useAppSelector(allSelectors.getFilter);

    const onHandlInput = (e: any) => {
        const punctuationless = e.target.value.replace(/[.,'"\/#!?$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
        const finalString = punctuationless.replace(/\s{2,}/g, " ").trim();
        dispatch(filterNews(finalString));
    };

    const debouncedHandler = useMemo(()=> debounce(onHandlInput, 500), []);

    useEffect(() => {
        return () => {
            debouncedHandler.cancel();
        }
    }, [debouncedHandler]);
    
    return (
        <div className={s.mainBox} id="filter">
            <p className={s.text}>Filter by keywords</p>
            <TextField
                id="outlined-basic"
                label=""
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                size="small"
                classes={{root: 'input'}}
                fullWidth={true}
                defaultValue={filterValue}
                onChange={debouncedHandler}
            />
        </div>
    );
}

export default Filter;