import { useEffect, useState } from "react";
import { UserInfo } from "../../Services/Models/UserInfo";
import useUserService from "../../Services/Concretes/UserService";
import { Box, Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon } from "@chakra-ui/icons";
import useToastMessage from "../../Contexts/UseToastMessage";
import SupplierDetails from "../../Components/SupplierDetails";

const Suppliers: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [suppliers, setSuppliers] = useState<UserInfo[]>([]);
    const [isSaveSupplier, setIsSaveSupplier] = useState<boolean>(false);
    const { getAllSuppliers, removeSupplier } = useUserService();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showToast = useToastMessage();
    const [selectedSupplierId, setSelectedSupplierId] = useState<string>("");

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
                            </Tr>
                        </Thead>
                        <Tbody>
                            {suppliers.map((supplier) => (
                                <Tr key={supplier.userId}>
                                    <Td key={supplier.userId} textAlign="left">
                                        <Box as='span' className="suppname" onClick={() => handleSupplierClick(supplier.supplierId ? supplier.supplierId : "")}>{supplier.name}</Box>
                                    </Td>
                                    <Td key={supplier.userId} textAlign="left">
                                        <Box as='span' className={supplier.creditDebitBalance > 0 ? 'debit' : 'credit'}>{supplier.creditDebitBalance}</Box>
                                    </Td>
                                    <Td>
                                        <DeleteIcon onClick={() => handleSupplierRemove(supplier.supplierId ? supplier.supplierId : "")} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
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