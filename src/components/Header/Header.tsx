import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import Navigation from '../Navigation';
import s from './Header.module.scss';

const Header: React.FC = () => {
    return <header className={s.header}>
        <Link to={'/'}>
            <Logo/>
        </Link>
        <Navigation/>
    </header>
};

export default Header;