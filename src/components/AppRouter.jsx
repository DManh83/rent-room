import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ForgotPassword from '../pages/ForgotPassword'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Notfound from '../pages/Notfound'
import Profile from '../pages/Profile'
import Protected from '../pages/Protected'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import ProtectedRoute from './ProtectedRoute'



const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/dang-nhap' element={
                        <ProtectedRoute>
                            <Login />
                        </ProtectedRoute>
                    }
                    />
                    <Route path='/dang-ky' element={
                        <ProtectedRoute>
                            <Register />
                        </ProtectedRoute>
                    }
                    />
                    <Route path='/quan-ly-tai-khoan' element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                    />
                    <Route path='/protected-page' element={
                        <ProtectedRoute>
                            <Protected />
                        </ProtectedRoute>
                    }
                    />
                    <Route path='/dang-tin-moi' element={
                        <ProtectedRoute>
                            <Protected />
                        </ProtectedRoute>
                    }
                    />
                    <Route path='/quen-mat-khau' element={
                        <ProtectedRoute>
                            <ForgotPassword />
                        </ProtectedRoute>
                    }
                    />
                    <Route path='/tao-lai-mat-khau' element={
                        <ProtectedRoute>
                            <ResetPassword />
                        </ProtectedRoute>
                    }
                    />
                    <Route path='*' element={<Notfound />} />
                </Routes>
            </Router>
        </>
    )
}


export default AppRouter
