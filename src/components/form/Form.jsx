import { useEffect, useReducer, useState } from "react";
import styles from "./Form.module.css";
import Button from "../button/Button";
import helpers from "../../utils/helpers";
import axios from "axios";
import { useURLPosition } from "../../hooks/useURLPositions";
import Spinner from '../spinner/Spinner'
import Message from '../message/Message'
import BackButton from "../button/BackButton";

const initialState = {
  cityName: '',
  countryCode: '',
  date: new Date(),
  notes: '',
  error: '',
}

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_CITY_NAME":
      return { ...state, cityName: action.payload }
    case "SET_DATE":
      return { ...state, date: action.payload }
    case "SET_NOTES":
      return { ...state, notes: action.payload }
    case "GET_COUNTRY_DATA":
      return { ...state, cityName: action.payload.city, countryCode: action.payload.countryCode, error: '' }
    case "ERROR":
      return { ...state, error: action.payload }
    default:
      return state
  }
}

function Form() {
  const { formatDate, convertToEmoji } = helpers()
  const [isLoading, setIsLoading] = useState(false)
  const [{ cityName, countryCode, date, notes, error }, dispatch] = useReducer(formReducer, initialState)
  const { lat, lng } = useURLPosition()

  const setCity = (e) => {
    dispatch({ type: "SET_CITY_NAME", payload: e.target.value })
  }
  const setDate = (e) => {
    dispatch({ type: "SET_DATE", payload: e.target.value })
  }

  const setNotes = (e) => {
    dispatch({ type: "SET_NOTES", payload: e.target.value })
  }

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true)
        let { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        dispatch({ type: 'GET_COUNTRY_DATA', payload: data })
        if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else on the map 😉.")
      }
      catch (err) {
        dispatch({ type: 'ERROR', payload: err.message })
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchDetail()
  }, [lat, lng])


  if (isLoading) return <Spinner />
  if (error) return <Message message={error} />

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCity(e)}
          value={cityName}
        />
        <span className={styles.flag}>{convertToEmoji(countryCode)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e)}
          value={formatDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
