import axios from "axios";
import { API_URL, CRYPTO_KEY } from "../config";
import deepEqual from "deep-equal";
import { initialState } from "../Components/Survey/surveyInitialState";
import { v4 } from "uuid";
import { DeviceUUID } from "device-uuid";
import CryptoJS from "crypto-js";

export async function sendSurvey (surveyInputs) {
  const data = {
    ...surveyInputs,
    id: generateToken(),
    location: getLocation()
  };

  return await axios.post(
    `${API_URL}/patients`,
    data
  );
}

function generateToken () {
  const requestUid = v4();
  const deviceUid = new DeviceUUID().get();
  const token = [ requestUid, deviceUid, 'valid' ].join('.');
  const encryptedToken = CryptoJS.AES.encrypt(token, CRYPTO_KEY).toString();

  return encryptedToken;
}

//TODO add default location?
const defaultLocation = {
  longitude: '0',
  latitude: '0'
};
function getLocation () {
  let location;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords;
      location = { longitude, latitude };
      console.log(location)
    }, getLocationError);
  } else {
    console.log('Geolocation is not supported by this browser.');
    getLocationError();
    location = defaultLocation;
  }

  return location;
}

function getLocationError () {
  // TODO
}

export function isSurveyValid (surveyInputs) {
  // if all inputs remain untouched === false
  return !deepEqual(surveyInputs, initialState);
}
