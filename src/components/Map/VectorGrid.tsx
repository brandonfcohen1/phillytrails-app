import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";

import L from "leaflet";

import "leaflet.vectorgrid";

export default function VectorGrid() {
  const { layerContainer, map } = useLeafletContext();

  const martinUrl = "http://localhost:3001/public.trails/{z}/{x}/{y}.pbf";

  const options = {
    type: "protobuf",
    idField: "OBJECTID",
    tooltip: "NAME",
    popup: (layer: any) => `<div>${layer.properties.NAME}</div>`,
    style: {
      weight: 0.5,
      opacity: 1,
      color: "#ccc",
      fillColor: "#390870",
      fillOpacity: 0.6,
      fill: true,
      stroke: true,
    },
    hoverStyle: {
      fillColor: "#390870",
      fillOpacity: 1,
    },
    activeStyle: {
      fillColor: "#390870",
      fillOpacity: 1,
    },
    zIndex: 401,
    interactive: true,
  };

  const vectorGrid = (L as any).vectorGrid.protobuf(martinUrl, options);
  vectorGrid.on('click', ()=>{console.log("click")})

  const container = layerContainer || map;

  useEffect(() => {
    container.addLayer(vectorGrid);
    return () => {
      container.removeLayer(vectorGrid);
    };
  }, []);

  return null;
}
