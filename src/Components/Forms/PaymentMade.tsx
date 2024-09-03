import React, { useState, useEffect } from 'react';
import {
    Formik, Form, Field,
    FormikProps
} from 'formik';
import {
    Button, Input, FormControl, FormLabel, Select, Textarea, Box, Image
} from '@chakra-ui/react';
import { S3 } from 'aws-sdk';
import { PaymentMode, Products } from '../../Utils/enums';
import useUserService from '../../Services/Concretes/UserService';
import { UserInfo } from '../../Services/Models/UserInfo';

export interface PaymentsMadeFormValues {
    dateTime: string;
    partyName: string;
    paymentAmount: string;
    paymentMode: PaymentMode;
    description?: string;
    chequeNumber?: string;
    imageUrl?: string;
}

const PaymentsMadeForm: React.FC<FormikProps<PaymentsMadeFormValues>> = ({ values, setFieldValue, handleSubmit }) => {

    const [partyList, setPartyList] = useState<UserInfo[]>([]);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const { getAllSuppliers } = useUserService();

    useEffect(() => {
        // Fetch party names from the API
        const fetchPartyNames = async () => {
            const response: UserInfo[] = await getAllSuppliers(1); // Adjust API endpoint
            setPartyList(response);
        };

        fetchPartyNames();
    }, []);

    const handleAddNewParty = async (newParty: string) => {
        // API call to add a new party
        const response = await fetch('/api/add-party', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newParty }),
        });

        const data = await response.json();
        setPartyList([...partyList, data.name]);
    };

    const handleImageUpload = async (file: File) => {
        // AWS S3 upload logic
        console.log(process.env.REACT_APP_AWS_ACCESS_KEY)
        const s3 = new S3({
            accessKeyId: 'AKIA3LET5S64SKWU5HAU',//process.env.REACT_APP_AWS_ACCESS_KEY,
            secretAccessKey: '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',// process.env.REACT_APP_AWS_SECRET_KEY,
            region: 'Stokholm'
        });

        const params = {
            Bucket: 'fmsimgstore',
            Key: `images/${file.name}`,
            Body: file,
            ContentType: file.type,
        };

        const uploadResponse = await s3.upload(params).promise();
        setImageUrl(uploadResponse.Location);
    };

    const handleImageRemove = async () => {
        if (imageUrl) {
            // AWS S3 delete logic
            const s3 = new S3({
                accessKeyId: 'AKIA3LET5S64SKWU5HAU',//process.env.REACT_APP_AWS_ACCESS_KEY,
                secretAccessKey: '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',// process.env.REACT_APP_AWS_SECRET_KEY,
                region: 'Stokholm'
            });

            const params = {
                Bucket: 'fmsimgstore',
                Key: `images/${selectedImage?.name}`,
            };

            await s3.deleteObject(params).promise();
            setImageUrl('');
            setSelectedImage(null);
        }
    };

    return (
        // <Formik
        //     initialValues={initialValues}
        //     onSubmit={async (values) => {
        //         // Submit form data with image URL
        //         // const response = await fetch('/api/submit-payment', {
        //         //     method: 'POST',
        //         //     headers: {
        //         //         'Content-Type': 'application/json',
        //         //     },
        //         //     body: JSON.stringify({ ...values, imageUrl }),
        //         // });

        //         // const result = await response.json();
        //         console.log(values);
        //     }}
        // >
        //     {({ values, setFieldValue }) => (
        <Form id="paymentmadeform">
            <FormControl>
                <FormLabel>Date & Time</FormLabel>
                <Field name="dateTime">
                    {({ field }: { field: any }) => (
                        <Input {...field} type="datetime-local" />
                    )}
                </Field>
            </FormControl>
            <FormControl>
                <FormLabel>Party's Name</FormLabel>
                <Field name="partyName" as={Select}>
                    <option value="select">Select Party</option>
                    <option value="new">Add New Party</option>
                    {partyList.map((party, index) => (
                        <option key={index} value={party.supplierId}>
                            {party.name}
                        </option>
                    ))}
                </Field>
                {values.partyName === 'new' && (
                    <Input
                        mt={2}
                        placeholder="Enter new party name"
                        onBlur={(e) => handleAddNewParty(e.target.value)}
                    />
                )}
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Product </FormLabel>
                <Field name="product" as={Select}>
                    <option value="select">Select Product</option>
                    {Object.values(Products).map((product, index) => (
                        <option key={index} value={product}>
                            {product}
                        </option>
                    ))}
                </Field>
            </FormControl>

            {/* <FormControl mt={4}>
                <FormLabel>Quantity </FormLabel>
                <Field name="quantity" as={Select}>
                    <Input placeholder='Enter amount'></Input>
                </Field>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Payment Amount</FormLabel>
                <Field name="paymentAmount" as={Input} />
            </FormControl> */}

            <FormControl mt={4}>
                <FormLabel>Payment Mode</FormLabel>
                <Field name="paymentMode" as={Select}>
                    {Object.values(PaymentMode).map((mode, index) => (
                        <option key={index} value={mode}>
                            {mode}
                        </option>
                    ))}
                </Field>
            </FormControl>

            {values.paymentMode === PaymentMode.UPI && (
                <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Field name="description" as={Textarea} />
                </FormControl>
            )}

            {values.paymentMode === PaymentMode.Cheque && (
                <FormControl mt={4}>
                    <FormLabel>Cheque Number</FormLabel>
                    <Field name="chequeNumber" as={Input} />
                </FormControl>
            )}

            <FormControl mt={4}>
                <FormLabel>Add Image</FormLabel>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) {
                            setSelectedImage(file);
                            handleImageUpload(file);
                        }
                    }}
                />
                {imageUrl && (
                    <Box mt={2}>
                        <Image src={imageUrl} alt="Uploaded Image" maxH="200px" />
                        <Button mt={2} onClick={handleImageRemove}>
                            Remove Image
                        </Button>
                    </Box>
                )}
            </FormControl>

            {/* <Button mt={6} type="submit" colorScheme="teal">
                        Submit
                    </Button> */}
        </Form>
        //     )}
        // </Formik>
    )
}

export default PaymentsMadeForm;