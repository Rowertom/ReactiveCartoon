import { useNavigate } from 'react-router-dom'
import './style.css'
import { BaseButton } from '../baseButton/BaseButton'
import { useForm } from 'react-hook-form'
import { Form } from '../form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../storage/userSlice/userSlice'
import { useState } from 'react'
import { ReactComponent as Pen } from '../../assets/icons/pen.svg'

export const Profile = () => {

   const navigate = useNavigate()
   const [able, setAble] = useState(true);

   const { register,
      handleSubmit,
      formState: { errors }
   } = useForm({ mode: "onSubmit" });

   const dispatch = useDispatch();
   const currentUser = useSelector(s => s.user.data);

   //  меняем аватар пользователя
   const sendAvatar = async ({ avatar }) => {
         await dispatch(updateUser({avatar: avatar}));
         setAble( state => !state);
   }

   // изменяем данные пользователя
   const sendProfileData = async (data) => {
         await dispatch(updateUser({ name: data.name, about: data.about }));
         setAble( state => !state);
   }

   const required = {
      required: {
         value: true
      }
   }

   //доступ для редактирования
   function handleWrite() {
      setAble( state => !state);
   }

   return (
      <>
         <button className='post_btn btn__type__primary' onClick={() => navigate(-1)}>{'< '}Назад</button>
         <div className="profile">
            <div className='profile__header'>
               <h1>Мои данные</h1>
               <button className="header__change" onClick={() => handleWrite()}><Pen/>редактировать</button>
            </div>
            {currentUser?.name && currentUser?.about && (<>
               <Form submitForm={handleSubmit(sendProfileData)}>
                  <div className='profile__user'>
                     <input {...register('name', required)} className='profile_input' defaultValue={currentUser.name} type="text" placeholder='name' readOnly={able}></input>
                     <input {...register('about', required)} className='profile_input' defaultValue={currentUser.about} placeholder='about' readOnly={able}></input>
                     <input {...register('email')} className='profile_input' defaultValue={currentUser?.email} disabled placeholder='email'></input>
                     <input {...register('id')} className='profile_input' defaultValue={currentUser?._id} disabled placeholder='id'></input>
                     {!able && <BaseButton type="submit" color={'blue'}>Отправить</BaseButton>}
                  </div>
               </Form>
               <div className='profile__avatar'>
                  <Form submitForm={handleSubmit(sendAvatar)}>
                     <div className='profile__user'>
                        <img className='profile__avatar-img' src={currentUser.avatar} alt='avatar'></img>
                        <input className='profile_input' {...register('avatar')} defaultValue={currentUser?.avatar} placeholder='avatar' readOnly={able}></input>
                        {!able && <BaseButton type="submit" color={'blue'}>Отправить</BaseButton>}
                     </div>
                  </Form>
               </div></>)
            }
         </div>
      </>)
}