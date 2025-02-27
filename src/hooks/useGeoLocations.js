import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useGeoLocation = (defaultPosition = null) => {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState(defaultPosition);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    function getPosition() {
        if (!navigator.geolocation)
            return setError("Your browser does not support geolocation");

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
                setIsLoading(false);
                navigate(`/app/form?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`)
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );


    }

    return { isLoading, position, error, getPosition };
}

export default useGeoLocation