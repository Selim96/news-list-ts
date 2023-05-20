import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

const setActiveLink = ({isActive}: any)=> isActive ? `${s.navigation_link} ${s.active}` : s.navigation_link;

const Navigation: React.FC = () => {
    return <nav className={s.navigation}>
        <NavLink to='/' className={setActiveLink}>Home</NavLink>
        <NavLink to='/reports' className={setActiveLink}>Reports</NavLink>
        <NavLink to='/blog' className={setActiveLink}>Blog</NavLink>
    </nav>
};

export default Navigation;