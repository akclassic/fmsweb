import { Box, Heading, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AgedTrialBalanceDto } from "../../Services/Models/AgedTrialBalanceInfo";
import { getBaseAPIUrl } from "../../Utils/func";
import axios from "axios";
import useCustomerService from "../../Services/Concretes/CustomerService";
import useSupplierService from "../../Services/Concretes/SupplierService";

interface TrialBalanceProps {
    trialBalanceType: number;
}

const TrialBalance: React.FC<TrialBalanceProps> = ({ trialBalanceType }) => {

    const [trialBalanceData, setTrialBalanceData] = useState<AgedTrialBalanceDto[]>([]);
    const customerTrialBalance: number = 0;
    const supplierTrailBalance: number = 1;

    const { getTrailBalance } = useCustomerService();
    const { getSupplierTrailBalance } = useSupplierService();

    useEffect(() => {
        getTrialBalance();
    }, [])

    const getTrialBalance = async () => {
        const companyId: number = 1;
        let data: AgedTrialBalanceDto[] = [];

        if (trialBalanceType === customerTrialBalance) {
            data = await getTrailBalance(companyId);
        }

        if (trialBalanceType === supplierTrailBalance) {
            data = await getSupplierTrailBalance(companyId);
        }

        setTrialBalanceData(data);
    }

    return (
        <Box mt={8}>
            {/* <Heading size="md" mb={4}>Trial Balance</Heading> */}
            <Table variant='simple' colorScheme='teal'>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
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
                    {trialBalanceData.map((data, index) => (
                        <Tr key={index}>
                            <Td>{data.id}</Td>
                            <Td>{data.name}</Td>
                            <Td>{data.balance.toFixed(2)}</Td>
                            <Td>{data.current.toFixed(2)}</Td>
                            <Td>{data.oneMonth.toFixed(2)}</Td>
                            <Td>{data.twoMonths.toFixed(2)}</Td>
                            <Td>{data.threeMonths.toFixed(2)}</Td>
                            <Td>{data.phone}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>)
}

export default TrialBalance;