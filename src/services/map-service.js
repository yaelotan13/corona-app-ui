import axios from "axios";
import {API_URL} from "../config";

const _defaultRadius = 50;

// pin colors
const iconBase = 'http://maps.google.com/mapfiles/ms/icons/';
const pinColors = {
    severe : iconBase + 'red.png',
    moderate : iconBase + 'orange-dot.png',
    healthy : iconBase + 'green-dot.png',
};

export function getPinColor(healthStatus) {
    return pinColors[healthStatus];
}

export async function getPatientsLocations(location) {
    console.log('sending data');
    console.log(location);
    return await axios.get(`${API_URL}/patients`, { 
        params: {
            latitude: location.lat,
            longitude: location.lng,
            radius: _defaultRadius, 
        }
     });
}

export const getCurrentPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 0
    };
  
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
