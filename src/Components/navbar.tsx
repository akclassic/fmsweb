// src/components/Navbar.tsx

import React from 'react';
import {
  Box,
  Flex,
  Link,
  Button,
  useColorMode,
  useColorModeValue,
  Stack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { VscAccount } from "react-icons/vsc";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('black', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={bg} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>Salvage Enterprises</Box>
        <Flex display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
          <Stack direction={'row'} spacing={4}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/login">Login</Link>
            <Link href="/profile">Profile</Link>
            {/* <LanguageSelector /> */}
            {/* <IconButton
              size="md"
              icon={<VscAccount />}
              aria-label="Profile"
              mr={2}
              ml={2}
            /> */}
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            mr={4}
          />
          {/* <Stack direction={'row'} spacing={7}>
          </Stack> */}
        </Flex>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Salvage Enterprises</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <Link href="/" onClick={onClose}>Home</Link>
              <Link href="/about" onClick={onClose}>About</Link>
              <Link href="/contact" onClick={onClose}>Contact</Link>
              <Link href="/login" onClick={onClose}>Login</Link>
              <LanguageSelector />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;

