import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { googlemaps_key } from "../../assets/constants";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

function BasicMapChart({ height }) {
    const defaultConfig = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    }
    return (
        <div style={{ height: height || 460, width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: googlemaps_key }}
                defaultCenter={defaultConfig.center}
                defaultZoom={defaultConfig.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    )
}

export default BasicMapChart
