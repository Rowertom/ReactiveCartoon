import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/auth.Api";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../baseButton/BaseButton"
import { Form } from "../../form/Form"
import { toast } from "react-toastify";

export const Register = ({ setShowModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onSubmit" });
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    const sendData = async (data) => {
        try {
            await authApi.registerUser({ ...data, group: 'group-10' });
            navigate('/login');
            toast.success('Успешно зарегистрированы')
        } catch (error) {
            toast.error('Не удалось зарегистрироваться');
        }
    }

    const emailRegistr = register('email', {
        required: 'Email обязателен',
    })

    const passwordRegistr = register('password', {
        required: 'Пароль обязателен',
        pattern: pattern,
    })

    useEffect(() => {
        setShowModal(true)
    }, [setShowModal])

    return (
        <>
            <Form submitForm={handleSubmit(sendData)} title={'Регистрация'}>
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
                        <span className="auth_warning" >{errors.password?.message}</span>)}
                    <span className="auth__info">Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
                        Политикой конфиденциальности и соглашаетесь на информационную
                        рассылку.</span>
                    <div className="auth__actions">
                        <BaseButton type="submit" color={'blue'}>
                            <span>Зарегистрироваться</span>
                        </BaseButton>
                        <BaseButton onClick={handleClick} color={'white'}>
                            <span>Войти</span>
                        </BaseButton>
                    </div>
                </div>
            </Form>
        </>
    )
}