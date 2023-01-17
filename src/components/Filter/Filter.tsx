import React from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {filterNews} from '../../redux/slice';
import allSelectors from '../../redux/selectors';
import s from './Filter.module.scss';

const Filter: React.FC = () => {
    const dispatch = useAppDispatch();
    const filterValue = useAppSelector(allSelectors.getFilter);

    const onHandlInput = (e: any) => {
        dispatch(filterNews( e.currentTarget.value))
    }
    
    return (
        <div className={s.mainBox}>
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
                onChange={onHandlInput}
            />
        </div>
    );
}

export default Filter;