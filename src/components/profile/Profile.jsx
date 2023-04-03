import { useNavigate } from 'react-router-dom'
import './style.css' 
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { api } from '../../utils/Api'
import { BaseButton } from '../baseButton/BaseButton'
import { useForm } from 'react-hook-form'
import { Form } from '../form/Form'

export const Profile=()=>{
const {currentUser, setCurrentUser}= useContext(UserContext)
const navigate=useNavigate()

const { register, 
   handleSubmit, 
   formState: { errors }
 } = useForm({ mode: "onSubmit" });


const sendAvatar= async ({avatar})=>{
   try {
   const newUser = await api.updateAvatar({avatar: avatar})
   setCurrentUser({...newUser})
   alert ('Аватар усешно изменен') 
     } catch (error) {
      alert ('Аватар изменить не удалось')  
   }}

const sendProfileData = async (data) => {
   try {
   const newUser= await api.updateUserInfo({name: data.name, about: data.about});
   setCurrentUser({...newUser})
   alert ('Данные усешно изменены') 
   } catch (error) {
   alert ('Данные изменить не удалось') 
   }
}

const required= {
   required:{
      value: true
   }
}

 return (
 <>
 <button className='post_btn btn__type__primary' onClick={()=>navigate(-1)}>{'< '}Назад</button>
 <div className="profile">
        <div>
           <h1>Мои данные</h1> 
        </div>
        {currentUser?.name && currentUser?.about && (<>
         <Form submitForm={handleSubmit(sendProfileData)}>
            <div className='profile__user'>
               <input {...register('name', required)} className='profile_input' defaultValue={currentUser.name} type="text" placeholder='name'></input>
               <input {...register('about', required)} className='profile_input'  defaultValue={currentUser.about} placeholder='about'></input>
               <input {...register('email')} className='profile_input' defaultValue={currentUser?.email} disabled placeholder='email'></input>
               <input {...register('id')} className='profile_input' defaultValue={currentUser?._id} disabled placeholder='id'></input>
            <BaseButton type="submit" color={'blue'}>Отправить</BaseButton>
            </div>
         </Form>

        <div className='profile__avatar'>
        <Form submitForm={handleSubmit(sendAvatar)}>
        <div className='profile__user'>
        <img className='profile__avatar-img' src={currentUser.avatar} alt='avatar'></img>
        <input className='profile_input' {...register('avatar')} defaultValue={currentUser?.avatar} placeholder='avatar'></input>
        <BaseButton type="submit" color={'blue'}>Отправить</BaseButton>
        </div>
        </Form>
        </div></>)
}
    </div>
    </>)
}