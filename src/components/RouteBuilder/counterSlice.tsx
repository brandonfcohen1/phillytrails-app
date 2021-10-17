import { createSlice } from "@reduxjs/toolkit";
import { GeoJsonObject } from "geojson";

const blankGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: [] },
    },
  ],
} as GeoJsonObject;

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    route: blankGeoJSON as any,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload.routes[0].distance * 6.214e-4;
      const coord = action.payload.routes[0].geometry.coordinates;
      for (var i = 0; i < coord.length; i++) {
        state.route.features[0].geometry.coordinates.push(coord[i]);
      }
    },
    reset: (state) => {
      state.value = 0;
      state.route = blankGeoJSON;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

export default counterSlice.reducer;
