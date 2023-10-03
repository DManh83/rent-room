import { useContext } from "react"
import { AppContext, AuthContext, PostContext } from "../contexts/ReducerContext"

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error('Authcontext is undefined')
    }
    return authContext
}

export const usePost = () => {
    const postContext = useContext(PostContext)

    if (!postContext) {
        throw new Error('Postcontext is undefined')
    }
    return postContext
}

export const useApp = () => {
    const appContext = useContext(AppContext)

    if (!appContext) {
        throw new Error('Appcontext is undefined')
    }
    return appContext
}