import React from 'react';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    RadioGroup,
    Radio,
    VStack,
    Button,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';

const Payment: React.FC = () => {
    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={useColorModeValue('white', 'white')}
        >
            <Box
                bg={useColorModeValue('white', 'gray.700')}
                p={8}
                maxW="md"
                borderRadius="lg"
                boxShadow="lg"
                w="full"
            >
                <VStack spacing={6} align="stretch">
                    <Heading as="h1" size="lg" textAlign="center" mb={4}>
                        Payments Made
                    </Heading>
                    <FormControl id="invoice-number" isRequired>
                        <FormLabel>Enter Invoice Number</FormLabel>
                        <Input type="text" placeholder="Enter Invoice Number" />
                    </FormControl>
                    <FormControl id="date" isRequired>
                        <FormLabel>Date & Time</FormLabel>
                        <Input type="datetime-local" placeholder="Date, month, year" />
                    </FormControl>
                    <FormControl id="party-name" isRequired>
                        <FormLabel>Party's Name</FormLabel>
                        <Select placeholder="Select option">
                            <option value="deepak-mould">Deepak Mould</option>
                            <option value="rahul-chem">Rahul Chemicals</option>
                            <option value="ashok-chem">Ashok Chemicals</option>
                            <option value="chemexcil">Chemexcil</option>
                            <option value="john-mould">John Approval Mould</option>
                            <option value="subhash-mould">Subhash Old Feem/Nishad Old Feem</option>
                            <option value="pushpdeep-steel">Pushpdeep Steel</option>
                            <option value="shivkumar-chem">Shivkumar Chemicals</option>
                            <option value="option9">Option 9</option>
                        </Select>
                    </FormControl>
                    <FormControl id="payment-mode" isRequired>
                        <FormLabel>Payment Mode</FormLabel>
                        <RadioGroup>
                            <Stack direction="column">
                                <Radio value="cash">Cash</Radio>
                                <Radio value="upi">UPI</Radio>
                                <Radio value="bank-transfer">Bank Transfer</Radio>
                                <Radio value="cheque">Cheque</Radio>
                                <Radio value="other">Other</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl id="payment-description">
                        <FormLabel>Enter Payment Description: Cheque Number/Other Details</FormLabel>
                        <Textarea placeholder="Description (optional)" />
                    </FormControl>
                    <FormControl id="payment-amount" isRequired>
                        <FormLabel>Payment Amount</FormLabel>
                        <Input type="number" placeholder="Payment Amount" />
                    </FormControl>
                    <FormControl id="image-upload">
                        <FormLabel>Upload Image</FormLabel>
                        <Input type="file" accept="image/*" />
                    </FormControl>
                    <Button colorScheme="teal" size="lg" mt={4}>
                        Submit
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default Payment;
