import useApp from '../../hooks/useApp'
import CityItem from '../cityItem/CityItem'
import styles from './CityList.module.css'
import Message from '../message/Message'
import Spinner from '../spinner/Spinner'

export default function CityList() {
    const { cities, isLoading } = useApp()

    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message={'Add your first city by clicking on a city on the map'} />

    return (
        <div className={styles.cityList}>
            {
                !!cities && cities.map((city, index) => (
                    <CityItem city={city} key={index} />
                ))
            }
        </div>
    )
}
