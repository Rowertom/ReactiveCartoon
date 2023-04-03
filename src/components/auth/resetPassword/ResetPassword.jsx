import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/auth.Api";
//import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../baseButton/BaseButton"
import { Form } from "../../form/Form"

export const ResetPass =({setShowModal})=> {
    const [tokenResp, setTokenResp] = useState(null)
    const {register, handleSubmit, formState: {errors}} = useForm({mode:"onSubmit" });
    
    const emailRegistr = register('email',{
        required:'Email обязателен',  
    });

    const sendData= async (data) => {
    if (!tokenResp) {
        try {
            const res=  await authApi.resetPass(data);
            setTokenResp(true);
          } catch (error) {
              alert('Что-то пошло не так')
          }
    } else {
        try {
          const res=  await authApi.changePass(data.token, {password: data.password});
          localStorage.setItem('token', res.token)
        navigate('/')
      } catch (error) {
        alert('Что-то пошло не так')
      }
    }   
    }

    const passwordRegistr = register('password',{
        required: tokenResp ?'Пароль обязателен': false,  
        pattern:pattern,
    })

    useEffect(()=>{
        setShowModal(true);
    },[setShowModal])

    const navigate= useNavigate();

    return(
<>
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
    disabled= {!tokenResp}
    />
    {errors?.password && (
        <span className="auth_warning">{errors.password?.message}</span>)}
<input type={'text'}
       {...register('token', { required: tokenResp ? 'Токен обязателен': false})}
    placeholder="token"
    className="auth_input"
    disabled= {!tokenResp}
    />
    {errors?.password && (
        <span className="auth_warning">{errors.password?.message}</span>)}
</>}

    <span className="auth__info auth__back" onClick={()=>navigate(-1)}>{'<'}Назад</span>    
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