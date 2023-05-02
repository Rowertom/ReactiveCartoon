import { useNavigate } from "react-router-dom"


export const BackConnect = () => {

        const navigate = useNavigate();

        return (
                <>
                        <div className="backConnect">
                                <button className='btn btn__type__primary' onClick={() => navigate(-1)}>{'< '}Назад</button>
                                <h1>Обратная связь</h1>
                                <div class="elfsight-app-60ac07b6-6888-4b39-a06f-f8cb1c8ff308"></div>
                        </div>
                </>
        )
}