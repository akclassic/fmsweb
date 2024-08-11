// import React, { useState, useEffect } from 'react';
// import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Box, Card, CardHeader, CardBody, CardFooter, Heading, Table, Thead, Tr, Th, Tbody, Td, IconButton } from '@chakra-ui/react';
// import axios from 'axios';
// import { SupplierDetail } from '../Services/Models/SupplierDetailInfo';
// import useSupplierService from '../Services/Concretes/SupplierService';
// import { SupplierPurchaseInfo } from '../Services/Models/SupplierPurchaseInfo';
// import { AttachmentIcon } from '@chakra-ui/icons';

// interface SupplierDetailsProps {
//     isOpen: boolean;
//     onClose: () => void;
//     supplierId: string;
// }

// const SupplierDetails = ({ isOpen, onClose, supplierId }: SupplierDetailsProps) => {
//     const [supplierDetail, setSupplierDetail] = useState<SupplierDetail>();
//     const [supplierTransactions, setSupplierTransactions] = useState<SupplierPurchaseInfo[]>();
//     const [loading, setLoading] = useState(true);
//     const { getSupplierInfo, getSupplierTransactionsInfo } = useSupplierService();

//     useEffect(() => {
//         if (supplierId) {
//             setLoading(true);
//             const loadSupplierInfo = async () => {
//                 try {
//                     const result = await getSupplierInfo(supplierId);
//                     setSupplierDetail(result);
//                 } catch (error) {
//                     console.error("There was an error fetching the supplier details!", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             }

//             const loadSupplierTransactions = async () => {
//                 try {
//                     const result = await getSupplierTransactionsInfo(supplierId);
//                     setSupplierTransactions(result);
//                 } catch (error) {
//                     console.error("There was an error fetching the supplier details!", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             }

//             loadSupplierInfo();
//             loadSupplierTransactions();
//         }
//     }, []);

