import { useEffect, useState } from "react";
import { UserInfo } from "../../Services/Models/UserInfo";
import useUserService from "../../Services/Concretes/UserService";
import { Box, Button, Center, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon } from "@chakra-ui/icons";
import useToastMessage from "../../Contexts/UseToastMessage";
import SupplierDetails from "../../Components/SupplierDetails";
import { LuFileSpreadsheet } from "react-icons/lu";
import axios from "axios";
import { getBaseAPIUrl } from "../../Utils/func";
import { AgedTrialBalanceDto } from "../../Services/Models/AgedTrialBalanceInfo";

const Suppliers: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [suppliers, setSuppliers] = useState<UserInfo[]>([]);
    const [isSaveSupplier, setIsSaveSupplier] = useState<boolean>(false);
    const { getAllSuppliers, removeSupplier } = useUserService();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showToast = useToastMessage();
    const [selectedSupplierId, setSelectedSupplierId] = useState<string>("");
    const [trialBalance, setTrialBalance] = useState<AgedTrialBalanceDto | null>(null);

    useEffect(() => {
        setLoading(true);
        loadSuppliers();
        setLoading(false);
    }, []);

    const loadSuppliers = async () => {
        try {
            let companyId: number = 1;
            const result = await getAllSuppliers(companyId);
            setSuppliers(result);
        } catch (error) {
            //setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSupplierRemove = async (supplierId: string) => {
        const result = await removeSupplier(supplierId);
        if (result) {
            showToast("Supplier Removed", "success");
            setLoading(true);
            await loadSuppliers();
            setLoading(false);
        }
    }

    const handleSupplierClick = (id: string) => {
        console.log('supplierid', id);
        setSelectedSupplierId(id);
        onOpen();
    };

    const onSupplierDetailClose = () => {
        setSelectedSupplierId("");
        onClose();
    }

    const showTrialBalance = async (supplierId: string) => {
        setLoading(true);
        try {
            const hostUrl: string = getBaseAPIUrl();
            const baseUrl: string = hostUrl + "/Supplier";
            const response = await axios.get(`${baseUrl}/trialbalance/${supplierId}`);
            console.log(response);
            setTrialBalance(response.data);
            // setError(null);
        } catch (err) {
            console.log('Error fetching trial balance.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box p={4}>
            <Flex justifyContent="flex-end" alignItems="center" mb={4}>
                <Button colorScheme="blue" onClick={onOpen}>Add Supplier</Button>
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
                                <Th>Name</Th>
                                <Th>Credit/Debit Balance</Th>
                                <Th>Action</Th>
                                <Th>Trial Balance</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {suppliers.map((supplier) => (
                                <Tr key={supplier.userId}>
                                    <Td textAlign="left">
                                        <Box as='span' className="suppname" onClick={() => handleSupplierClick(supplier.supplierId ? supplier.supplierId : "")}>{supplier.name}</Box>
                                    </Td>
                                    <Td textAlign="left">
                                        <Box as='span' className={supplier.creditDebitBalance > 0 ? 'debit' : 'credit'}>{supplier.creditDebitBalance}</Box>
                                    </Td>
                                    <Td>
                                        <DeleteIcon onClick={() => handleSupplierRemove(supplier.supplierId ? supplier.supplierId : "")} />
                                    </Td>
                                    <Td>
                                        <IconButton
                                            icon={<LuFileSpreadsheet />}
                                            onClick={() => showTrialBalance(supplier.supplierId ?? "")}
                                            aria-label="Download Invoice"
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    {trialBalance && trialBalance.Balance && (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Account</Th>
                                    <Th>Name</Th>
                                    <Th>Balance</Th>
                                    <Th>Current</Th>
                                    <Th>1 Month</Th>
                                    <Th>2 Months</Th>
                                    <Th>3 Months</Th>
                                    <Th>Phone</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>{trialBalance.Account}</Td>
                                    <Td>{trialBalance.Name}</Td>
                                    <Td>{trialBalance.Balance}</Td>
                                    <Td>{trialBalance.Current}</Td>
                                    <Td>{trialBalance.OneMonth}</Td>
                                    <Td>{trialBalance.TwoMonths}</Td>
                                    <Td>{trialBalance.ThreeMonths}</Td>
                                    <Td>{trialBalance.Phone}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    )}
                </TableContainer>
            )}
            <Modal
                isOpen={isOpen}
                onClose={onClose}

            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Supplier Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* <AddEditCustomer onSave={handleSaveCustomer} /> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} isLoading={isSaveSupplier} form="add-edit-customer-form" type="submit">
                            <Box as='span'>Save</Box>
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {selectedSupplierId && <SupplierDetails isOpen={isOpen} onClose={onSupplierDetailClose} supplierId={selectedSupplierId} />}
        </Box>
    )
}

export default Suppliers; 