import React, { useState } from 'react';
import s from './BurgerMenu.module.scss';

const BurgerMenu: React.FC = () => {

    const [burgerClass, setBurgerClass] = useState([s.burger_bar, s.unclicked]);
    const [menuClass, setMenuClass] = useState([s.menu, s.hidden]);
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const updateMenu = () => {
        
    };

    return <div>
        <div className={s.burger_menu}>
            <div className={burgerClass.join(" ")} onClick={updateMenu}></div>
            <div className={burgerClass.join(" ")} onClick={updateMenu}></div>
            <div className={burgerClass.join(" ")} onClick={updateMenu}></div>
        </div>

        <div className={menuClass.join(" ")}>

        </div>
    </div>
};

export default BurgerMenu;