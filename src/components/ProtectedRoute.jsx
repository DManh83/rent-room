import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()
    const location = useLocation()

    const path = location.pathname
    if (
        path === '/dang-nhap' ||
        path === '/dang-ky' ||
        path === '/quen-mat-khau' ||
        path === '/tao-lai-mat-khau'
    ) {
        return user ? <Navigate to={location.state?.from ?? '/quan-ly-tai-khoan'} /> : children
    }

    return user ? children : (<Navigate to={'/dang-nhap'} state={{ from: path }} />)
}

export default ProtectedRoute