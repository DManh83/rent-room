import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { path } from "../ultis/constant"

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()
    const location = useLocation()

    const pathname = location.pathname
    console.log(pathname)
    if (
        pathname === '/' + path.LOGIN ||
        pathname === '/' + path.REGISTER ||
        pathname === '/' + path.FORGOTPASSWORD ||
        pathname === '/' + path.RESETPASSWORD
    ) {
        return user ? <Navigate to={location.state?.from ?? path.HOME} /> : children
    }

    return user ? children : (<Navigate to={`/${path.LOGIN}`} replace />)
}

export default ProtectedRoute