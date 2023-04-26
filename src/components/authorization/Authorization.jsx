import { Route, Routes } from "react-router-dom"
import { Modal } from "../modal/Modal"
import { Login } from "../auth/login/Login"
import { Register } from "../auth/register/Register"
import { ResetPass } from "../auth/resetPassword/ResetPassword"

export const Authorization = ({ activeModal, setShowModal }) => {

    return (
        // <>
            <Routes>
                <Route path='login' element={
                    <Modal activeModal={activeModal} setShowModal={setShowModal}>
                        <Login setShowModal={setShowModal} />
                    </Modal>
                }
                ></Route>
                <Route path='register' element={
                    <Modal activeModal={activeModal} setShowModal={setShowModal}>
                        <Register setShowModal={setShowModal} />
                    </Modal>
                }
                ></Route>
                <Route path="reset-password" element={
                    <Modal activeModal={activeModal} setShowModal={setShowModal}>
                        <ResetPass setShowModal={setShowModal} />
                    </Modal>
                }
                ></Route>
            </Routes>
        // </>
    )

}