import { Box, FormControl, FormLabel, Heading, Input, Radio, RadioGroup, Select, Stack, VStack } from "@chakra-ui/react"
import { Formik, FormikHelpers } from "formik";
import { useState } from "react";

interface PurchaseFormProps {
    onSubmit: (data: any) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onSubmit }) =>{

    const [isMaterialPurchase, setIsMaterialPurchase] = useState<boolean>(true);

    const onServiceSelection = (value: string) => {
        if (value === 'true'){
            setIsMaterialPurchase(true);
        } else {
            setIsMaterialPurchase(false);
        }
    }

    const getMaterialPurchaseSection = () => {
        return (
            <>
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
                <FormControl id="material-name" isRequired>
                    <FormLabel>Raw Material</FormLabel>
                    <Select placeholder="Select option">
                        <option value="smld">Shredded Mould (S.MLD)</option>
                        <option value="sof">Shredded Old Foam(S.O.F)</option>
                    </Select>
                </FormControl>
            </>
        )
    }

    const getTransportServiceSection = () => {
        return (
            <>
                <FormControl id="transport">
                    <FormLabel>Description</FormLabel>
                    <Input type="text" placeholder="Enter Description" />
                </FormControl>
                <FormControl id="kmdrives">
                    <FormLabel>Number Of KM Driven</FormLabel>
                    <Input type="number" placeholder="Enter KM Driven" />
                </FormControl>
                <FormControl id="price per KM">
                    <FormLabel>Price per KM</FormLabel>
                    <Input type="number" placeholder="Enter Price per KM" />
                </FormControl>
            </>
        )
    }

    const handleSubmit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
        setSubmitting(true);
        // await new Promise((r) => setTimeout(r, 500));
        // alert(JSON.stringify(values, null, 2));
        onSubmit(values);
        setSubmitting(false);
        // navigate('/profile'); // Redirect after form submission
    };

    return (
        <Box>
            <Formik
                initialValues={{ name: '' }}
                onSubmit={handleSubmit}
            >
                <VStack spacing={6} align="stretch">
                    {/* <Heading as="h1" size="lg" textAlign="center" mb={4}>
                        Purchase Details
                    </Heading> */}
                    <FormControl id="date" isRequired>
                        <FormLabel>Date & Time</FormLabel>
                        <Input type="datetime-local" placeholder="Date, month, year" />
                    </FormControl>
                    <FormControl id="materialdetail">
                        <FormLabel>Material Details</FormLabel>
                        <Input type="text" placeholder="Enter Description" />
                    </FormControl>
                    <FormControl id="materialdetail">
                        <FormLabel>Procured Material/Service</FormLabel>
                        <RadioGroup onChange={onServiceSelection} value={isMaterialPurchase.toString()}>
                            <Stack direction='row'>
                                <Radio value='true'>Raw Materials</Radio>
                                <Radio value='false'>Transportation</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    {
                        isMaterialPurchase ? 
                        getMaterialPurchaseSection() :  
                        getTransportServiceSection()
                    }
                </VStack>
            </Formik>
        </Box>
    )
}

export default PurchaseForm;