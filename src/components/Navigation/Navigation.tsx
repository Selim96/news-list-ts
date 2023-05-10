import React from 'react';
import { Link } from 'react-router-dom';
import s from './Navigation.module.scss';

const Navigation: React.FC = () => {
    return <nav className={s.navigation}>
        <Link to='/'>Home</Link>
        <Link to='/reports'>Reports</Link>
        <Link to='/blog'>Blog</Link>
    </nav>
};

export default Navigation;