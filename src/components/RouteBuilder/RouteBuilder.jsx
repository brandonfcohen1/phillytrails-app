import {
    Slide,
    VStack,
    Box,
    Flex,
    Heading,
    Button,
  } from "@chakra-ui/react";

import {useState, useEffect} from 'react';


let coord = [];
//let totalDistance = 0;
function RouteBuilder(props) {

    // this is used to render the distance immediately
    const [,sr] = useState("");

    const [totalDistance, setTotalDistance] = useState(0);


    const handleChange = (event) => {
        props.onChange(false);
    }

    const PlotRoute = (c) => {
        console.log("w")
        if (props.drawerOpen) {
            let c_ = [c.lng,c.lat]
            console.log("c_ " + c_)
            const baseURL = "https://api.mapbox.com/directions/v5/mapbox/walking/";
            const params = "?geometries=geojson&access_token=" + process.env.REACT_APP_MAPBOX;
            const url = baseURL + c_ + ";" + coord[coord.length-1] + params;

            if (coord.length > 1) {
                fetch(url).then((res) => {return res.json()}).then((res) => {
                    console.log("promise")
                    //props.handleBuiltRoute(res.routes[0].geometry);
                    //totalDistance += res.routes[0].distance * 6.214e-4;
                    setTotalDistance(totalDistance + res.routes[0].distance * 6.214e-4);
                    sr();
                })
            };
            coord.push([c_]);
        }   
        return null;
    }

    useEffect(() => {
        PlotRoute(props.coord);
    })

    //PlotRoute(props.coord);
    


    return (
        <>
            <Slide direction="bottom" in={props.drawerOpen} style={{height:'30%', width: '100%', zIndex: 1000 }}>
                {/* <PlotRoute c={props.coord} /> */}
                <VStack            
                    color="black"
                    bg="white"
                    rounded="md"
                    h="100vh"
                    w="100%"
                    overflowY="scroll">
                    <Button aria-label="Search database"  onClick={handleChange}  />
                    <Box p={5} shadow="md" borderWidth="1px" m="5px" bg="purple.700" color="white">
                        <Flex> {/* Put in a flex to get the close button on the right */}
                            <Heading fontSize={28}>Title <span role="img" aria-label="bus">🚌</span> </Heading>
                        </Flex>
                        <i> Last updated: January 4, 2021</i>
                    </Box>
                    <Box p={5} shadow="md" borderWidth="1px" m="5px">
                        <Heading fontSize="xl">{totalDistance}</Heading>
                    </Box>
                    
                </VStack>
            </Slide>
        </>
    )
}

export default RouteBuilder
