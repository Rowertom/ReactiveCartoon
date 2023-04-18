import cn from 'classnames';
import './style.css';
import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';

export const Modal = ({ activeModal, children, setShowModal }) => {

    const location = useLocation();
    const onModalKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            setShowModal(false);
        }
    }, [setShowModal]);

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