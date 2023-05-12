import React, { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { toggleModal } from '../../redux/slice';
import { createPortal } from "react-dom";
import CloseIcon from '@mui/icons-material/Close';
import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root')!;

const Modal: React.FC = () => {

    const dispatch = useAppDispatch();

    const closeModal = useCallback(() => {
        dispatch(toggleModal());
    }, [dispatch]);

    const closeModalByEsc = useCallback((e: any) => {
        if (e.code === 'Escape') {
            closeModal();
        }
    }, [closeModal]);

    const closeModalByClick = (e: any) => {
        if (e.target === e.currentTarget) closeModal();
    };
    const closeModalByButton = (e: any) => {
        closeModal();
    };

    const onSubmit = (e:any) => {
        e.preventDefault();
        closeModal();
    }

    useEffect(() => {
    window.addEventListener("keydown", closeModalByEsc);
    return () => {
      window.removeEventListener("keydown", closeModalByEsc);
    };
  }, [closeModalByEsc]);

    return createPortal(
        <div className={s.overlay} onClick={closeModalByClick}>
            <div className={s.modal}>
                <div className={s.background}></div>
                <span className={s.closeBtn} onClick={closeModalByButton}><CloseIcon/></span>
                <p className={s.text}>This site was create with Spaceflight News API.</p>
                <p className={s.text}>If you have any questions contact author.</p>
                <p className={s.text}>Contacts:</p>
                <ul className={s.contacts}>
                    <li className={s.contacts_item}>
                        <span className={s.contacts_element}>E-mail: </span>
                        <a href="mailto:selim.fazylov1@gmail.com">selim.fazylov1@gmail.com</a>
                    </li>
                    <li className={s.contacts_item}>
                        <span className={s.contacts_element}>Phone: </span>
                        <a href="tel:+380939090496">+380939090496</a>
                    </li>
                    <li className={s.contacts_item}>Kyiv</li>
                </ul>
                <p className={s.text}>Or send a message</p>
                <form onSubmit={onSubmit} className={s.form}>
                    <input type='email' name='email' className={s.input} placeholder='E-mail'/>
                    <textarea name='message' rows={5} cols={10} placeholder="Enter your message here..."/>
                    <button type='submit' className={s.button}>Send</button>
                </form>
                
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;