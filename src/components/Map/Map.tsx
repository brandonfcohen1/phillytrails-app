import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import RouteBuilder from "../RouteBuilder/RouteBuilder";
import LeafletMap from "../LeafletMap/LeafletMap";
import AboutModal from "../AboutModal/AboutModal";



const NavLink = (props: any) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    onClick={props.onClick}
  >
    {props.children}
  </Link>
);

export default function WithAction(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coord, setCoord] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(false);
  }

  const Links = [
    { text: "About", onClick: () => {setModalOpen(!modalOpen)} },
    { text: "Instagram", onClick: () => {window.open("https://www.instagram.com/phillytrails/", "_blank")} },
  ];

  const handleChange = () => {
    setDrawerOpen(!drawerOpen);
  };

  const routeId = props.id || 0;

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={-14} alignItems={"center"}>
            <Box mx={0} mr={0}>
              <Link href="/">
                <Image src="/pt_logo.png" alt="Logo" boxSize="70%" />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.text} onClick={link.onClick}>
                  {link.text}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              onClick={handleChange}
              leftIcon={<AddIcon />}
            >
              RouteBuilder
            </Button>
          </Flex>
        </Flex>
        <AboutModal open={modalOpen} toggleModal={toggleModal} />

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.text} onClick={link.onClick}>
                  {link.text}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}

        <LeafletMap setCoord={setCoord} id={routeId} />

        <RouteBuilder
          drawerOpen={drawerOpen}
          onChange={handleChange}
          coord={coord}
        />
      </Box>
    </>
  );
}
