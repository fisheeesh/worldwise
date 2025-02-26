import styles from "./Map.module.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { useEffect, useState } from "react"
import useApp from '../../hooks/useApp'
import ChangeCenter from "./ChangeCenter"
import DetectClick from "./DetectClick"
import useGeoLocation from "../../hooks/useGeoLocations"
import Button from "../button/Button"
import { useURLPosition } from "../../hooks/useURLPositions"

export default function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0])
    const { lat: mapLat, lng: mapLng } = useURLPosition()

    const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeoLocation()
    const { cities } = useApp()

    useEffect(() => {
        if (mapLat, mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(() => {
        if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
    }, [geoLocationPosition])

    return (
        <div className={styles.mapContainer}>
            {!geoLocationPosition && <Button type='position' onClick={getPosition}>
                {isLoadingPosition ? 'Loading...' : 'User Your Location'}
            </Button>}
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => (
                    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}
