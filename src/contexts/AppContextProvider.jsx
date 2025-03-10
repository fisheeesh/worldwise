/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios"
import { createContext, useCallback, useReducer } from "react"

export const AppContext = createContext()

const BASE_URL = import.meta.env.VITE_FAKE_API

const intialState = {
    cities: JSON.parse(localStorage.getItem('cities')) || [],
    isLoading: false,
    currentCity: {},
    error: ''
}

const cityReducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true }
        case "cities/loaded":
            return { ...state, cities: action.payload, isLoading: false }
        case "city/loaded":
            return { ...state, isLoading: false, currentCity: action.payload }
        case "city/created":
            {
                const newCitiesList = [...state.cities, action.payload]
                localStorage.setItem('cities', JSON.stringify(newCitiesList))
                return { ...state, cities: [...newCitiesList], isLoading: false, currentCity: action.payload }
            }
        case "city/deleted":
            return { ...state, cities: state.cities.filter(city => city.id !== action.payload), isLoading: false, currentCity: {} }
        case "rejected":
            return { ...state, isLoading: false, error: action.payload }
        default:
            return state
    }
}

export default function AppContextProvider({ children }) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(cityReducer, intialState)

    /**
     * ? With json-server
     */
    // useEffect(() => {
    //     const fetchCities = async () => {
    //         dispatch({ type: 'loading' })
    //         try {
    //             await new Promise(resolve => setTimeout(resolve, 500))
    //             let { data } = await axios.get(`${BASE_URL}/cities`)
    //             dispatch({ type: 'cities/loaded', payload: data })
    //         }
    //         catch (err) {
    //             console.log(err.message)
    //             dispatch({ type: 'rejected', payload: err.message })
    //         }
    //     }
    //     fetchCities()
    // }, [])

    const getCurrentCity = useCallback((id) => {
        const fetchCity = async () => {
            if (Number(id) === currentCity.id) return
            dispatch({ type: 'loading' })
            try {
                let { data } = await axios.get(`${BASE_URL}/cities/${id}`)
                dispatch({ type: 'city/loaded', payload: data })
            }
            catch (err) {
                console.log('Error Fetching: ', err.message)
                dispatch({ type: 'rejected', payload: err.message })
            }
        }

        fetchCity()
    }, [currentCity.id])

    /**
     * ? With json-server
     */
    // const createCity = async (newCity) => {
    //     dispatch({ type: 'loading' })
    //     try {
    //         let { data } = await axios.post(`${BASE_URL}/cities`, newCity)
    //         dispatch({ type: 'city/created', payload: data })
    //     }
    //     catch (err) {
    //         console.log(err.message)
    //         dispatch({ type: 'rejected', payload: err.message })
    //     }
    // }
    const createCity = async (newCity) => {
        dispatch({ type: 'loading' })
        try {
            dispatch({ type: 'city/created', payload: newCity })
        }
        catch (err) {
            console.log(err.message)
            dispatch({ type: 'rejected', payload: err.message })
        }
    }

    /**
     * ? With json-server
     */
    // const deleteCity = async (cityId) => {
    //     dispatch({ type: 'loading' })
    //     try {
    //         await axios.delete(`${BASE_URL}/cities/${cityId}`)
    //         dispatch({ type: 'city/deleted', payload: cityId })
    //     }
    //     catch (err) {
    //         console.log(err.message)
    //         dispatch({ type: 'rejected', payload: err.message })
    //     }
    // }
    const deleteCity = async (cityId) => {
        dispatch({ type: 'loading' })
        try {
            dispatch({ type: 'city/deleted', payload: cityId })
        }
        catch (err) {
            console.log(err.message)
            dispatch({ type: 'rejected', payload: err.message })
        }
    }

    return (
        <AppContext.Provider value={{ cities, isLoading, error, getCurrentCity, currentCity, createCity, deleteCity }}>
            {children}
        </AppContext.Provider>
    )
}
