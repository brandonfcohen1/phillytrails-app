import {
    Slide,
    VStack,
    HStack,
    Box,
    Flex,
    Heading,
    Button,
  } from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import {useState, useEffect} from 'react';
import counterSlice, {incrementByAmount, reset} from './counterSlice'



let coord = [];
function RouteBuilder(props) {

    const [activeMeasure, setActiveMeasure] = useState(false);

    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        props.onChange(false);
        setActiveMeasure(false);
        dispatch(reset());
    }

    const handleActiveMeasure = () => {
        setActiveMeasure(true);
    }

    const handleReset = () => {
        dispatch(reset());
        setActiveMeasure(false);
        coord = [];
    }

    // rewrite this

    const PlotRoute = (c) => {
        if (props.drawerOpen && activeMeasure) {
            console.log(activeMeasure);
            let c_ = [c.lng,c.lat]
            const baseURL = "https://api.mapbox.com/directions/v5/mapbox/walking/";
            const params = "?geometries=geojson&access_token=" + process.env.REACT_APP_MAPBOX;
            const url = baseURL + c_ + ";" + coord[coord.length-1] + params;

            if (coord.length > 1) {
                fetch(url).then((res) => {return res.json()}).then((res) => {
                    dispatch(incrementByAmount(res.routes[0].distance * 6.214e-4));
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
                    <HStack>
                        <Button aria-label="close" onClick={handleChange}>Close</Button>
                        <Button aria-label="close" onClick={handleActiveMeasure}>Start</Button>
                        <Button aria-label="reset" onClick={handleReset}>Reset</Button>
                    </HStack>
                    <Box p={5} shadow="md" borderWidth="1px" m="5px" bg="purple.700" color="white">
                        <Flex> {/* Put in a flex to get the close button on the right */}
                            <Heading fontSize={28}>Title </Heading>
                        </Flex>
                        <i> Last updated: January 4, 2021</i>
                    </Box>
                    <Box p={5} shadow="md" borderWidth="1px" m="5px">
                        <Heading fontSize="xl">{count}</Heading>
                    </Box>
                    
                </VStack>
            </Slide>
        </>
    )
}

export default RouteBuilder
