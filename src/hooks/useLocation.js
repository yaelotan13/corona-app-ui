import { useState, useEffect } from 'react';

const OPTIONS = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const useLocation = () => {
    const [ hasError, setHasError ] = useState(false);
    const [ location, setLocation ] = useState({});

    const callGetPosition = async () => {
        try {
            const { coords: { longitude, latitude }} = await getCurrentPosition();
            setLocation({
                lng: longitude,
                lat: latitude
            });
            setHasError(false);
        } catch (error) {
            setHasError(true);
        }
    }

    useEffect(() => {
        callGetPosition();
    }, []);

    return [ hasError, location];
};

const getCurrentPosition = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, OPTIONS);
    })
};

export default useLocation;