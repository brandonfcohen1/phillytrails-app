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
import { useDisclosure } from "@chakra-ui/hooks"
import React from 'react'


function RouteBuilder(props) {
    //const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    console.log(props)

    const handleChange = (event) => {
        // Here, we invoke the callback with the new value
        props.onChange(false);
    }

    // const onClose = () => {
    //     status = {status: false};
    //     console.log(status)
    // }

    return (
        <>
        {/* <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            Open
        </Button> */}
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
