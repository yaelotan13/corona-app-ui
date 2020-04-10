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
import { withRouter } from 'react-router-dom';
import { DeviceUUID } from "device-uuid";

import withMenu from '../../hoc/withMenu/withMenu';
import { GOOGLE_API_KEY } from "../../config";
import { mapService } from '../../services'
import Spinner from '../shared/Spinner/Spinner';
import useLocation from '../../hooks/useLocation';

const useStyles = makeStyles({
    spinner: {
        position: 'relative',
        top: '-100vh',
    }
});

const Map = ({ history }) => { 
    const classes = useStyles();
    const [ userLocation, setUserLocation ] = useState({
        lat: 32.0965791,
        lng: 34.7831877
    })
    const [ userLocationError, location] = useLocation();
    const [ loading, setLoading ] = useState(false);
    const [ hasFetchingError, setHasFetchingError ] = useState(false);
    const [ pateints, setPatients ] = useState([]);

    useEffect(() => {
        if (!userLocationError) {
            setLoading(true);
            if (Object.keys(location).length !== 0 && location.constructor === Object) {
                (async () => {
                    try {
                        const response = await mapService.getPatientsLocations(location);
                        const deviceUid = new DeviceUUID().get();
                        const filteredPatients = response.data.filter(patient => patient.id !== deviceUid);
                        setPatients(filteredPatients);
                        setUserLocation(location);
                    } catch (error) {
                        console.log(error);
                        setHasFetchingError(true);
                    }
                })();
            }
            setLoading(false);  
        }
    }, [location])

    const renderServerError = () => {
        history.push('/error');
    }

    return (
        <Box>
            {   
                loading ? 
                <Spinner className={classes.spinner} />
                :
                hasFetchingError ? 
                renderServerError()
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

const MapContainer = (props) => (
  <Box style={style}>
    {
        <WrappedMap
            googleMapURL={
                `https://maps.googleapis.com/maps/api/js?v=3.40&key=${GOOGLE_API_KEY}`
            }
    
            loadingElement={<Box style={{height: '100%'}}/>}
            containerElement={<Box style={{height: '100%'}}/>}
            mapElement={<Box style={{height: '100%'}}/>}
            {...props}
        />
    }
  </Box>
);

export default withRouter(withNamespaces()(withMenu(MapContainer)))