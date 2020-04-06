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

const useStyles = makeStyles({
    spinner: {
        position: 'relative',
        top: '-100vh',
    }
});

class Map extends Component { 
    state = initialState;
    _errorMsg = 'Oops! Something Went Wrong';

    _getPatientsLocations() {
        this.setState({ loading: true });
        let response;

        try {
            response = mapService.getPatientsLocations(this.state.location);
        } catch (err) {
            console.log(err);
            this.setState({
                loading: false,
                error: true
            })
        }

        if (response.status === 200) {
            this.setState({
                patients: response.patients,
            });
        }

        this.setState({ loading: false });
    }

    async componentDidMount() {
        this.setState({ loading: true });

        try {
            let location = await getCurrentPosition();
            console.log('after await');
            console.log(location);
            setTimeout(() => {
                const {latitude, longitude} = location.coords;
                this.setState({
                    location: { lat: 32.0965791, lng: 34.7831877 },
                    loading: false,
                    error: false,
                });
            }, 4000);
        } catch (error) {
            this.setState({
                loading: false,
                error: true,
            });
        }
    }

    render() {
        // const { loading, location, patients, error } = this.state;
        console.log(this.state.location);
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
                        zoom={14}
                        defaultZoom={11}
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
                                url: `mapService.getPinColor(patient.status)`
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

const MapContainer = () =>
  <div className="map" style={style}>
  {
      <WrappedMap
      googleMapURL={
          `https://maps.googleapis.com/maps/api/js?v=3.40&key=${GOOGLE_API_KEY}`
      }
      loadingElement={<div style={{height: '100%'}}/>}
    //   loadingElement={<Spinner />}
      containerElement={<div style={{height: '100%'}}/>}
      mapElement={<div style={{height: '100%'}}/>}
      />
  }
  </div>
;

export default withNamespaces()(withMenu(MapContainer))