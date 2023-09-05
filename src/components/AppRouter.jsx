import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ForgotPassword from '../pages/ForgotPassword'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Protected from '../pages/Protected'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import ProtectedRoute from './ProtectedRoute'
import { path } from '../ultis/constant'



const AppRouter = () => {
    return (

        <Router>
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path={path.LOGIN} element={
                        <ProtectedRoute>
                            <Login />
                        </ProtectedRoute>
                    }
                    />
                    <Route path={path.REGISTER} element={
                        <ProtectedRoute>
                            <Register />
                        </ProtectedRoute>
                    }
                    />
                    <Route path={path.PROFILE} element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                    />
                    <Route path='protected-page' element={
                        <ProtectedRoute>
                            <Protected />
                        </ProtectedRoute>
                    }
                    />
                    <Route path={path.CREATEPOST} element={
                        <ProtectedRoute>
                            <Protected />
                        </ProtectedRoute>
                    }
                    />
                    <Route path={path.FORGOTPASSWORD} element={
                        <ProtectedRoute>
                            <ForgotPassword />
                        </ProtectedRoute>
                    }
                    />
                    <Route path={path.RESETPASSWORD} element={
                        <ProtectedRoute>
                            <ResetPassword />
                        </ProtectedRoute>
                    }
                    />
                </Route>
                {/* <Route path={path.NOTFOUND} element={<Notfound />} /> */}
            </Routes>
        </Router>
    )
}


export default AppRouter
