import { Route, Routes } from "react-router-dom"
import { Modal } from "../modal/Modal"
import { Login } from "../auth/login/Login"
import { Register } from "../auth/register/Register"
import { ResetPass } from "../auth/resetPassword/ResetPassword"

export const Authorization = () => {

    return (
        <Routes>
            <Route path='login' element={
                <Modal>
                    <Login />
                </Modal>
            }></Route>
            <Route path='register' element={
                <Modal>
                    <Register />
                </Modal>
            }></Route>
            <Route path="reset-password" element={
                <Modal>
                    <ResetPass />
                </Modal>
            }></Route>
        </Routes>
    )
}