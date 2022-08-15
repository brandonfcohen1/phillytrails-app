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
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FeatureLayer } from "react-esri-leaflet";

const mapboxURL = (id: string) => {
  return (
    "https://api.mapbox.com/styles/v1/brandonfcohen/" +
    id +
    "/tiles/{z}/{x}/{y}{r}?access_token=" +
    process.env.REACT_APP_MAPBOX
  );
};

const LTSMapping = (ltsString: string) => {
  switch (ltsString) {
    case "LTS 1":
      return {
        style: { color: "#348939" },
        description: "Relaxing, suitable for most riders",
      };
    case "LTS 2":
      return {
        style: { color: "#FDBF02" },
        description: "Comfortable for most adults",
      };
    case "LTS 3":
      return {
        style: { color: "#FE7E03" },
        description: "Comfortable for confident bicyclists",
      };
    case "LTS 4":
      return {
        style: { color: "#9B1D1E" },
        description: "Uncomfortable for most",
      };
    case "Off-road trail/path":
      return {
        style: { color: "#348939" },
        description: "Off-road trail/path",
      };
  }
};

export interface mapPropsOn {
  streets: boolean;
  sidewalks: boolean;
}

const LeafletMap = (props: any) => {
  const [trails, setTrails] = useState("");
  const [lines, setLines] = useState("");
  const [stops, setStops] = useState("");
  const [bikes, setBikes] = useState("");
  const [injury, setInjury] = useState("");
  const [sidewalks, setSidewalks] = useState(false);
  const [streets, setStreets] = useState(false);
  const [map, setMap] = useState<any>(null);

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
      })
      .catch();

    // load transit lines data
    fetch(process.env.REACT_APP_API_URL + "/api/geojson/transit_lines", {
      mode: "cors",
    })
      .catch()
      .then((res) => res.json())
      .then((res) => {
        setLines(JSON.stringify(res));
      })
      .catch();

    // load transit stops data
    fetch(process.env.REACT_APP_API_URL + "/api/geojson/transit_stops", {
      mode: "cors",
    })
      .catch()
      .then((res) => res.json())
      .then((res) => {
        setStops(JSON.stringify(res));
      });

    // load Indego data
    fetch("https://kiosks.bicycletransit.workers.dev/phl")
      .then((res) => res.json())
      .then((res) => {
        setBikes(JSON.stringify(res));
      })
      .catch();

    // load High Injury Network data
    fetch(
      process.env.REACT_APP_API_URL + "/api/geojson/high_injury_network_2020",
      {
        mode: "cors",
      }
    )
      .catch()
      .then((res) => res.json())
      .then((res) => {
        setInjury(JSON.stringify(res));
      });
  }, []);

  useEffect(() => {
    // get route details based on id, if /route/id is accessed
    if (props.id) {
      fetch(
        process.env.REACT_APP_API_URL + "/api/center/trail/" + props.id.id,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          const parseCoord = res.rows[0].centroid
            .split("(")[1]
            .split(")")[0]
            .split(" ");
          props.setCenter([
            parseFloat(parseCoord[1]),
            parseFloat(parseCoord[0]),
          ]);
        });
    }
    // eslint-disable-next-line
  }, []);

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

  useEffect(() => {
    if (window.location.toString().indexOf("route") > -1) {
      map && map.flyTo(props.center, 16);
    } else {
      map && map.flyTo(props.center, 12);
    }
  }, [props.center, map]);

  const MapHook = () => {
    const getMap = useMap();
    useEffect(() => {
      setMap(getMap);
    }, [getMap]);

    return null;
  };

  const LocateUser = () => {
    const setLocation = () => {
      map &&
        map.locate().on("locationfound", function (e: any) {
          props.setCenter(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        });
    };
    return (
      <div style={{ top: 120, left: 50, zIndex: 20000, position: "absolute" }}>
        <button onClick={setLocation}>hello</button>
      </div>
    );
  };

  return (
    <>
      <div className="map__container">
        <LocateUser />
        <MapContainer
          center={props.center}
          zoom={props.id ? 16 : 13}
          style={{ height: "calc(100% - 64px)" }}
          tap={false}
          renderer={L.canvas({ tolerance: 5 })} // this allows for line clicks with a tolerance of 5px
        >
          <Legend streets={streets} sidewalks={sidewalks} />
          <MapHook />

          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Streets">
              <TileLayer
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                url={mapboxURL("ckeykvju00t6b19phhhu7en4c")}
                tileSize={512}
                zoomOffset={-1}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
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
                    attribution="<a target='_blank' href='https://septaopendata-septa.opendata.arcgis.com/'>SEPTA</a>"
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
                  attribution="<a target='_blank' href='https://www.rideindego.com/'>Indego</a>"
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
            <LayersControl.Overlay name="High Injury Network">
              {injury && (
                <GeoJSON
                  attribution="<a target='_blank' href='https://www.opendataphilly.org/dataset/high-injury-network'>Open Data Philly</a>"
                  data={JSON.parse(injury)}
                  onEachFeature={(feature, layer) => {
                    layer.bindPopup(
                      "<b>Street: </b>" + feature.properties.street_name
                    );
                  }}
                  style={() => {
                    return { color: "black", opacity: 0.8 };
                  }}
                />
              )}
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Level of Traffic Stress">
              <FeatureLayer
                // @ts-expect-error
                url={
                  "https://arcgis.dvrpc.org/portal/rest/services/Transportation/BSTRESSv2_ExistingConditionLTS/FeatureServer/0"
                }
                minZoom={16}
                simplifyFactor={1}
                attribution="<a target='_blank' href='https://www.dvrpc.org/'>DVRPC</a>"
                style={(feature: any) => {
                  const p = feature?.properties;
                  let style = { opacity: 0.8, color: "#A020F0", weight: 2 };
                  style.color = LTSMapping(p.linklts)?.style.color || "#A020F0";
                  return style;
                }}
                onEachFeature={(feature: any, layer: any) => {
                  const p = feature?.properties;
                  layer.bindPopup(
                    "<b>Street Class: </b>" +
                      LTSMapping(p.linklts)?.description +
                      "<br><b>Bike Facilities: </b>" +
                      p.bikefacili +
                      "<br><b>Number of Lanes: </b>" +
                      p.numlanes +
                      "<br><b>Avg Traffic Speed: </b>" +
                      p.speed
                  );
                }}
                eventHandlers={{
                  loading: () => setStreets(true),
                  removefeature: () => setStreets(false),
                }}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Sidewalks">
              <FeatureLayer
                // @ts-expect-error
                url={
                  "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/PedPortal_AppFeatures/FeatureServer/5"
                }
                minZoom={17}
                simplifyFactor={1}
                attribution="<a target='_blank' href='https://www.dvrpc.org/'>DVRPC</a>"
                style={(feature: any) => {
                  let style = { opacity: 0.8, color: "#808080", weight: 2 };
                  return style;
                }}
                onEachFeature={(feature: any, layer: any) => {
                  const p = feature?.properties;
                  layer.bindPopup(
                    "<b>Material: </b>" +
                      p.material.toLowerCase() +
                      "<br><b>Type: </b>" +
                      p.feat_type.toLowerCase()
                  );
                }}
                eventHandlers={{
                  loading: () => setSidewalks(true),
                  removefeature: () => setSidewalks(false),
                }}
              />
            </LayersControl.Overlay>
          </LayersControl>

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
                const safety = p.safety
                  ? "<br><b>Safety</b><br>" + p.safety
                  : "";
                layer.bindPopup(
                  "<b>" +
                    p.name +
                    "</b>&nbsp&nbsp&nbsp<button onclick='navigator.clipboard.writeText(`https://www.phillytrails.com/route/" +
                    p.id +
                    "`); var elem = document.querySelector(`#copied`); elem.innerHTML = `Link copied to clipboard!`;'>" +
                    ReactDOMServer.renderToString(
                      <FontAwesomeIcon icon={faShareSquare} />
                    ) +
                    "</button><div id='copied'></div><i>" +
                    p.length +
                    " mi. " +
                    p.type +
                    "</i><br>" +
                    p.segment_description +
                    "</i><br>" +
                    safety
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
