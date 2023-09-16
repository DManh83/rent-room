import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error('Authcontext is undefined')
    }

    return authContext
}