/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios"
import { createContext, useEffect, useReducer, useState } from "react"

export const AppContext = createContext()

const BASE_URL = import.meta.env.VITE_FAKE_API

const initialState = {
    cities: []
}

const appReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_CITIES":
            return { ...state, cities: action.payload, }
        case "FETCH_CITIES_ERROR":
            return { ...state, }
        default:
            return state
    }
}

export default function AppContextProvider({ children }) {
    const [{ cities }, dispatch] = useReducer(appReducer, initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setIsLoading(true)
                await new Promise(resolve => setTimeout(resolve, 500))
                let res = await axios.get(`${BASE_URL}/cities`)
                dispatch({ type: "FETCH_CITIES", payload: res.data })
            }
            catch (err) {
                console.log(err.message)
                dispatch({ type: "FETCH_CITIES_ERROR" })
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchCities()
    }, [])

    const getCurrentCity = async (id) => {
        try {
            setIsLoading(true)
            let res = await axios.get(`${BASE_URL}/cities/${id}`)
            setCurrentCity(res.data)
        }
        catch (err) {
            console.log('Error Fetching: ', err.message)
        }        
        finally {
            setIsLoading(false)
        }
        
    }

    return (
        <AppContext.Provider value={{ cities, isLoading, dispatch, getCurrentCity, setCurrentCity, currentCity }}>
            {children}
        </AppContext.Provider>
    )
}
