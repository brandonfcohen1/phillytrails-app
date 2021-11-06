import { ReactNode, useState } from 'react';
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
  Image
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import RouteBuilder from '../RouteBuilder/RouteBuilder';
import Map from '../Map/Map';
import logo from '/pt_logo.png';

const Links = ['Map', 'About', 'Instagram'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function WithAction(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coord, setCoord] = useState("");

  const handleChange = () => {
    setDrawerOpen(!drawerOpen);
  }

  const routeId = props.id || 0;


  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Image src = "/pt_logo.png" alt="Logo" boxSize="70%"/></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              onClick={handleChange}
              leftIcon={<AddIcon />}>
              Action
            </Button>

          </Flex>
        </Flex>

        

        <RouteBuilder 
          drawerOpen={drawerOpen} 
          onChange={handleChange} 
          coord={coord} 
        />


        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => {
                if (link === "Instagram") {
                  return <NavLink key={link}>{"test"}</NavLink>
                } else {
                  return <NavLink key={link}>{"test"}</NavLink>
                }
              })}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Map 
        setCoord={setCoord}
        id={routeId}
      />
    </>
  );
}