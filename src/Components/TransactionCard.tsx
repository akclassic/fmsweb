import { Box, Flex, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import './accordin.css';
import { useTranslation } from 'react-i18next';

interface TransactionCardProps {
  customer: string;
  transactionAmount: number;
  amountToBePaid: number;
  amountPaid: number;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ customer, transactionAmount, amountToBePaid, amountPaid }) => {
  
    const { t } = useTranslation();

    return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Flex justifyContent="space-between">
              <Text>Party/Customer: {customer}</Text>
              <Text>Total transaction amount: {transactionAmount}</Text>
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} className="accordion-panel">
          <Text>{t('amountToBePaid')}: {amountToBePaid}</Text>
          <Text>{t('amountPaid')}: {amountPaid}</Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default TransactionCard;
