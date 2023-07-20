import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setIsMenuClicked } from '../../redux/slice';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

const setActiveLink = ({isActive}: any)=> isActive ? `${s.navigation_link} ${s.active}` : s.navigation_link;

const Navigation: React.FC = () => {

    const dispatch = useAppDispatch();

    const clickToCloseMenu = () => {
        if (window.innerWidth < 860) {
            dispatch(setIsMenuClicked());
        }
    }

    return <nav className={s.navigation}>
        <NavLink to='/' className={setActiveLink} onClick={clickToCloseMenu}>Home</NavLink>
        <NavLink to='/reports' className={setActiveLink} onClick={clickToCloseMenu}>Reports</NavLink>
        <NavLink to='/blog' className={setActiveLink} onClick={clickToCloseMenu}>Blog</NavLink>
    </nav>
};

export default Navigation;