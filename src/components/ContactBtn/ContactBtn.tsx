import React, { useEffect } from 'react';
import { toggleModal } from '../../redux/slice';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import allSelectors from '../../redux/selectors';
import s from './ContactBtn.module.scss';

const ContactBtn: React.FC = () => {
    const dispatch = useAppDispatch();
    const isOpenModal = useAppSelector(allSelectors.getModal);

    return <button
        type='button'
        className={s.button}
        disabled={isOpenModal}
        onClick={() => {
        dispatch(toggleModal())
    }}>
        Contacts
    </button>
};

export default ContactBtn; 