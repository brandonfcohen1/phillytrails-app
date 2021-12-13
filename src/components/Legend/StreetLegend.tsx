import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "./Legend.css";

export default function Legend(props: any) {
  const map = useMap();
  const [legendSet, setLegendSet] = useState(false);

  useEffect(() => {
    if (props.streets && !legendSet) {
      let streetsLegend = new L.Control();
      streetsLegend.options.position = "bottomleft";
      streetsLegend.onAdd = function (map: any) {
        let div = L.DomUtil.create("div", "info legend"),
          types = [
            "Relaxing, suitable for most riders",
            "Comfortable for most adults",
            "Comfortable for confident bicyclists",
            "Uncomfortable for most",
            "Off-road trail/path",
          ],
          colors = ["#348939", "#FDBF02", "#FE7E03", "#9B1D1E", "#348939"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (let i = 0; i < types.length; i++) {
          div.innerHTML +=
            '<i style="background:' +
            colors[i] +
            '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            types[i] +
            "<br>";
        }
        return div;
      };
      streetsLegend.addTo(map);
      setLegendSet(true);
    }
  }, [props.streets, legendSet, map]);
  return null;
}
