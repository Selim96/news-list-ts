import React from 'react';
import { Link } from 'react-router-dom';
import s from './Navigation.module.scss';

const Navigation: React.FC = () => {
    return <nav className={s.navigation}>
        <Link to='/' className={s.navigation_link}>Home</Link>
        <Link to='/reports' className={s.navigation_link}>Reports</Link>
        <Link to='/blog' className={s.navigation_link}>Blog</Link>
    </nav>
};

export default Navigation;