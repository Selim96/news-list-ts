import React, { useEffect, useState } from "react";
import Container from "../Container";
import Filter from "../Filter";
import s from './Homepage.module.scss';

const Homepage: React.FC = () => {

    useEffect(() => {
        
    }, [])
    return (
        <div className={s.mainBox}>
            <Filter />
            This is Homepage
        </div>
    );
}

export default Homepage;