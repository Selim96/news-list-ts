import React from 'react';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import Logo from '../Logo';
import Navigation from '../Navigation';
import ContactBtn from '../ContactBtn';
import s from './Header.module.scss';

const Header: React.FC = () => {
    return <header className={s.header}>
        <Link to={'/'}><Logo/></Link>
        
        <Media queries={{
            small: "(max-width: 480px)",
            medium: "(max-width: 860px)",
            large: "(min-width: 861px)"
        }}>
            {matches => (
            <>
                {matches.medium && <p>I am medium!</p>}
                    {matches.large && <>
                        <Navigation />
                        <ContactBtn />
                    </>}
            </>
            )}
        </Media>
    </header>
};

export default Header;