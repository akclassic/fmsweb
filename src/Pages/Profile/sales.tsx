import { Box, Button, Flex, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, Text, Tfoot } from "@chakra-ui/react"
import useCompanyService from "../../Services/Concretes/CompanyService";
import { useEffect, useState } from "react";
import { SalesOrderinfo } from "../../Services/Models/PurchaseInfor";
import moment from "moment";
import { AttachmentIcon } from "@chakra-ui/icons";
import { handleDownload } from "../../Utils/func";
import CommonModal from "../../Components/Modal/Modal";

const Sales: React.FC = () => {
    const { getSalesOrders } = useCompanyService();
    const [salesOrders, setSalesOrders] = useState<SalesOrderinfo[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadSalesOrders();
    }, []);

    const loadSalesOrders = async () => {
        try {
            const result = await getSalesOrders(1);
            setSalesOrders(result);
        } catch (error) {
            //setError(error.message);
        } finally {
            // setLoading(false);
        }
    }

    const totalAmount = salesOrders.reduce((acc, purchase) => acc + purchase.totalAmount, 0);
    const totalOutstanding = salesOrders.reduce((acc, purchase) => acc + purchase.outstandingBalance, 0);
    const totalQuantity = salesOrders.reduce((acc, purchase) => acc + purchase.quantity, 0);
    
    return (
        <Box>
            <Flex justifyContent="flex-end" alignItems="center" mb={4}>
                <Button colorScheme="blue" onClick={onOpen}>Create Sale Order</Button>
            </Flex>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    {/* <TableCaption>Table data updated at {moment().date.toString()}</TableCaption> */}
                    <Thead>
                        <Tr>
                            <Th>Date Of Purchase</Th>
                            <Th>Material</Th>
                            <Th>Customer Name</Th>
                            <Th>Quantity</Th>
                            <Th>Purchase Amount</Th>
                            <Th>Outstanding Amount</Th>
                            <Th>Invoice</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {salesOrders.length ?
                            salesOrders.map(salesOrder => (
                                <Tr key={salesOrder.id}>
                                    <Td textAlign="left">
                                        {moment(salesOrder.dateOfPurchase).format('DD MMMM YYYY, h:mm A')}
                                    </Td>
                                    <Td textAlign="left">
                                        {salesOrder.productName}
                                    </Td>
                                    <Td textAlign="left">
                                        {salesOrder.customerName}
                                    </Td>
                                    <Td textAlign="left">
                                        {salesOrder.quantity}
                                    </Td>
                                    <Td textAlign="left">
                                        {salesOrder.totalAmount}
                                    </Td>
                                    <Td textAlign="left">
                                        {salesOrder.outstandingBalance}
                                    </Td>
                                    <Td textAlign="left">
                                        {salesOrder.invoiceUrl ?
                                            <IconButton
                                                icon={<AttachmentIcon />}
                                                onClick={() => handleDownload(salesOrder.invoiceUrl)}
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
            {/* <CommonModal
                isOpen={isOpen}
                onClose={onClose}
                title="Sales Details"
                onSave={(data: any) => handleSave(data)}
                isSubmitting={isSubmitting}
            >
                <PurchaseForm onSubmit={handleSave}></PurchaseForm>
            </CommonModal> */}
        </Box>
    )
}

export default Sales;