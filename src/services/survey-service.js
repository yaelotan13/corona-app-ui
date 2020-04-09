import axios from "axios";
import { v4 } from "uuid";
import { DeviceUUID } from "device-uuid";
import CryptoJS from "crypto-js";

import { API_URL, CRYPTO_KEY } from "../config"
import { getCurrentPosition } from './map-service';

export async function sendSurvey (surveyInputs) {
  let location = null;
  if (navigator.geolocation) {
    try {
      location = await getCurrentPosition();
      console.log('got the location');
    } catch (error) {
      console.log(error);
    }
  } else {
    location = defaultLocation;
  }

  const data = {
    ...surveyInputs,
    id: generateToken(),
    location: {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    }
  };

  console.log(`after got data`);
  console.log(data);
  console.log(`sending HTTP to: ${API_URL}`);
  return await axios.post(
    `${API_URL}/patients`,
    data
  );
}

function generateToken () {
  const requestUid = v4();
  const deviceUid = new DeviceUUID().get();
  localStorage.setItem('id', deviceUid);
  const token = [ requestUid, deviceUid, 'valid' ].join('.');
  const encryptedToken = CryptoJS.AES.encrypt(token, CRYPTO_KEY).toString();

  return encryptedToken;
}

const defaultLocation = {
  longitude: '0',
  latitude: '0'
};