//     const handleDownload = async (url: string) => {
//         try {
//             const response = await fetch(url);
//             const blob = await response.blob();
//             const link = document.createElement('a');
//             link.href = window.URL.createObjectURL(blob);
//             link.setAttribute('download', 'invoice.jpg'); // You can dynamically generate this name if needed
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         } catch (error) {
//             console.error('Error downloading the file', error);
//         }
//     };

//     return (
//         <Modal isOpen={isOpen} onClose={onClose}>
//             <ModalOverlay />
//             <ModalContent>
//                 <ModalHeader>Supplier Details</ModalHeader>
//                 <ModalCloseButton />
//                 <ModalBody>
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : (
//                         <div>
//                             {
//                                 supplierDetail ?
//                                     <Card>
//                                         <CardHeader>
//                                             <Heading size='md'> Name: {supplierDetail.name}</Heading>
//                                         </CardHeader>
//                                         <CardBody>
//                                             {/* <Text>Balance: {supplierDetail.balance}</Text> */}
//                                             <Text>Materials: {supplierDetail.supplierProducts ? supplierDetail.supplierProducts : "No Materials"}</Text>
//                                         </CardBody>
//                                         <CardFooter>
//                                             <Table variant="simple">
//                                                 <Thead>
//                                                     <Tr>
//                                                         {/* <Th>Purchase Order ID</Th> */}
//                                                         <Th>Purchase Date</Th>
//                                                         <Th>Total Amount</Th>
//                                                         <Th>Outstanding Balance</Th>
//                                                         <Th>Product Name</Th>
//                                                         {/* <Th>Product ID</Th> */}
//                                                         <Th>Quantity</Th>
//                                                         <Th>Payment Mode</Th>
//                                                         <Th>Description</Th>
//                                                         <Th>Invoice URL</Th>
//                                                     </Tr>
//                                                 </Thead>
//                                                 <Tbody>
//                                                     {supplierTransactions ? supplierTransactions.map((item) => (
//                                                         <Tr key={item.purchaseOrderId}>
//                                                             {/* <Td>{item.purchaseOrderId}</Td> */}
//                                                             <Td>{new Date(item.createdTime).toLocaleDateString()}</Td>
//                                                             <Td>{item.totalAmount}</Td>
//                                                             <Td>{item.outstandingBalance}</Td>
//                                                             {/* <Td>{item.productId}</Td> */}
//                                                             <Td>{item.productName}</Td>
//                                                             <Td>{item.quantity}</Td>
//                                                             <Td>{item.paymentModeName}</Td>
//                                                             <Td>{item.transactionDescription}</Td>
//                                                             <Td>
//                                                                 {item.invoiceUrl ?
//                                                                     <IconButton
//                                                                         icon={<AttachmentIcon />}
//                                                                         onClick={() => handleDownload(item.invoiceUrl)}
//                                                                         aria-label="Download Invoice"
//                                                                     />
//                                                                     :
//                                                                     <Text>No Invoice</Text>
//                                                                 }
//                                                             </Td>
//                                                         </Tr>
//                                                     )) : <Tr>
//                                                         <Td>No Transactions</Td>
//                                                     </Tr>}
//                                                 </Tbody>
//                                             </Table>
//                                         </CardFooter>
//                                     </Card>
//                                     : <p>No data found!</p>
//                             }
//                         </div>
//                     )}
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button colorScheme="blue" mr={3} onClick={onClose}>
//                         Close
//                     </Button>
//                 </ModalFooter>
//             </ModalContent>
//         </Modal>
//     );
// };

// export default SupplierDetails;

import React, { useState, useEffect } from 'react';
import {
    Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Box, Card, CardHeader, CardBody, Table, Thead,
    Tr, Th, Tbody, Td, IconButton, Spinner,
    Heading
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import useSupplierService from '../Services/Concretes/SupplierService';
import { SupplierDetail } from '../Services/Models/SupplierDetailInfo';
import { SupplierPurchaseInfo } from '../Services/Models/SupplierPurchaseInfo';
import moment from 'moment';

interface SupplierDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    supplierId: string;
}

const SupplierDetails = ({ isOpen, onClose, supplierId }: SupplierDetailsProps) => {
    const [supplierDetail, setSupplierDetail] = useState<SupplierDetail>();
    const [supplierTransactions, setSupplierTransactions] = useState<SupplierPurchaseInfo[]>();
    const [loading, setLoading] = useState(true);
    const { getSupplierInfo, getSupplierTransactionsInfo } = useSupplierService();

    useEffect(() => {
        if (supplierId) {
            setLoading(true);
            const loadSupplierInfo = async () => {
                try {
                    const result = await getSupplierInfo(supplierId);
                    setSupplierDetail(result);
                } catch (error) {
                    console.error("There was an error fetching the supplier details!", error);
                } finally {
                    setLoading(false);
                }
            };

            const loadSupplierTransactions = async () => {
                try {
                    const result = await getSupplierTransactionsInfo(supplierId);
                    setSupplierTransactions(result);
                } catch (error) {
                    console.error("There was an error fetching the supplier transactions!", error);
                } finally {
                    setLoading(false);
                }
            };

            loadSupplierInfo();
            loadSupplierTransactions();
        }
    }, [supplierId, getSupplierInfo, getSupplierTransactionsInfo]);

    const handleDownload = async (url: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'invoice.jpg'); // You can dynamically generate this name if needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> <Text size='md'>Supplier: {supplierDetail ? supplierDetail.name : ""}</Text></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Spinner />
                            <Text ml={2}>Loading...</Text>
                        </Box>
                    ) : (
                        supplierDetail ? (
                            <Card>
                                {/* <CardHeader>
                                    <Heading size='md'>Name: {supplierDetail.name}</Heading>
                                </CardHeader> */}
                                <CardBody>
                                    <Text mb={4}>Materials: {supplierDetail.supplierProducts ? supplierDetail.supplierProducts : "No Materials"}</Text>
                                    <Box overflowX="auto"> {/* Ensure the table is contained */}
                                        <Table variant="simple">
                                            <Thead>
                                                <Tr>
                                                    <Th>Purchase Date</Th>
                                                    <Th>Total Amount</Th>
                                                    <Th>Outstanding Balance</Th>
                                                    <Th>Product Name</Th>
                                                    <Th>Quantity</Th>
                                                    <Th>Payment Mode</Th>
                                                    <Th>Description</Th>
                                                    <Th>Invoice</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {supplierTransactions && supplierTransactions.length > 0 ? (
                                                    supplierTransactions.map((item) => (
                                                        <Tr key={item.purchaseOrderId}>
                                                            <Td>{moment(item.createdTime).format('DD MMMM YYYY, h:mm A')}</Td>
                                                            <Td>{item.totalAmount}</Td>
                                                            <Td>{item.outstandingBalance}</Td>
                                                            <Td>{item.productName}</Td>
                                                            <Td>{item.quantity}</Td>
                                                            <Td>{item.paymentModeName}</Td>
                                                            <Td>{item.transactionDescription}</Td>
                                                            <Td>
                                                                {item.invoiceUrl ? (
                                                                    <IconButton
                                                                        icon={<AttachmentIcon />}
                                                                        onClick={() => handleDownload(item.invoiceUrl)}
                                                                        aria-label="Download Invoice"
                                                                    />
                                                                ) : (
                                                                    <Text>No Invoice</Text>
                                                                )}
                                                            </Td>
                                                        </Tr>
                                                    ))
                                                ) : (
                                                    <Tr>
                                                        <Td colSpan={8} textAlign="center">No Transactions Found</Td>
                                                    </Tr>
                                                )}
                                            </Tbody>
                                        </Table>
                                    </Box>
                                </CardBody>
                            </Card>
                        ) : (
                            <Text>No data found!</Text>
                        )
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SupplierDetails;

