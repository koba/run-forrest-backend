import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, Polyline } from 'react-google-maps';

export const Map = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
        defaultCenter={{ lat: -34.603722, lng: -58.381592 }}
        defaultZoom={8}>
            {props.children}
    </GoogleMap>
)));