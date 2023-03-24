import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "./Legend.css";
import { mapPropsOn } from "../LeafletMap/LeafletMap";

const generateLegend = (
  legendDiv: any,
  title: string,
  types: string[],
  colors: string[]
) => {
  legendDiv.innerHTML += "<p><b>" + title + "</b></p>";

  for (let i = 0; i < types.length; i++) {
    legendDiv.innerHTML +=
      '<i style="background:' +
      colors[i] +
      '">&nbsp&nbsp&nbsp&nbsp</i> ' +
      types[i] +
      "<br>";
  }

  return legendDiv;
};

export default function Legend(props: mapPropsOn) {
  const [currLegend, setCurrLegend] = useState<any>();
  const map = useMap();

  useEffect(() => {
    if (currLegend) {
      map.removeControl(currLegend);
    }

    // Add base legend
    let legend = new L.Control();

    legend.options.position = "bottomleft";

    legend.onAdd = () => {
      let div = L.DomUtil.create("div", "info legend");

      div = generateLegend(
        div,
        "Trails",
        ["paved trail", "paved road", "dirt trail", "dirt road"],
        ["#454545", "#000000", "#FF0000", "#800000"]
      );

      if (props.streets) {
        div = generateLegend(
          div,
          "Level of Traffic Stress",
          [
            "Relaxing, suitable for most riders",
            "Comfortable for most adults",
            "Comfortable for confident bicyclists",
            "Uncomfortable for most",
            "Off-road trail/path",
          ],
          ["#348939", "#FDBF02", "#FE7E03", "#9B1D1E", "#348939"]
        );
      }

      if (props.sidewalks) {
        div = generateLegend(div, "Sidewalks", ["sidewalks"], ["#808080"]);
      }
      return div;
    };

    legend.addTo(map);
    setCurrLegend(legend);
    // eslint-disable-next-line
  }, [map, props]);

  return null;
}
