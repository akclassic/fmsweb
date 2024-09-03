import { useEffect, useState } from "react";
import { PurchaseOrderinfo } from "../../Services/Models/PurchaseInfor";
import useCompanyService from "../../Services/Concretes/CompanyService";
import { Box, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Flex, Tfoot, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { AttachmentIcon } from "@chakra-ui/icons";
import CommonModal from "../../Components/Modal/Modal";
import PurchaseForm from "../../Components/Forms/Purchase";
import { handleDownload } from "../../Utils/func";

const Purchases: React.FC = () => {

    const { getPurchaseOrders } = useCompanyService();
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderinfo[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleSave = async (data: any) => {
        setIsSubmitting(true);
        // Perform API call here
        console.log(data);
        // After saving data, close the modal
        onClose();
        setIsSubmitting(false);
        // Optionally, refresh the page or update the state to reflect changes
        window.location.reload();
    };

    return (
        <Box>
            <Flex justifyContent="flex-end" alignItems="center" mb={4}>
                <Button colorScheme="blue" onClick={onOpen}>Create Purchase Order</Button>
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
            {/* <CommonModal
                isOpen={isOpen}
                onClose={onClose}
                title="Purchase Details"
                onSave={(data: any) => handleSave(data)}
                isSubmitting={isSubmitting}
            >
                <PurchaseForm onSubmit={handleSave}></PurchaseForm>
            </CommonModal> */}
        </Box>
    )
}

export default Purchases;

