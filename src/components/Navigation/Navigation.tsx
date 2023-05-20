import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

const Navigation: React.FC = () => {
    return <nav className={s.navigation}>
        <NavLink to='/' className={({isActive, isPending})=> isPending ? s.navigation_link : isActive ? `${s.navigation_link} ${s.active}` : s.navigation_link}>Home</NavLink>
        <NavLink to='/reports' className={({isActive, isPending})=> isPending ? s.navigation_link : isActive ? `${s.navigation_link} ${s.active}` : s.navigation_link}>Reports</NavLink>
        <NavLink to='/blog' className={({isActive, isPending})=> isPending ? s.navigation_link : isActive ? `${s.navigation_link} ${s.active}` : s.navigation_link}>Blog</NavLink>
    </nav>
};

export default Navigation;