import {
  Slide,
  VStack,
  HStack,
  Box,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { incrementByAmount, reset } from "./counterSlice";
import { RootState } from "../../app/store";

let coord: any = [];
function RouteBuilder(props: any) {
  const [activeMeasure, setActiveMeasure] = useState(false);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const handleChange = () => {
    props.onChange(false);
    setActiveMeasure(false);
    dispatch(reset());
  };

  const handleActiveMeasure = () => {
    setActiveMeasure(true);
  };

  const handleReset = () => {
    dispatch(reset());
    setActiveMeasure(false);
    coord = [];
  };

  useEffect(() => {
    const c = props.coord;
    if (props.drawerOpen && activeMeasure) {
      let c_ = [c.lng, c.lat];
      const baseURL = "https://api.mapbox.com/directions/v5/mapbox/walking/";
      const params =
        "?geometries=geojson&access_token=" + process.env.REACT_APP_MAPBOX;
      const url = baseURL + coord[coord.length - 1] + ";" + c_ + params;

      if (coord.length > 1) {
        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            dispatch(incrementByAmount(res)); //res.routes[0].distance * 6.214e-4));
          });
      }
      coord.push([c_]);
    }
  }, [props.coord, activeMeasure, dispatch, props.drawerOpen]);

  return (
    <>
      <Slide
        direction="bottom"
        in={props.drawerOpen}
        style={{ height: "15%", width: "100%", zIndex: 1000 }}
      >
        <VStack
          color="black"
          bg="white"
          rounded="md"
          h="100%"
          w="100%"
          overflowY="scroll"
        >
          <HStack>
            <Button
              aria-label="close"
              onClick={handleActiveMeasure}
              backgroundColor={"#90ee90"}
              _hover={{ fontWeight: "semibold" }}
            >
              Start
            </Button>
            <Button
              aria-label="reset"
              onClick={handleReset}
              backgroundColor={""}
            >
              Reset
            </Button>
            <Button
              aria-label="close"
              onClick={handleChange}
              backgroundColor={"gray"}
            >
              Close
            </Button>
          </HStack>
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            m="5px"
            bg="purple.700"
            color="white"
          >
            <Flex>
              <Heading fontSize="xl">
                {count > 0 ? "Route Distance: " + Math.round(count * 100) / 100 + " mi.": "Press Start"}
              </Heading>
            </Flex>
          </Box>
        </VStack>
      </Slide>
    </>
  );
}

export default RouteBuilder;
