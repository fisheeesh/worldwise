import { useEffect, useReducer } from "react";
import styles from "./Form.module.css";
import Button from "../button/Button";
import helpers from "../../utils/helpers";
import axios from "axios";
import { useURLPosition } from "../../hooks/useURLPositions";
import Spinner from '../spinner/Spinner'
import Message from '../message/Message'
import BackButton from "../button/BackButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useApp from '../../hooks/useApp'
import { useNavigate } from "react-router-dom";

const initialState = {
  cityName: '',
  country: '',
  date: new Date(),
  notes: '',
  error: '',
  loading: false,
  emoji: ''
}

const formReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true }
    case "SET_CITY_NAME":
      return { ...state, cityName: action.payload }
    case "SET_DATE":
      return { ...state, date: action.payload }
    case "SET_NOTES":
      return { ...state, notes: action.payload }
    case "GET_COUNTRY_DATA":
      return { ...state, cityName: action.payload.city, country: action.payload.countryName, error: '', emoji: action.payload.countryCode, loading: false }
    case "ERROR":
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

function Form() {
  const { createCity, isLoading: formLoading } = useApp()
  const { lat, lng } = useURLPosition()
  const { convertToEmoji } = helpers()
  const navigate = useNavigate()

  const [{ cityName, country, date, notes, error, loading, emoji }, dispatch] = useReducer(formReducer, initialState)

  const setCity = (e) => {
    dispatch({ type: "SET_CITY_NAME", payload: e.target.value })
  }
  const setDate = (date) => {
    dispatch({ type: "SET_DATE", payload: date })
  }

  const setNotes = (e) => {
    dispatch({ type: "SET_NOTES", payload: e.target.value })
  }

  useEffect(() => {
    if (!lat && !lng) return

    const fetchDetail = async () => {
      dispatch({ type: 'LOADING' })
      try {
        let { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        dispatch({ type: 'GET_COUNTRY_DATA', payload: data })
        if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else on the map 😉.")
      }
      catch (err) {
        dispatch({ type: 'ERROR', payload: err.message })
      }
    }
    fetchDetail()
  }, [lat, lng])

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    if (!cityName || !date) return

    const flag = convertToEmoji(emoji)

    const newCity = {
      id: Date.now().toString(),
      cityName,
      country,
      emoji: flag,
      date,
      position: { lat, lng }
    }

    await createCity(newCity)
    navigate('/app')
  }


  if (loading) return <Spinner />
  if (error) return <Message message={error} />
  if (!lat && !lng) return <Message message={"Start by clicking somewhere on the map"} />

  return (
    <form className={`${styles.form} ${formLoading ? styles.loading : ''}`} onSubmit={onHandleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCity(e)}
          value={cityName}
        />
        <span className={styles.flag}>{convertToEmoji(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e)}
          value={formatDate(date)}
        /> */}
        <DatePicker id='date' onChange={date => setDate(date)} selected={date} dateFormat={'dd/MM/yyyy'} />
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
