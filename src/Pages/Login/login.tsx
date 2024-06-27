// src/pages/Login.tsx
import React from 'react';
import { Box, Heading, Input, Button, VStack, FormControl, FormLabel, useColorModeValue } from '@chakra-ui/react';

const Login: React.FC = () => {
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      bg={useColorModeValue('white', 'white')}
    >
      <Box 
        bg={formBackground} 
        p={8} 
        maxW="md" 
        borderRadius="lg" 
        boxShadow="lg"
        w="full"
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="lg" textAlign="center">
            Login
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email or Phone number</FormLabel>
            <Input type="email" placeholder="Email or Phone number" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Password" />
          </FormControl>
          <Button colorScheme="teal" size="lg">
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
