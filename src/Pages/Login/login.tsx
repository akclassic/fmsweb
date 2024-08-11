// src/pages/Login.tsx
import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, VStack, FormControl, FormLabel, useColorModeValue, Select } from '@chakra-ui/react';
import useCompanyService from '../../Services/Concretes/CompanyService';
import { CompanyInfo } from '../../Services/Models/CompanyInfo';

const Login: React.FC = () => {
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const { getCompanyList } = useCompanyService();

  const [companies, setCompanies] = useState<CompanyInfo[]>();

  useEffect(() => {
    try {
      const loadComapnies = async () => {
        const result = await getCompanyList();
        setCompanies(result);
      }

      loadComapnies();
    } catch (error) {
      //setError(error.message);
    } finally {
    }
  });

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
          <FormControl id="company" isRequired>
            <FormLabel>Company</FormLabel>
            <Select placeholder='Select Company'>
              {
                companies && companies.length ? 
                companies.map((comapny) => <option id={comapny.id.toString()}>{comapny.name}</option>)
                :
                null
              }
            </Select>
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
