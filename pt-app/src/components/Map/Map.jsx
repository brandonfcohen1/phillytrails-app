import React, {Component} from 'react';
import {MapContainer, TileLayer, GeoJSON, Popup, LayersControl, Marker, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import './Map.css'

const mapboxURL = (id) => {
    return "https://api.mapbox.com/styles/v1/brandonfcohen/" + id +  "/tiles/{z}/{x}/{y}{r}?access_token=" + process.env.REACT_APP_MAPBOX;
}


const ClearWideLines = (prev) => {
    useMapEvents({
      click() {
        prev.prev.options.weight = 3;
      },
    })
    return 0;
}

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {
                lat: 52.52437,
                lng: 13.41053
            },
            zoom: 12,
            trails: "",
            prevClick: "",
        }
    }

    componentDidMount() {

        // load trails data
        fetch("/api/geojson/trails").then(res => res.json()).then(res => {this.setState({trails: res})})

    }


    render() {
        return (
            <div className="map__container">
                <MapContainer
                    center={[39.9741171, -75.1914883]}
                    zoom={13}
                    style={{height: "calc(100vh - 64px)"}}
                    renderer = {L.canvas({ tolerance: 5 })}
                >

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
                                layer.on('click', (e) => {
                                    const prev = this.state.prevClick;
                                    if (prev) {
                                        prev.options.weight = 3
                                    };
                                    e.target.options.weight = 6.5;
                                    this.setState({currentLocation: e.latLng, prevClick: e.target});
                                })
                            }
                        }/>)}
                    <ClearWideLines prev={this.state.prevClick} />
                </MapContainer>
            </div>
        );
    }
}

export default Map;