// import { useAuth } from "../../hooks/useReducerContext"

// const {user} = useAuth()
export const getUser = (dispatch, user) => dispatch({ type: 'GET_USER', payload: user })