import { useState } from 'react';
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
// import TransactionCard from '../../Components/TransactionCard';
import Customers from './customers';
import Payments from './purchases';
import './profile.css';
import Suppliers from './suppliers';
import Materials from './materials';
import Sales from './sales';
import FormsPage from './FormsPage';
import TrialBalance from './trialbalance';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabsChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Box className="page-container" p={8}>
      <Heading as="h1" size="xl">Hi, Prashant Mishra</Heading>
      <Text fontSize="lg" my={4}>Total P & L: 50000</Text>
      <Tabs size="md" variant="enclosed" onChange={handleTabsChange}>
        <TabList>
          <Tab>{t('customers')}</Tab>
          <Tab>Suppliers</Tab>
          <Tab>Purchases</Tab>
          <Tab>Sales</Tab>
          <Tab>Materials</Tab>
          <Tab>Forms</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {activeTab === 0 && <Customers />}
          </TabPanel>
          <TabPanel>
            {activeTab === 1 && <Suppliers />}
          </TabPanel>
          <TabPanel>
            {activeTab === 2 && <Payments />}
          </TabPanel>
          <TabPanel>
            {activeTab === 3 && <Sales />}
          </TabPanel>
          <TabPanel>
            {activeTab === 4 && <Materials />}
          </TabPanel>
          <TabPanel>
            {activeTab === 5 && <FormsPage />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Profile;
