import React, { Component } from "react";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from "react-google-maps";
import { withNamespaces } from 'react-i18next';
import withMenu from '../../hoc/withMenu/withMenu';
import { GOOGLE_API_KEY } from "../../config";
import { mapService } from '../../services'
import initialState from './initialState';
import { Typography, Box } from '@material-ui/core';
import { getCurrentPosition } from '../../services/map-service';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import Spinner from '../shared/Spinner/Spinner';
import { makeStyles } from '@material-ui/styles';
import deepEqual from 'deep-equal';

const useStyles = makeStyles({
    spinner: {
        position: 'relative',
        top: '-100vh',
    }
});

class Map extends Component { 
    state = initialState;
    _errorMsg = 'Oops! Something Went Wrong';

    componentDidMount() {
        this.setState({loading: true});

        navigator.geolocation.getCurrentPosition(
            async position => {
                const {latitude, longitude} = position.coords;
                const location = {longitude, latitude};

                try {
                    const response = await mapService.getPatientsLocations(location);
                    const patients = response.data.filter(patient => {
                        return !(deepEqual(patient.location, location));
                    });
                    this.setState({patients})
                } catch (err) {
                    console.log(err)
                }

                this.setState({
                    location: {
                        lat: latitude,
                        lng: longitude
                    },
                    loading: false
                });
            },
            () => {
                this.setState({loading: false});
            })
    }   

    render() {
        console.log(this.state.location);
        console.log('PATIENTS');
        console.log(this.state.patients);
        console.log(`loading? ${this.state.loading}`)
        return (
            <Box>
                {   
                    this.state.loading ? 
                    <Spinner style={{
                        position: 'relative',
                        top: '-100vh',
                    }} />
                    :
                    this.state.error ? <Typography>{this._errorMsg}</Typography>
                    :
                    <GoogleMap
                        zoom={10}
                        defaultZoom={10}
                        defaultCenter={this.state.location}
                    >

                    <Marker
                        position={this.state.location}
                        icon={{
                            url: 'http://maps.google.com/mapfiles/kml/shapes/man.png'
                        }}
                    />

                     {this.state.patients.map((patient) =>
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
}

// export default Map
const WrappedMap = withScriptjs(withGoogleMap(Map));
const style = {
  width: '100vw',
  height: '100vh'
};
console.log('in WrappedMap');
console.log(Map);
const MapContainer = () =>
  <div className="map" style={style}>
  {
      <WrappedMap
      googleMapURL={
          `https://maps.googleapis.com/maps/api/js?v=3.40&key=${GOOGLE_API_KEY}`
      }
  
      loadingElement={<Spinner />}
      containerElement={<div style={{height: '100%'}}/>}
      mapElement={<div style={{height: '100%'}}/>}
      />
  }
  </div>
;

export default withNamespaces()(withMenu(MapContainer))