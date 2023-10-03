import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import {
    Home,
    Login,
    Register,
    Protected,
    ForgotPassword,
    ResetPassword,
    DetailPost,
    HomePage,
}
    from '../pages/Public'
import { CreatePost, System, Profile, } from '../pages/System'
import Notfound from '../pages/Notfound'
// import ProtectedRoute from './ProtectedRoute'
import { path } from '../ultils/constant'
import { useAuth } from '../hooks/useReducerContext'



const AppRouter = () => {
    const { user, isLoggedIn } = useAuth()

    return (

        <Router>
            {<Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path='*' element={<HomePage />} />

                    <Route path={path.LOGIN} element={!user ? <Login /> : <Navigate to='/' />} />
                    <Route path={path.REGISTER} element={!user ? <Register /> : <Navigate to='/' />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<Protected />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<Protected />} />
                    <Route path={path.CHO_THUE_MAT_BANG} element={<Protected />} />
                    <Route path={path.NHA_CHO_THUE} element={<Protected />} />
                    <Route path={path.TIM_NGUOI_O_GHEP} element={<Protected />} />
                    <Route path={path.FORGOTPASSWORD} element={!user ? <ForgotPassword /> : <Navigate to='/' />} />
                    <Route path={path.RESETPASSWORD} element={!user ? <ResetPassword /> : <Navigate to='/' />} />
                    <Route path={path.DETAIL} element={<DetailPost />} />
                    <Route path={path.DETAIL_ALL} element={<DetailPost />} />
                </Route>

                <Route path={path.SYSTEM} element={user ? <System /> : <Navigate to={`/${path.LOGIN}`} />}>
                    <Route path={path.PROFILE} element={user ? <Profile /> : <Navigate to={`/${path.LOGIN}`} />} />
                    {/* <Route path={path.PROFILE} element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                    /> */}
                    <Route path={path.CREATE_POST} element={user ? <CreatePost /> : <Navigate to={`/${path.LOGIN}`} />} />
                </Route>

                <Route path='*' element={<Notfound />} />
            </Routes>}
        </Router>
    )
}


export default AppRouter
