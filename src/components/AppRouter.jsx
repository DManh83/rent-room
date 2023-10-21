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
import { CreatePost, System, Profile, } from '../pages/System'
import Notfound from '../pages/Notfound'
import { path } from '../ultils/constant'
import { useApp, useAuth } from '../hooks/useReducerContext'



const AppRouter = () => {
    const { user } = useAuth()
    const { dispatchApp } = useApp()
    useEffect(() => {
        dispatchApp('GET_PRICES')
        dispatchApp('GET_AREAS')
        dispatchApp('GET_PROVINCES')
    }, [dispatchApp])

    return (

        <Router>
            {<Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path='*' element={<HomePage />} />

                    <Route path={path.LOGIN} element={!user ? <Login /> : <Navigate to='/' />} />
                    <Route path={path.REGISTER} element={!user ? <Register /> : <Navigate to='/' />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
                    <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
                    <Route path={path.NHA_CHO_THUE} element={<Rental />} />
                    <Route path={path.TIM_NGUOI_O_GHEP} element={<Rental />} />
                    <Route path={path.SEARCH} element={<SearchDetail />} />
                    <Route path={path.FORGOTPASSWORD} element={!user ? <ForgotPassword /> : <Navigate to='/' />} />
                    <Route path={path.RESETPASSWORD} element={!user ? <ResetPassword /> : <Navigate to='/' />} />
                    <Route path={path.DETAIL} element={<DetailPost />} />
                    <Route path={path.DETAIL_ALL} element={<DetailPost />} />
                </Route>

                <Route path={path.SYSTEM} element={user ? <System /> : <Navigate to={`/${path.LOGIN}`} />}>
                    <Route path={path.PROFILE} element={user ? <Profile /> : <Navigate to={`/${path.LOGIN}`} />} />
                    {/* <Route path={path.PROFILE} element={
                        <RentalRoute>
                            <Profile />
                        </RentalRoute>
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
