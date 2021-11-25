import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  useMapEvents,
  FeatureGroup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./LeafletMap.css";
import Legend from "../Legend/Legend";
import { useSelector } from "react-redux";
import hash from "object-hash";
import { RootState } from "../../app/store";

const mapboxURL = (id: string) => {
  return (
    "https://api.mapbox.com/styles/v1/brandonfcohen/" +
    id +
    "/tiles/{z}/{x}/{y}{r}?access_token=" +
    process.env.REACT_APP_MAPBOX
  );
};

const LeafletMap = (props: any) => {
  const [trails, setTrails] = useState("");
  const [lines, setLines] = useState("");
  const [stops, setStops] = useState("");
  const [bikes, setBikes] = useState("");
  const [center, setCenter] = useState([39.9741171, -75.1914883]);

  const [prevClick, setPrevClick] = useState("" as any);

  const ClearWideLines = () => {
    useMapEvents({
      click(e) {
        props.setCoord(e.latlng);
        try {
          prevClick.options.weight = 3;
        } catch {}
      },
    });
    return null;
  };

  const clearPrev = () => {
    try {
      prevClick.options.weight = 3;
    } catch {}
  };

  useEffect(() => {
    // load trails data
    fetch(process.env.REACT_APP_API_URL + "/api/geojson/trails", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setTrails(JSON.stringify(res));
      }).catch()

    // load transit lines data
    fetch(process.env.REACT_APP_API_URL + "/api/geojson/transit_lines", {
      mode: "cors",
    }).catch()
      .then((res) => res.json())
      .then((res) => {
        setLines(JSON.stringify(res));
      })
      .catch();

    // load transit stops data
    fetch(process.env.REACT_APP_API_URL + "/api/geojson/transit_stops", {
      mode: "cors",
    }).catch()
      .then((res) => res.json())
      .then((res) => {
        setStops(JSON.stringify(res));
      })
      ;

    // load Indego data
    fetch("https://kiosks.bicycletransit.workers.dev/phl")
      .then((res) => res.json())
      .then((res) => {
        setBikes(JSON.stringify(res));
      })
      .catch();
  }, []);

  useEffect(() => {
    // get route details based on id, if /route/id is accessed
    if (props.id) {
      fetch("/api/center/trail/" + props.id.id)
        .then((res) => res.json())
        .then((res) => {
          const parseCoord = res.rows[0].centroid
            .split("(")[1]
            .split(")")[0]
            .split(" ");
          setCenter([parseFloat(parseCoord[1]), parseFloat(parseCoord[0])]);
        });
    }
  }, [props]);

  // Custom Icons

  const indegoIcon = L.icon({
    iconUrl: "/indego_logo.png",
    iconSize: [12, 18],
  }) as any;

  const septaStopIcon = L.icon({
    iconUrl: "./septa.png",
    iconSize: [12, 18],
  }) as any;

  const routebuilt = useSelector((state: RootState) => state.counter.route);

  // function to set center when loading a specific route
  const CenterMap = () => {
    const map = useMap();
    if (window.location.toString().indexOf("route") > -1) {
      map.setView([center[0], center[1]], 16);
    }
    return null;
  };

  return (
    <>
      <div className="map__container">
        <MapContainer
          center={[center[0], center[1]]}
          zoom={13}
          style={{ height: "calc(100% - 64px)" }}
          tap={false}
          renderer={L.canvas({ tolerance: 5 })} // this allows for line clicks with a tolerance of 5px
        >
          <Legend />
          <CenterMap />

          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Streets">
              <TileLayer
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                url={mapboxURL("ckeykvju00t6b19phhhu7en4c")}
                tileSize={512}
                zoomOffset={-1}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellie">
              <TileLayer
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                url={mapboxURL("ckgpuunqr162319n1i6gq8z99")}
                tileSize={512}
                opacity={0.9}
                zoomOffset={-1}
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay name="Public Transit">
              <FeatureGroup>
                {lines && (
                  <GeoJSON
                    data={JSON.parse(lines)}
                    style={(feature) => {
                      const p = feature?.properties;
                      let style = { opacity: 0.8, color: "#A020F0" };
                      if (p.route === "Broad Street Line") {
                        style.color = "#FFA500";
                      } else if (p.route === "Market-Frankford Line") {
                        style.color = "#0000FF";
                      } else if (p.route === "Patco Speedline") {
                        style.color = "#FF0000";
                      } else if (p.type === "Trolley") {
                        style.color = "#00FF00";
                      }
                      return style;
                    }}
                    onEachFeature={(feature, layer) => {
                      const p = feature.properties;
                      layer.bindPopup(
                        "<b>" +
                          p.route +
                          "</b><br><i>" +
                          p.agency +
                          "</i> " +
                          p.type
                      );
                    }}
                  />
                )}
                {stops && (
                  <GeoJSON
                    data={JSON.parse(stops)}
                    // @ts-expect-error
                    pointToLayer={(feature: Feature<Point>, latlng: LatLng) => {
                      // Hide trolley stops
                      if (feature.properties.route.indexOf("Trolley") === -1) {
                        return L.marker(latlng, { icon: septaStopIcon });
                      }
                    }}
                    onEachFeature={(feature, layer) => {
                      const p = feature.properties;
                      layer.bindPopup(
                        "<b>" + p.route + "</b>: " + p.station_name
                      );
                    }}
                  />
                )}
              </FeatureGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Indego">
              {bikes && (
                <GeoJSON
                  data={JSON.parse(bikes)}
                  pointToLayer={(feature, latlng) => {
                    return L.marker(latlng, { icon: indegoIcon });
                  }}
                  onEachFeature={(feature, layer) => {
                    layer.bindPopup(
                      "<b>" +
                        feature.properties.name +
                        "</b><br><i>" +
                        feature.properties.addressStreet +
                        "</i><br>Bikes available: " +
                        feature.properties.bikesAvailable +
                        "<br>Docks available: " +
                        feature.properties.docksAvailable
                    );
                  }}
                />
              )}
            </LayersControl.Overlay>
          </LayersControl>

          {/* this key/hash thing is hacky, but recommended by the author of react-leaflet*/}
          {routebuilt && <GeoJSON data={routebuilt} key={hash(routebuilt)} />}

          {trails && (
            <GeoJSON
              data={JSON.parse(trails)}
              style={(feature) => {
                let style = { opacity: 0.8, color: "#FF0000" };
                switch (feature?.properties.type) {
                  case "paved trail":
                    style["color"] = "#454545";
                    break;
                  case "paved road":
                    style["color"] = "#000000";
                    break;
                  case "dirt trail":
                    style["color"] = "#FF0000";
                    break;
                  case "dirt road":
                    style["color"] = "#800000";
                    break;
                  default:
                    style["color"] = "#FF0000";
                }
                return style;
              }}
              onEachFeature={(feature, layer) => {
                const p = feature.properties;
                layer.bindPopup(
                  "<b>" +
                    p.name +
                    "</b><br><i>" +
                    p.length +
                    " mi. " +
                    p.type +
                    "</i><br>" +
                    p.segment_description 
                );
              }}
              eventHandlers={{
                click: (e) => {
                  props.setCoord(e.latlng);
                  clearPrev();
                  e.propagatedFrom.options.weight = 6.5;
                  setPrevClick(e.propagatedFrom);
                },
              }}
            />
          )}

          <ClearWideLines />
        </MapContainer>
      </div>
    </>
  );
};

export default LeafletMap;
