import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/auth.Api";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../baseButton/BaseButton"
import { Form } from "../../form/Form"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setShowModal } from "../../../storage/modalSlice/modalSlice";

export const ResetPass = () => {

    const [tokenResp, setTokenResp] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({ mode: "onSubmit" });

    const emailRegistr = register('email', {
        required: 'Email обязателен',
    });

    const sendData = async (data) => {
        if (!tokenResp) {
            try {
                await authApi.resetPass(data);
                setTokenResp(true);
                toast.success('Ссылка отправлена на почту')
            } catch (error) {
                toast.error('Что-то пошло не так. Не удалось отправить ссылку')
            }
        } else {
            try {
                const res = await authApi.changePass(data.token, { password: data.password });
                localStorage.setItem('token', res.token)
                navigate('/')
                toast.success("Пароль изменен")
            } catch (error) {
                toast.error('Что-то пошло не так. Не удалось изменить пароль')
            }
        }
    }

    const passwordRegistr = register('password', {
        required: tokenResp ? 'Пароль обязателен' : false,
        pattern: pattern,
    })

     dispatch(setShowModal(true));

    return (
        <>
            <button className='post_btn btn__type__primary' onClick={() => navigate(-1)}>{'< '}Назад</button>
            <Form submitForm={handleSubmit(sendData)} title={'Восстановление пароля'}>
                <div className="auth_controls">
                    <span className="auth__info">Для получения временного пароля необходимо ввести email, указанный при регистрации.</span>
                    <input type='text'
                        {...emailRegistr}
                        placeholder="Email"
                        className="auth_input"
                    />
                    {errors?.email && (
                        <span className="auth_warning">{errors.email?.message}</span>)}
                    {tokenResp && <>
                        <input type={'password'}
                            {...passwordRegistr}
                            placeholder="Password"
                            className="auth_input"
                            disabled={!tokenResp}
                        />
                        {errors?.password && (
                            <span className="auth_warning">{errors.password?.message}</span>)}
                        <input type={'text'}
                            {...register('token', { required: tokenResp ? 'Токен обязателен' : false })}
                            placeholder="token"
                            className="auth_input"
                            disabled={!tokenResp}
                        />
                        {errors?.password && (
                            <span className="auth_warning">{errors.password?.message}</span>)}
                    </>}
                    <span className="auth__info">Срок действия временного пароля 24 ч.</span>
                    <div className="auth__actions">
                        <BaseButton type="submit" color={'blue'}>
                            <span>Отправить</span>
                        </BaseButton>
                    </div>
                </div>
            </Form>
        </>
    )
}