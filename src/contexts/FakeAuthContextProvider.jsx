/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react"

export const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthenticated: false
}

const FAKE_USER = {
    name: "Fisheeesh",
    email: "fish162@gmail.com",
    password: "worldwise2025",
    avatar: "https://avatars.githubusercontent.com/u/137766427?v=4",
};

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload, isAuthenticated: true }
        case "LOGOUT":
            return { ...state, user: null, isAuthenticated: false }
        default:
            return state
    }
}

export default function FakeAuthContextProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(authReducer, initialState)

    const loginUser = (email, password) => {
        if (FAKE_USER.email === email && FAKE_USER.password === password) dispatch({ type: 'LOGIN', payload: FAKE_USER })
    }

    const logoutUser = () => {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}
