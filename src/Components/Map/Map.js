import React, {Component} from "react";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from "react-google-maps";
import {withNamespaces} from 'react-i18next';
import withMenu from '../../hoc/withMenu/withMenu';
import {GOOGLE_API_KEY} from "../../config";
import {mapService} from '../../services'
import initialState from './initialState'


class Map extends Component { // hock useState useEffect
    state = initialState;
    _errorMsg = 'Oops! Something Went Wrong';

    _getPatientsLocations() {
        this.setState({loading: true});
        let response;

        try {
            response = mapService.getPatientsLocations(this.state.location);
        } catch (err) {
            console.log(err);
            this.setState({
                loading: false,
                error: `${this._errorMsg}`
            })
        }

        if (response.status === 200) {
            this.setState({
                patients: response.patients,
            });
        }

        this.setState({loading: false});
    }

    componentDidMount() {
        this.setState({loading: true});

        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                console.log(position.coords);
                // const patients = this._getPatientsLocations(); // Get Request for server

                this.setState({
                    // patients,
                    location: {lat: latitude, lng: longitude},
                    loading: false
                });
            },
            () => {
                this.setState({loading: false});
            })
    }

    render() {
        const {loading, location, patients} = this.state;

        if (loading) return (<p>Map Is Loading</p>);

        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={location}
            >

                <Marker
                    position={location}
                    icon={{
                        url: 'http://maps.google.com/mapfiles/kml/shapes/man.png'
                    }}
                >
                </Marker>

                {patients.map((patient) =>
                    <Marker
                        position={{
                            lat: patient.location.lat,
                            lng: patient.location.lng
                        }}

                        icon={{
                            url: mapService.getPinColor(patient.status)
                        }}
                    >
                    </Marker>
                )}

            </GoogleMap>
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
  <WrappedMap
    googleMapURL={
        `https://maps.googleapis.com/maps/api/js?v=3.40&key=${GOOGLE_API_KEY}`
    }
    loadingElement={<div style={{height: '100%'}}/>}
    containerElement={<div style={{height: '100%'}}/>}
    mapElement={<div style={{height: '100%'}}/>}
    />
  </div>
;

export default withNamespaces()(withMenu(MapContainer))