import {useEffect, useState} from 'react';
import {MapContainer, TileLayer, GeoJSON, LayersControl, useMapEvents, FeatureGroup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import indego_logo from './indego_logo.png';
import './Map.css'

const mapboxURL = (id) => {
    return "https://api.mapbox.com/styles/v1/brandonfcohen/" + id +  "/tiles/{z}/{x}/{y}{r}?access_token=" + process.env.REACT_APP_MAPBOX;
}




const Map = (props) => {
    const [trails, setTrails] = useState("");
    const [lines, setLines] = useState("");
    const [stops, setStops] = useState("");
    const [bikes, setBikes] = useState("");

    const [prevClick, setPrevClick] = useState("");


    const ClearWideLines = () => {
        useMapEvents({
          click(e) {
            props.setCoord(e.latlng);
            try {
                prevClick.options.weight = 3;
            } catch {}
          },
        })
        return 0;
    }

    const clearPrev = () => {
        //console.log(prevClick)
        try {
            prevClick.options.weight = 3
            
        } catch (e) {
            //console.log(e);
        }
    }

    const MapZoom = () => {
        useMapEvents({
            zoom(e) {
              console.log(e.target._zoom);
            }
        })
        return null;
    }

    useEffect(() => {

        // load trails data
        fetch("/api/geojson/trails").then(res => res.json()).then(res => {setTrails(res)});

        // load transit lines data
        fetch("/api/geojson/transit_lines").then(res => res.json()).then(res => {setLines(res)});

        // load transit stops data
        fetch("/api/geojson/transit_stops").then(res => res.json()).then(res => {setStops(res)});

        // load Indego data
        fetch("https://kiosks.bicycletransit.workers.dev/phl").then(res => res.json()).then(res => {setBikes(res)});
        
    }, []);


    // Custom Icons

    const indegoIcon = new L.icon({
        iconUrl: './indego_logo.png',
        iconSize:  [12, 18],
    });


    return (
        <div className="map__container">
            <MapContainer
                center={[39.9741171, -75.1914883]}
                zoom={13}
                style={{height: "calc(100vh - 64px)"}}
                renderer = {L.canvas({ tolerance: 5 })} // this allows for line clicks with a tolerance of 5px
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
                    <LayersControl.Overlay name="Public Transit">
                        <FeatureGroup>
                            {lines && (<GeoJSON
                                data={lines}
                                onEachFeature={(feature, layer) => {
                                    const p = feature.properties;
                                    layer.bindPopup(
                                        "<b>" + p.Route + "</b><br><i>" + p.agency + "</i> " + p.type
                                    );
                                }}
                            />)}
                            {stops && (<GeoJSON
                                data={stops}
                            />)}
                        </FeatureGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Indego">
                        {bikes && (<GeoJSON
                            data = {bikes}
                            pointToLayer = {(feature, latlng) => {
                                return L.marker(latlng, {icon: indegoIcon});
                            }}
                        />)}

                    
                    </LayersControl.Overlay>

                </LayersControl>
                    
                {trails && (<GeoJSON
                        data={trails}
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
                                props.setCoord(e.latlng);
                                clearPrev();
                                e.target.options.weight = 6.5;
                                setPrevClick(e.target);
                            })
                        }
                    }/>)}

                <ClearWideLines prev={prevClick} />
                <MapZoom />
            </MapContainer>
        </div>
    );
}

export default Map;