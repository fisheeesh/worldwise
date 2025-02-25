/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import helpers from '../../utils/helpers';
import useApp from '../../hooks/useApp'

const { formatDate } = helpers()

export default function CityItem({ city }) {
    const { currentCity } = useApp()
    const { cityName, emoji, date, id, position } = city
    return (
        <div>
            <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${currentCity.id === id && styles['cityItem--active']}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </div>
    )
}
