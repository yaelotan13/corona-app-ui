import {sendSurvey, isSurveyValid} from "./survey-service";
import {getPatientsLocations, getPinColor} from './map-service'

export const surveyService = {
    sendSurvey,
    isSurveyValid
};

export const mapService = {
    getPatientsLocations,
    getPinColor
};