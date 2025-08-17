import { createAsyncThunk } from "@reduxjs/toolkit";
import {IArticle, IReport} from '../interfaces/interfaces';
import { NewsAPI } from "./api";

interface IReportResults {
    count: number;
    next: string;
    previous: string | null;
    results: IReport[];
}

export class ReportsAPI extends NewsAPI {

    private reportsEndPoint = '/reports'
    private limitReports = 10;
    private pageReports = 0;
    private inSummeryOrTitle = "";
    private inTitle = "";

    private allReports = createAsyncThunk<IReportResults, undefined, {rejectValue: any}>(
            "allReports",
            async (_, { rejectWithValue }) => {
                const response = await fetch(`${this.baseURL}${this.reportsEndPoint}/?limit=${this.limitReports}&offset=${this.limitReports * this.pageReports}&search=${this.inSummeryOrTitle}&title_contains_one=${this.inTitle}`);
                
                if (!response.ok) {
                    return rejectWithValue('Server Error!');
                }
                const news =await response.json();
                return news;
            }
    );

    public getReports() {
        return this.allReports;
    };

    public getReportsResults(){
        return this.allReports();
    }
}