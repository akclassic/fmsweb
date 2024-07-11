import React, { useEffect, useState } from 'react';
import { Box, Center, List, ListItem, Spinner } from '@chakra-ui/react';
import useUserService from "../../Services/Concretes/UserService";
import { UserInfo } from "../../Services/Models/UserInfo";

const Customers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<UserInfo[]>([]);
  const { getAllCustomers } = useUserService();

  useEffect(() => {
    setLoading(true);
    const loadCustomers = async () => {
      try {
        const result = await getAllCustomers();
        setCustomers(result);
        setLoading(false);
      } catch (error) {
        //setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  return (
    <Box p={4}>
      {loading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <List spacing={3} styleType='disc' pl={4}>
          {customers.map((customer) => (
            <ListItem key={customer.userId} textAlign="left">
              {customer.name}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Customers;
