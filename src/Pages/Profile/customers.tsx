import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import useUserService from "../../Services/Concretes/UserService";
import { UserInfo } from "../../Services/Models/UserInfo";
import AddEditCustomer, { AddEditCustomerValues } from '../../Components/Forms/AddEditCustomer';
import { CustomerInfo } from '../../Services/Models/CustomerInfo';
import { DeleteIcon } from '@chakra-ui/icons';
import useToastMessage from '../../Contexts/UseToastMessage';
import moment from 'moment';
import CommonModal from '../../Components/Modal/Modal';

const Customers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<UserInfo[]>([]);
  const [isSaveCustomer, setIsSaveCustomer] = useState<boolean>(false);
  const { getAllCustomers, saveCustomerDetail, removeCustomer } = useUserService();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useToastMessage();

  useEffect(() => {
    setLoading(true);
    loadCustomers();
    setLoading(false);
  }, []);

  const loadCustomers = async () => {
    try {
      const companyId = 1;
      const result = await getAllCustomers(companyId);
      setCustomers(result);
    } catch (error) {
      //setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCustomer = async (values: AddEditCustomerValues) => {
    setIsSaveCustomer(true);
    const customerInfo: CustomerInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: `+91${values.phoneNumber}`
    }
    const companyId = 1;
    const result = await saveCustomerDetail(customerInfo, companyId);
    setIsSaveCustomer(false);
    if (result) {
      showToast("Customer Added", "success");
      setLoading(true);
      await loadCustomers();
      setLoading(false);
    }
    onClose();
  };

  const handleCustomerRemove = async (customerId: string) => {
    const result = await removeCustomer(customerId);
    if (result) {
      showToast("Customer Removed", "success");
      setLoading(true);
      await loadCustomers();
      setLoading(false);
    }
  }

  return (
    <Box p={4}>
      <Flex justifyContent="flex-end" alignItems="center" mb={4}>
        <Button colorScheme="blue" onClick={onOpen}>Add Customer</Button>
      </Flex>
      {loading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <TableContainer>
          <Table variant='striped' colorScheme='teal'>
            {/* <TableCaption>Table data updated at {moment().date.toString()}</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer) => (
                <Tr key={customer.userId}>
                  <Td key={customer.userId} textAlign="left">
                    {customer.name}
                  </Td>
                  <Td>
                    <DeleteIcon onClick={() => handleCustomerRemove(customer.customerId ? customer.customerId : "")} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {/* <CommonModal
        isOpen={isOpen}
        onClose={onClose}
        title="Add Customer Details"
        onSave={() => handleSave(data)}
        isSubmitting={isSubmitting}
      >
        <AddEditCustomer onSave={handleSaveCustomer} />
      </CommonModal> */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}

      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Customer Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEditCustomer onSave={handleSaveCustomer} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} isLoading={isSaveCustomer} form="add-edit-customer-form" type="submit">
              <Box as='span'>Save</Box>
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Customers;
