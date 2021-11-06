import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";

import L from "leaflet";

import "leaflet.vectorgrid";


export default function VectorGrid(props) {
  const { layerContainer, map } = useLeafletContext();

  const martinUrl = 'http://localhost:3001/public.trails/{z}/{x}/{y}.pbf';

  const vectorGrid = L.vectorGrid.protobuf(martinUrl, {onClick: ()=>{console.log("hello")}});

  const container = layerContainer || map;

  useEffect(() => {
    container.addLayer(vectorGrid);
    return () => {
      container.removeLayer(vectorGrid);
    };
  }, []);

  return null;
}
