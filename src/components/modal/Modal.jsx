import cn from 'classnames';
import './style.css';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowModal } from '../../storage/modalSlice/modalSlice';

export const Modal = ({children}) => {

    const dispatch = useDispatch();
    const activeModal = useSelector(s => s.modal.activeModal);

    const onModalKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            dispatch(setShowModal(false));
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', onModalKeyDown);
        return () => { document.removeEventListener('keydown', onModalKeyDown) }
    }, [onModalKeyDown]);
    return (
        <>
            <div className={cn("modal", { ["active"]: activeModal })}>
                <div className={cn("modal_content", { ["active"]: activeModal })}
                    onClick={(e) => e.stopPropagation()}>{children}
                    </div>
            </div>
        </>
    )
}