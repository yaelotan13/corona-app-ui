import React, { useState, useEffect } from "react";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from "react-google-maps";
import { withNamespaces } from 'react-i18next';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import withMenu from '../../hoc/withMenu/withMenu';
import { GOOGLE_API_KEY } from "../../config";
import { mapService } from '../../services'
import ServerError from '../shared/ServerError/ServerError';
import Spinner from '../shared/Spinner/Spinner';


const useStyles = makeStyles({
    spinner: {
        position: 'relative',
        top: '-100vh',
    }
});

const Map = ({ t }) => { 
    const classes = useStyles();
    const [ userLocation, setUserLocation ] = useState({
        latitude: 32.0965791,
        longitude: 34.7831877
    })

    const [ loading, setLoading ] = useState(false);
    const [ hasFetchingError, setHasFetchingError ] = useState(false);
    const [ pateints, setPatients ] = useState([]);

    useEffect(() => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async position => {
                const {latitude, longitude} = position.coords;
                const location = {longitude, latitude};
                try {
                    const response = await mapService.getPatientsLocations(location);
                    let patients = response.data;
                    const userId = localStorage.getItem('id');
                    if (userId) {
                        patients = response.data.filter(patient => patient.id !== userId)
                    }
                    
                    setPatients(patients);

                } catch (error) {
                    console.log(error);
                    setHasFetchingError(true);
                }

                setUserLocation({
                    lat: latitude,
                    lng: longitude
                })
                setLoading(false);
            },
            (error) => {
                console.log(error);
                setLoading(false);
                setHasFetchingError(true);
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            })
    }, []);  

    return (
        <Box>
            {   
                loading ? 
                <Spinner className={classes.spinner} />
                :
                hasFetchingError ? 
                <ServerError t={t}/>
                :
                <GoogleMap
                    zoom={10}
                    defaultZoom={10}
                    defaultCenter={userLocation}
                >
                    <Marker
                        position={userLocation}
                        icon={{
                            url: 'http://maps.google.com/mapfiles/kml/shapes/man.png'
                        }}
                    />
                    {
                        pateints.map((patient) =>
                        <Marker
                            key={patient.id}
                            position={{
                                lat: patient.location.lat,
                                lng: patient.location.lng
                            }}
                            icon={{
                                url: mapService.getPinColor(patient.status)
                            }}
                        />
                    )} 
                </GoogleMap>
            }
        </Box>
        )
    }

const WrappedMap = withScriptjs(withGoogleMap(Map));
const style = {
  width: '100vw',
  height: '100vh'
};

const MapContainer = () => (
  <Box style={style}>
    {
        <WrappedMap
            googleMapURL={
                `https://maps.googleapis.com/maps/api/js?v=3.40&key=${GOOGLE_API_KEY}`
            }
    
            loadingElement={<Spinner />}
            containerElement={<Box style={{height: '100%'}}/>}
            mapElement={<Box style={{height: '100%'}}/>}
        />
    }
  </Box>
);

export default withNamespaces()(withMenu(MapContainer))