import {
    Slide,
    VStack,
    Box,
    Flex,
    Heading,
    Button,
  } from "@chakra-ui/react";

  import {useState} from 'react';


let coord = [];
let totalDistance = 0;
function RouteBuilder(props) {

    // this is to render the distance immediately
    const [,sr] = useState("");


    const handleChange = (event) => {
        props.onChange(false);
    }

    const PlotRoute = (c) => {
        if (props.drawerOpen) {
            let c_ = [c.lng,c.lat]
            const baseURL = "https://api.mapbox.com/directions/v5/mapbox/walking/";
            const params = "?geometries=geojson&access_token=" + process.env.REACT_APP_MAPBOX;
            const url = baseURL + c_ + ";" + coord[coord.length-1] + params;

            console.log(coord);
            if (coord.length > 1) {
                fetch(url, {method: 'GET'}).then((res) => {return res.json()}).then((res) => {
                    //setTotalDistance(totalDistance + res.routes[0].distance * 6.214e-4);
                    totalDistance += res.routes[0].distance * 6.214e-4;
                    sr();
                })
            };
            coord.push([c_]);
        }   
    }

    PlotRoute(props.coord);
    // useEffect(() => {
    //     PlotRoute(props.coord); 
    // });



    return (
        <>
            <Slide direction="bottom" in={props.drawerOpen} style={{height:'30%', width: '100%', zIndex: 1000 }}>
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
