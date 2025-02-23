import useApp from '../../hooks/useApp'
import Message from '../message/Message'
import styles from './CountryList.module.css'
import CountryItem from '../countryItem/CountryItem'

export default function CountryList() {
    const { cities } = useApp()

    if (!cities?.length) return <Message message={'Add your first city by clicking on a city on the map'} />

    let countries = cities.reduce((acc, city) => {
        if(acc.some(country => country.country === city.country)) return acc

        return [...acc, { country: city.country, emoji: city.emoji }]
    }, [])

    return (
        <div className={styles.countryList}>
            {
                !!countries && countries.map((country, index) => (
                    <CountryItem country={country} key={index} />
                ))
            }
        </div>
    )
}
