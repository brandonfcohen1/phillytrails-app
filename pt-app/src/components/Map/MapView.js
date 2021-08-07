import React, {Component} from 'react';
import {MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const mapboxURL = "https://api.mapbox.com/styles/v1/brandonfcohen/ckeykvju00t6b19phhhu7en4c/tiles/{" +
        "z}/{x}/{y}{r}?access_token=" + process.env.REACT_APP_MAPBOX;

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {
                lat: 52.52437,
                lng: 13.41053
            },
            zoom: 12,
            trails: ""
        }
    }

    componentDidMount() {
        async function getTrails() {
            return await fetch("/api/geojson").then(res => res.json());
        }

        getTrails().then(res => {
            this.setState({trails: res})
        });

    }

    render() {
        const {currentLocation, zoom} = this.state;

        return (
            <div className="map__container">
                <MapContainer
                    center={[39.9741171, -75.1914883]}
                    zoom={13}
                    style={{
                    height: "100vh"
                }}>
                    <TileLayer
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        url={mapboxURL}
                        tileSize={512}
                        zoomOffset={-1}/> 
                    
                    {this.state.trails && (<GeoJSON data={this.state.trails}/>)}

                </MapContainer>
            </div>
        );
    }
}

export default MapView;