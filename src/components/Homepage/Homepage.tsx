import React, { useEffect, useState } from "react";
import Container from "../Container";
import Filter from "../Filter";
import s from './Homepage.module.scss';

const Homepage: React.FC = () => {

    useEffect(() => {
        
    }, [])
    return (
        <Container>
            <div className={s.mainBox}>
                <Filter />
                This is Homepage
            </div>
        </Container>
        
    );
}

export default Homepage;