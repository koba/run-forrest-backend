import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, Polyline } from 'react-google-maps';

export const Map = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
        defaultCenter={{ lat: -34.574195, lng: -58.400127 }}
        defaultZoom={14}>
            {props.children}
    </GoogleMap>
)));