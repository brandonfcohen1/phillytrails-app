import React, {Component} from 'react';
import {MapContainer, TileLayer, GeoJSON, Popup, LayersControl, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// const mapboxURL_streets = "https://api.mapbox.com/styles/v1/brandonfcohen/ckeykvju00t6b19phhhu7en4c/tiles/{" +
//         "z}/{x}/{y}{r}?access_token=" + process.env.REACT_APP_MAPBOX;

// const mapboxURL_image = "https://api.mapbox.com/styles/v1/brandonfcohen/ckgpuunqr162319n1i6gq8z99/tiles/{" +
// "z}/{x}/{y}{r}?access_token=" + process.env.REACT_APP_MAPBOX;

const mapboxURL = (id) => {
    return "https://api.mapbox.com/styles/v1/brandonfcohen/" + id +  "/tiles/{z}/{x}/{y}{r}?access_token=" + process.env.REACT_APP_MAPBOX;
}

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

        // load trails data
        fetch("/api/geojson/trails").then(res => res.json()).then(res => {this.setState({trails: res})})

    }

    render() {
        const {currentLocation, zoom} = this.state;

        return (
            <div className="map__container">
                <MapContainer
                    center={[39.9741171, -75.1914883]}
                    zoom={13}
                    style={{
                    height: "100vh"}
                }>

                    <LayersControl position="topright">
                        <LayersControl.BaseLayer checked name="Streets">
                            <TileLayer
                                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                                url={mapboxURL("ckeykvju00t6b19phhhu7en4c")}
                                tileSize={512}
                                zoomOffset={-1}/> 
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Satellie">
                            <TileLayer
                                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                                url={mapboxURL("ckgpuunqr162319n1i6gq8z99")}
                                tileSize={512}
                                opacity={0.9}
                                zoomOffset={-1}/> 
                        </LayersControl.BaseLayer>
                        <LayersControl.Overlay name="Marker with popup">
                            <Marker position={[39.9741171, -75.1914883]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                            </Marker>
                        </LayersControl.Overlay>

                        </LayersControl>
                    
                        
                    {this.state.trails && (<GeoJSON
                            data={this.state.trails}
                            style={(feature) => {
                                let style = {opacity: 0.8};
                                switch (feature.properties.type) {
                                    case 'paved trail':
                                        style['color'] = "#454545";
                                        break;
                                    case 'paved road':
                                        style['color'] = "#000000";
                                        break;
                                    case 'dirt trail':
                                        style['color'] = "#FF0000";
                                        break;
                                    case 'dirt road':
                                        style['color'] = "#800000";
                                        break;
                                    default:
                                        style['color'] = "#FF0000";
                                }
                            return style;
                        }}
                            onEachFeature={(feature, layer) => {
                                const p = feature.properties;
                                layer.bindPopup(
                                    "<b>" + p.name + "</b><br><i>" + p.length + " mi. " + p.type + "</i><br>" + p.segment_description
                                );
                            }
                        }/>)}

                </MapContainer>
            </div>
        );
    }
}

export default MapView;