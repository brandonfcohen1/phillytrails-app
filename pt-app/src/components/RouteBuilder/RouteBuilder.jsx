import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input, 
    Slide,
    VStack,
    Box,
    Flex,
    Heading,
    IconButton,
    CloseIcon,
    onToggle
  } from "@chakra-ui/react"
import React from 'react'


function RouteBuilder(props) {
    const btnRef = React.useRef()

    const handleChange = (event) => {
        props.onChange(false);
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
                <Box p={5} shadow="md" borderWidth="1px" m="5px" bg="purple.700" color="white">
                    <Flex> {/* Put in a flex to get the close button on the right */}
                    <Heading fontSize={28}>Title <span role="img" aria-label="bus">🚌</span> </Heading>
                    {/* <IconButton aria-label="Close Control Panel" icon={<CloseIcon />} onClick={handleChange} color="black"/> */}
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
