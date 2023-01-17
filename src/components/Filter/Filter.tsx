import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
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
    useEffect(() => {
        
    }, [])
    return (
        <div className={s.mainBox}>
            <p className={s.text}>Filter by keywords</p>
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                size="small"
                defaultValue={filterValue}
                onChange={onHandlInput}
            />
        </div>
    );
}

export default Filter;