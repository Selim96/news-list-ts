import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import allSelectors from '../../redux/selectors';
import Navigation from '../Navigation';
import ContactBtn from '../ContactBtn/ContactBtn';
import { setIsMenuClicked } from '../../redux/slice';
import s from './BurgerMenu.module.scss';

const BurgerMenu: React.FC = () => {

    const [burgerClass, setBurgerClass] = useState([s.burger_bar, s.unclicked]);
    const [menuClass, setMenuClass] = useState([s.menu]);
    const [backdropClass, setBackdropClass] = useState([s.backdrop, s.hidden]);

    const isMenuClicked = useAppSelector(allSelectors.getIsMenuClicked);
    const dispatch = useAppDispatch();

    const updateMenu = () => {
        dispatch(setIsMenuClicked());
    };

    const onBackdropClick = (e: any) => {
        if(e.currentTarget === e.target) dispatch(setIsMenuClicked());
    };

    useEffect(() => {
        if (isMenuClicked) {
            setBurgerClass([s.burger_bar, s.clicked]);
            setMenuClass([s.menu, s.visible]);
            setBackdropClass([s.backdrop]);
        } else {
            setBurgerClass([s.burger_bar, s.unclicked]);
            setMenuClass([s.menu]);
            setBackdropClass([s.backdrop, s.hidden]);
        }
    }, [isMenuClicked]);

    return <>
        <div className={s.burger_menu} onClick={updateMenu}>
            <div className={burgerClass.join(" ")} ></div>
            <div className={burgerClass.join(" ")} ></div>
            <div className={burgerClass.join(" ")} ></div>
        </div>
        <div className={backdropClass.join(" ")} onClick={onBackdropClick}>
        </div>
        <div className={menuClass.join(" ")}>
            <Navigation />
            <ContactBtn />
        </div>
    </>
};

export default BurgerMenu;