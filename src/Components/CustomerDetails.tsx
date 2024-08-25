import React, { useEffect, useState } from "react";
import { CustomerPurchaseInfo } from "../Services/Models/CustomerPurchaseInfo";
import useCustomerService from "../Services/Concretes/CustomerService";
import { Box, IconButton, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import moment from "moment";
import { AttachmentIcon } from "@chakra-ui/icons";
import { handleDownload } from "../Utils/func";

interface CustomerDetailProps {
    customerId: string;
}

const CustomerDetails = ({ customerId }: CustomerDetailProps) => {
    const [customerTransactions, setCustomerTransactions] = useState<CustomerPurchaseInfo[]>([]);
    const { getCustomerTransactionsInfo } = useCustomerService();

    useEffect(() => {
        loadCustomerDetail();
    }, []);

    const loadCustomerDetail = async () => {
        const result = await getCustomerTransactionsInfo(customerId);
        setCustomerTransactions(result);
    }

    return <Box>
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
                    {customerTransactions && customerTransactions.length > 0 ? (
                        customerTransactions.map((item) => (
                            <Tr key={item.sellOrderId}>
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
    </Box>
}

export default CustomerDetails;
