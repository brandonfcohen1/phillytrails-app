
import {LatLngExpression} from "leaflet";
import {MapContainer, TileLayer} from "react-leaflet";

import "./Map.css";

const Map = () => {
    const defaultPosition : LatLngExpression = [39.9741171, -75.1914883];

    const mapboxURL = "https://api.mapbox.com/styles/v1/brandonfcohen/ckeykvju00t6b19phhhu7en4c/tiles/{" +
            "z}/{x}/{y}{r}?access_token=" + process.env.REACT_APP_MAPBOX;

    return (
        <div className="map__container">
            <MapContainer
                center={defaultPosition}
                zoom={13}
                style={{
                height: "100vh"
            }}>
                <TileLayer
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    url={mapboxURL}
                    tileSize={512}
                    zoomOffset={-1}/>

            </MapContainer>
        </div>
    );
};

export default Map;
