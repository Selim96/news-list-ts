import React, { useEffect, useReducer } from 'react';
import s from './Reportspage.module.scss';
import { Container } from '@mui/material';
import { ReportsAPI } from '../../services/reportsApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import allSelectors from '../../redux/selectors';
import { IReport } from '../../interfaces/interfaces';

const reportsApi = new ReportsAPI();

const Reportspage: React.FC = () => {

    const dispatch = useAppDispatch();
    const allReports = useAppSelector(allSelectors.getAllReports);

    
    useEffect(() => {
        dispatch(reportsApi.getReportsResults());
    }, []);

    return (
        <Container>
            <div className={s.mainBox}>
                <h1 className={s.title} id="title">Reports Page</h1>
                <ul className={s.list}> 
                {allReports.length !== 0 && allReports.map((item: IReport) => 
                    <li key={item.id} className={s.item}>
                        <h2 className={s.reportTitle}>{item.title}</h2>
                        <p className={s.reportSummary}>{item.summary}</p>
                        <p className={s.reportDate}>Published on: {new Date(item.published_at).toLocaleDateString()}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className={s.reportLink}>Read more</a>
                    </li>
                )}
                </ul>
            </div>
        </Container>
        
    )
};

export default Reportspage;