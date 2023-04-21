import { useForm } from "react-hook-form";
import { Form } from "../../form/Form"
import '../style.css';
import { BaseButton } from "../../baseButton/BaseButton";
import { useNavigate } from "react-router-dom";
import { pattern } from "../../../utils/validations";
import { useEffect } from "react";
import { authApi } from "../../../utils/auth.Api";


export const Login = ({ setShowModal }) => {
    const { register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({ mode: "onSubmit" });
    
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/register');
    }

    const emailRegistr = register('email', {
        required: 'Email обязателен',
    })
    const passwordRegistr = register('password', {
        required: 'Пароль обязателен',
        pattern,
    })

    useEffect(() => {
        setShowModal(true)
    }, [setShowModal])

    const sendData = async (data) => {
        try {
            const res = await authApi.login(data);
            localStorage.setItem('token', res.token);
            navigate('/')
        } catch (error) {
            alert('Неправильные логин и пароль')
        }
    }


    return (
        <>
            <Form submitForm={handleSubmit(sendData)} title={'Вход'}>
                <div className="auth_controls">
                    <input type='text'
                        {...emailRegistr}
                        placeholder="Email"
                        className="auth_input"
                    />
                    {errors?.email && (
                        <span className="auth_warning">{errors.email?.message}</span>)}
                    <input type={'password'}
                        {...passwordRegistr}
                        placeholder="Password"
                        className="auth_input"
                    />
                    {errors?.password && (
                        <span className="auth_warning">{errors.password?.message}</span>)}
                    <span className="auth__info auth_link" onClick={() => navigate('/reset-password')}>Восстановить пароль</span>
                    <div className="auth__actions">
                        <BaseButton type="submit" color={'blue'}>
                            <span>Войти</span>
                        </BaseButton>
                        <BaseButton onClick={handleClick} color={'white'}>
                            <span>Регистрация</span>
                        </BaseButton>
                    </div>
                </div>
            </Form>
        </>
    )
}