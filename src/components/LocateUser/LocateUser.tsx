import { useState } from "react";
import "./LocateUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { Rings } from "react-loader-spinner";

export const LocateUser = (map: any) => {
  const [finding, setFinding] = useState(false);
  const setLocation = () => {
    setFinding(true);
    map &&
      map.map.locate().on("locationfound", function (e: any) {
        map.map.flyTo(e.latlng, map.map.getZoom());
        setFinding(false);
      });
  };
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
