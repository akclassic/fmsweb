import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import TransactionCard from '../../Components/TransactionCard';
import './profile.css';
import Customers from './customers';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Box className="page-container" p={8}>
      <Heading as="h1" size="xl">Hi, Prashant Mishra</Heading>
      <Text fontSize="lg" my={4}>Total P & L: 50000</Text>
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>{t('customers')}</Tab>
          <Tab>Suppliers</Tab>
          <Tab>Payments</Tab>
          <Tab>Purchases</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Customers />
          </TabPanel>
          {/* <TabPanel>
            <Suppliers />
          </TabPanel>
          <TabPanel>
            <Payments />
          </TabPanel>
          <TabPanel>
            <Purchases />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
      {/* <Heading as="h2" size="lg" my={4}>Transactions</Heading>
      <TransactionCard customer="ABC" transactionAmount={4500} amountToBePaid={2000} amountPaid={2500} />
      <TransactionCard customer="ABC" transactionAmount={4500} amountToBePaid={2000} amountPaid={2500} />
      <TransactionCard customer="ABC" transactionAmount={4500} amountToBePaid={2000} amountPaid={2500} /> */}
    </Box>
  );
};

export default Profile;
