/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios"
import { createContext, useEffect, useReducer } from "react"

export const AppContext = createContext()

const BASE_URL = "http://localhost:3001"
const initialState = {
    cities: [],
    status: 'loading'
}

const appReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_CITIES":
            return { ...state, cities: action.payload, status: 'success' }
        case "FETCH_CITIES_ERROR":
            return { ...state, status: 'error' }
        default:
            return state
    }
}

export default function AppContextProvider({ children }) {
    const [{ cities, status }, dispatch] = useReducer(appReducer, initialState)

    useEffect(() => {
        const fetchCities = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500))
                let res = await axios.get(`${BASE_URL}/cities`)
                dispatch({ type: "FETCH_CITIES", payload: res.data })
                console.log(res.data)
            }
            catch (err) {
                console.log(err.message)
                dispatch({ type: "FETCH_CITIES_ERROR" })
            }
        }

        fetchCities()
    }, [])

    return (
        <AppContext.Provider value={{ cities, status, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}
