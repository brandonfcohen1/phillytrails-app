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
import Map from "../MapContainer/MapContainer";

const Links = ["Map", "About", "Instagram"];

const NavLink = (props: any) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={props.href}
    target={props.target}
  >
    {props.children}
  </Link>
);

export default function WithAction(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coord, setCoord] = useState("");

  const handleChange = () => {
    setDrawerOpen(!drawerOpen);
  };

  const routeId = props.id || 0;

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} >
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
              <Image src="/pt_logo.png" alt="Logo" boxSize="70%" />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link} href={"google.com"} target={"_blank"}>
                  {link}
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

        <Map setCoord={setCoord} id={routeId} />

        <RouteBuilder
          drawerOpen={drawerOpen}
          onChange={handleChange}
          coord={coord}
        />

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => {
                if (link === "Instagram") {
                  return <NavLink key={link}>{"test"}</NavLink>;
                } else {
                  return <NavLink key={link}>{"test"}</NavLink>;
                }
              })}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
