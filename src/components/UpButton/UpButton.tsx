import React from 'react';
import { useInView } from "react-intersection-observer";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import s from './UpButton.module.scss';



const UpButton:React.FC = () => {
    const { ref, inView } = useInView({
        threshold: 0
    });

    const buttonStyles = [s.button];
    if (!inView) {
        buttonStyles.push(s.hidden)
    }

    return (
        <div className={s.wrapper}>
            <button className={buttonStyles.join(" ")} disabled={inView} type='button' >
                <a href='#title'>
                    <ArrowUpwardIcon fontSize="large" />
                </a>
            </button>
            <div className={s.scrollview}></div>
            <div ref={ref} className={s.observer}></div>
        </div>
  );
};

export default UpButton;