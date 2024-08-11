import { useEffect, useState } from "react";
import { PurchaseOrderinfo } from "../../Services/Models/PurchaseInfor";
import useCompanyService from "../../Services/Concretes/CompanyService";
import { Box, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Flex, Tfoot, Text, IconButton } from "@chakra-ui/react";
import moment from "moment";
import { AttachmentIcon } from "@chakra-ui/icons";

const Purchases: React.FC = () => {

    const { getPurchaseOrders } = useCompanyService();
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderinfo[]>([]);

    useEffect(() => {
        const loadPurchaseOrders = async () => {
            try {
                const result = await getPurchaseOrders(1);
                setPurchaseOrders(result);
            } catch (error) {
                //setError(error.message);
            } finally {
                // setLoading(false);
            }
        }

        loadPurchaseOrders();
    }, []);

    const totalAmount = purchaseOrders.reduce((acc, purchase) => acc + purchase.totalAmount, 0);
    const totalOutstanding = purchaseOrders.reduce((acc, purchase) => acc + purchase.outstandingBalance, 0);
    const totalQuantity = purchaseOrders.reduce((acc, purchase) => acc + purchase.quantity, 0);

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
        <Box>
            <Flex justifyContent="flex-end" alignItems="center" mb={4}>
                <Button colorScheme="blue">Create Purchase Order</Button>
            </Flex>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    {/* <TableCaption>Table data updated at {moment().date.toString()}</TableCaption> */}
                    <Thead>
                        <Tr>
                            <Th>Date Of Purchase</Th>
                            <Th>Material</Th>
                            <Th>Supplier Name</Th>
                            <Th>Quantity</Th>
                            <Th>Purchase Amount</Th>
                            <Th>Outstanding Amount</Th>
                            <Th>Invoice</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {purchaseOrders.length ?
                            purchaseOrders.map(purchaseOrder => (
                                <Tr key={purchaseOrder.id}>
                                    <Td textAlign="left">
                                        {moment(purchaseOrder.dateOfPurchase).format('DD MMMM YYYY, h:mm A')}
                                    </Td>
                                    <Td textAlign="left">
                                        {purchaseOrder.productName}
                                    </Td>
                                    <Td textAlign="left">
                                        {purchaseOrder.supplierName}
                                    </Td>
                                    <Td textAlign="left">
                                        {purchaseOrder.quantity}
                                    </Td>
                                    <Td textAlign="left">
                                        {purchaseOrder.totalAmount}
                                    </Td>
                                    <Td textAlign="left">
                                        {purchaseOrder.outstandingBalance}
                                    </Td>
                                    <Td textAlign="left">
                                        {purchaseOrder.invoiceUrl ?
                                            <IconButton
                                                icon={<AttachmentIcon />}
                                                onClick={() => handleDownload(purchaseOrder.invoiceUrl)}
                                                aria-label="Download Invoice"
                                            />
                                            :
                                            <Text>No Invoice</Text>
                                        }
                                    </Td>
                                </Tr>
                            )) :
                            <Tr>
                                <Td colSpan={6} textAlign='center'>No Purchases Orders</Td>
                            </Tr>
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td colSpan={3}><Text fontWeight="bold">Total</Text></Td>
                            <Td><Text fontWeight="bold">{totalQuantity}</Text></Td>
                            <Td><Text fontWeight="bold">{totalAmount}</Text></Td>
                            <Td><Text fontWeight="bold">{totalOutstanding}</Text></Td>
                            <Td></Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Purchases;

