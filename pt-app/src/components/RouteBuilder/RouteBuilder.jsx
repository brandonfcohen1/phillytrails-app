import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input
  } from "@chakra-ui/react"
import React from 'react'


function RouteBuilder(props) {
    const btnRef = React.useRef()

    const handleChange = (event) => {
        props.onChange(false);
    }


    return (
        <>
        <Drawer
            isOpen={props.drawerOpen}
            placement="right"
            onClose={handleChange}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
                <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
                <Button variant="outline" mr={3} onClick={handleChange}>
                Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>
    )
}

export default RouteBuilder
