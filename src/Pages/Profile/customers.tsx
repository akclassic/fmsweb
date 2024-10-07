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
import TrialBalance from './trialbalance';

const Customers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<UserInfo[]>([]);
  const [isSaveCustomer, setIsSaveCustomer] = useState<boolean>(false);
  // const [viewTrialBalance, setViewTrialBalance] = useState<boolean>(false);

  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const { getAllCustomers, saveCustomerDetail, removeCustomer } = useUserService();
  const { isOpen: isCustomerModalOpen, onOpen: onCustomerModalOpen, onClose: onCustomerModalClose } = useDisclosure();
  const { isOpen: isCustomerDetailModalOpen, onOpen: onCustomerDetailModalOpen, onClose: onCustomerDetailModalClose } = useDisclosure();
  const { isOpen: isTrialBalanceModalOpen, onOpen: onTrialBalanceModalOpen, onClose: onTrialBalanceModalClose } = useDisclosure();
  const showToast = useToastMessage();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const companyId = 1;
      const result = await getAllCustomers(companyId);
      setCustomers(result);
    } catch (error) {
      setLoading(false);
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
    onCustomerModalClose();
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
      onCustomerDetailModalOpen();
    }
  }

  const handleTrialBalance = () => {
      onTrialBalanceModalOpen();
  }

  return (
    <Box p={4}>
      <Flex justifyContent="flex-end" alignItems="center" mb={4}>
        <Button colorScheme="blue" onClick={handleTrialBalance} mr={4}>View Trial Balance</Button>
        <Button colorScheme="blue" onClick={onCustomerModalOpen}>Add Customer</Button>
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
      {
        isTrialBalanceModalOpen && <CommonModal
        isOpen={isTrialBalanceModalOpen}
        onClose={onTrialBalanceModalClose}
        title='Customers Trial Balance'
        >
          <TrialBalance trialBalanceType={0} ></TrialBalance>
        </CommonModal>
      }
      {selectedCustomerId && <CommonModal
        isOpen={isCustomerDetailModalOpen}
        onClose={onCustomerDetailModalClose}
        title="Customer Details"
      >
        <CustomerDetails customerId={selectedCustomerId}/>
      </CommonModal>}
      {!selectedCustomerId && <Modal
        isOpen={isCustomerModalOpen}
        onClose={onCustomerModalClose}

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
            <Button onClick={onCustomerModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>}
    </Box>
  );
};

export default Customers;
