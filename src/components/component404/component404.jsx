import { useNavigate } from "react-router-dom";
import Boom from '../../assets/images/boom2.png';
import './style.scss'

export const Component404 = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="page404">
                <button className="page404__btn" onClick={() => navigate('/')}>
                    На главную
                </button>
                <div className="page404__image">
                <img className="page404__image__img" src={Boom} alt="img_boom" />
                <h2 className="page404__image__content">404 not found</h2>
                </div>

            </div>
        </>
    );
};