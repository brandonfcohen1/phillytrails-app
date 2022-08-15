import { useState } from "react";
import "./LocateUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { Rings } from "react-loader-spinner";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const LocateUser = (map: any) => {
  const [finding, setFinding] = useState(false);
  const setLocation = () => {
    setFinding(true);
    map &&
      map.map.locate().on("locationfound", function (e: any) {
        map.map.flyTo(e.latlng, map.map.getZoom());
        L.marker(e.latlng, { icon: basicIcon })
          .bindPopup("Current Location")
          .addTo(map.map);
        setFinding(false);
      });
  };

  const basicIcon = L.icon({
    iconUrl: "/marker_icon.png",
    iconSize: [24, 36],
  }) as any;

  return (
    <div className="location-button">
      <button onClick={setLocation}>
        {finding ? (
          <div style={{ verticalAlign: "center" }}>
            <Rings
              height={15}
              width={15}
              color="#000000"
              ariaLabel="revolving-dot-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <FontAwesomeIcon icon={faCrosshairs} />
        )}
      </button>
    </div>
  );
};
