import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import useUserService from "../../Services/Concretes/UserService";
import { UserInfo } from "../../Services/Models/UserInfo";
import AddEditCustomer, { AddEditCustomerValues } from '../../Components/Forms/AddEditCustomer';
import { CustomerInfo } from '../../Services/Models/CustomerInfo';
import { DeleteIcon } from '@chakra-ui/icons';
import useToastMessage from '../../Contexts/UseToastMessage';
import { IoMdInformationCircle } from "react-icons/io";
import moment from 'moment';
import CommonModal from '../../Components/Modal/Modal';
import useCustomerService from '../../Services/Concretes/CustomerService';
import { CustomerPurchaseInfo } from '../../Services/Models/CustomerPurchaseInfo';
import CustomerDetails from '../../Components/CustomerDetails';

const Customers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<UserInfo[]>([]);
  const [isSaveCustomer, setIsSaveCustomer] = useState<boolean>(false);

  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
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

  const loadCustomerDetail = async (customerId: string | undefined) => {
    if (!customerId) {
      showToast("Cannot load customer detail", 'warning');
    }
    else {
      setSelectedCustomerId(customerId);
      onOpen();
      // const result = await getCustomerTransactionsInfo(customerId);
      // setCustomerTransactions(result);
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
          <Table variant='simple' colorScheme='teal'>
            {/* <TableCaption>Table data updated at {moment().date.toString()}</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Credit/Debit Balance</Th>
                <Th>Details</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer) => (
                <Tr key={customer.userId}>
                  <Td textAlign="left">
                    {customer.userId}
                  </Td>
                  <Td textAlign="left">
                    {customer.name}
                  </Td>
                  <Td textAlign="left">
                    <Box as='span' className={customer.creditDebitBalance >= 0 ? 'credit' : 'debit'}>{customer.creditDebitBalance}</Box>
                  </Td>
                  <Td>
                    <IconButton
                      size="md"
                      icon={<IoMdInformationCircle />}
                      aria-label="Information"
                      mr={2}
                      ml={2}
                      onClick={() => loadCustomerDetail(customer.customerId)}
                    />
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
      {selectedCustomerId && <CommonModal
        isOpen={isOpen}
        onClose={onClose}
        title="Customer Details"
      >
        <CustomerDetails customerId={selectedCustomerId}/>
      </CommonModal>}
      {!selectedCustomerId && <Modal
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
      </Modal>}
    </Box>
  );
};

export default Customers;
