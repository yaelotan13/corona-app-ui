import { sendSurvey } from "./survey-service";
import { getPatientsLocations, getPinColor } from './map-service'

export const surveyService = {
    sendSurvey,
};

export const mapService = {
    getPatientsLocations,
    getPinColor
};