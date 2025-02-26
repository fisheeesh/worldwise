/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const AppContext = createContext()

const BASE_URL = import.meta.env.VITE_FAKE_API

export default function AppContextProvider({ children }) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setIsLoading(true)
                await new Promise(resolve => setTimeout(resolve, 500))
                let res = await axios.get(`${BASE_URL}/cities`)
                setCities(res.data)
            }
            catch (err) {
                console.log(err.message)
                setCities([])
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

    const createCity = async (newCity) => {
        try {
            setIsLoading(true)
            let { data } = await axios.post(`${BASE_URL}/cities`, newCity)
            setCities(prevState => [...prevState, data])
        }
        catch (err) {
            console.log(err.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <AppContext.Provider value={{ cities, isLoading, getCurrentCity, setCurrentCity, currentCity, createCity }}>
            {children}
        </AppContext.Provider>
    )
}
