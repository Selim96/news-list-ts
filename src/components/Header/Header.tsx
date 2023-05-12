import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import Navigation from '../Navigation';
import ContactBtn from '../ContactBtn';
import s from './Header.module.scss';

const Header: React.FC = () => {
    return <header className={s.header}>
        <Link to={'/'}>
            <Logo/>
        </Link>
        <Navigation />
        <ContactBtn/>
    </header>
};

export default Header;