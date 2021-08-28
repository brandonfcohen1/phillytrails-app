import {
    Slide,
    VStack,
    Box,
    Flex,
    Heading,
    Button,
  } from "@chakra-ui/react"


function RouteBuilder(props) {

    const handleChange = (event) => {
        props.onChange(false);
    }

    const baseURL = "https://api.mapbox.com/directions/v5/mapbox/walking/";
    let params = "?geometries=geojson&access_token=" + process.env.REACT_APP_MAPBOX;

    const plotRoute = (c1, c2) => {
        const url = baseURL + c1 + c2 + params;
        console.log(url)
    }

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
                        <Heading fontSize="xl">Insert more contents!!</Heading>
                    </Box>
                    {/* Insert other contents */}
                </VStack>
            </Slide>
        </>
    )
}

export default RouteBuilder
