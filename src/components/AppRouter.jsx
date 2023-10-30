import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import {
    Home,
    Login,
    Register,
    Rental,
    ForgotPassword,
    ResetPassword,
    DetailPost,
    HomePage,
    SearchDetail,
}
    from '../pages/Public'
import { CreatePost, System, Profile, ManagePost, } from '../pages/System'
import Notfound from '../pages/Notfound'
import { path } from '../ultils/constant'
import { useApp, useAuth } from '../hooks/useReducerContext'


const AppRouter = () => {
    const { isLoggedIn } = useAuth()
    const { dispatchApp } = useApp()
    // useEffect(() => {
    //     setTimeout(() => {
    //         user && dispatchUser('ISLOGGEDIN')
    //     }, 1000)
    // }, [dispatchUser])
    // console.log(user, isLoggedIn)
    useEffect(() => {
        dispatchApp('GET_PRICES')
        dispatchApp('GET_AREAS')
        dispatchApp('GET_PROVINCES')
        dispatchApp('GET_CATEGORIES')
    }, [dispatchApp])

    return (

        <Router>
            {<Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path='*' element={<HomePage />} />

                    <Route path={path.LOGIN} element={!isLoggedIn ? <Login /> : <Navigate to='/' />} />
                    <Route path={path.REGISTER} element={!isLoggedIn ? <Register /> : <Navigate to='/' />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
                    <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
                    <Route path={path.NHA_CHO_THUE} element={<Rental />} />
                    <Route path={path.TIM_NGUOI_O_GHEP} element={<Rental />} />
                    <Route path={path.SEARCH} element={<SearchDetail />} />
                    <Route path={path.FORGOTPASSWORD} element={!isLoggedIn ? <ForgotPassword /> : <Navigate to='/' />} />
                    <Route path={path.RESETPASSWORD} element={!isLoggedIn ? <ResetPassword /> : <Navigate to='/' />} />
                    <Route path={path.DETAIL} element={<DetailPost />} />
                    <Route path={path.DETAIL_ALL} element={<DetailPost />} />
                </Route>

                <Route path={path.SYSTEM} element={
                    isLoggedIn ?
                        <System />
                        : <Navigate to={`/${path.LOGIN}`} replace={true} />
                }>
                    <Route path={path.PROFILE} element={<Profile />} />
                    <Route path={path.CREATE_POST} element={<CreatePost />} />
                    <Route path={path.MANAGE_POST} element={<ManagePost />} />
                </Route>

                <Route path='*' element={<Notfound />} />
            </Routes>}
        </Router>
    )
}


export default AppRouter
