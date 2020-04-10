import axios from "axios";
import { v4 } from "uuid";
import { DeviceUUID } from "device-uuid";
import CryptoJS from "crypto-js";

import { API_URL, CRYPTO_KEY } from "../config"

const DEFAULT_LOCATION = {
  longitude: '0',
  latitude: '0'
};

export async function sendSurvey (surveyInputs, location) {
  const data = {
    ...surveyInputs,
    id: generateToken(),
    location: { 
      lat: location.lat, 
      lng: location.lng 
    }
  };

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
