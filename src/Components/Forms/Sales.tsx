import React, { useState, useEffect } from 'react';
import {
    Formik, Form, Field,
    FormikProps
} from 'formik';
import {
    Button, Input, FormControl, FormLabel, Select, Textarea, Box, Image
} from '@chakra-ui/react';
import { S3 } from 'aws-sdk';
import { CartageStatus, PaymentMode, Products } from '../../Utils/enums';
import useUserService from '../../Services/Concretes/UserService';
import { UserInfo } from '../../Services/Models/UserInfo';

export interface SalesFormValues {
    dateTime: string;
    partyName: string;
    paymentAmount: string;
    paymentMode: PaymentMode;
    description?: string;
    chequeNumber?: string;
    imageUrl?: string;
    material?: string;
    quantity?: number;
    unit?: number;
    ratePerUnit?: number;
    cartageStatus?: CartageStatus;
    vehicleNumber?: string;
}

const SalesForm: React.FC<FormikProps<SalesFormValues>> = ({ values, setFieldValue, handleSubmit }) => {

    const [partyList, setPartyList] = useState<UserInfo[]>([]);
    const [productList, setProductList] = useState<string[]>([]);
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

    const handleAddNewProduct = async (newProduct: string) => {
        // API call to add a new party
        const response = await fetch('/api/add-party', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newProduct }),
        });

        const data = await response.json();
        setProductList([...productList, data.name]);
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
        <Form id="salesform">
            <FormControl>
                <FormLabel>Date & Time</FormLabel>
                <Field name="dateTime">
                    {({ field }: { field: any }) => (
                        <Input {...field} type="datetime-local" />
                    )}
                </Field>
            </FormControl>
            {/* fetch products from api */}
            <FormControl>
                <FormLabel>Material</FormLabel>
                <Field name="material" as={Select}>
                    <option value="select">Select Material</option>
                    <option value="newmaterial">Add New Material</option>
                    {Object.values(Products).map((mode, index) => (
                        <option key={index} value={mode}>
                            {mode}
                        </option>
                    ))}
                </Field>
                {values.material === 'newmaterial' && (
                    <Input
                        mt={2}
                        placeholder="Enter new material"
                        onBlur={(e) => handleAddNewProduct(e.target.value)}
                    />
                )}
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Quantity </FormLabel>
                <Field name="quantity" as={Input} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Unit</FormLabel>
                <Field name="unit" as={Input} />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Rate Per Unit</FormLabel>
                <Field name="rateperunit" as={Input} />
            </FormControl>
            <FormControl>
                <FormLabel>Party's Name</FormLabel>
                <Field name="partyName" as={Select}>
                    <option value="select">Select Party</option>
                    <option value="newparty">Add New Party</option>
                    {partyList.map((party, index) => (
                        <option key={index} value={party.supplierId}>
                            {party.name}
                        </option>
                    ))}
                </Field>
                {values.partyName === 'newparty' && (
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

            <FormControl mt={4}>
                <FormLabel>Cartage Status</FormLabel>
                <Field name="cartage" as={Select}>
                    <option value="select">Select Status</option>
                    {Object.values(CartageStatus).map((status, index) => (
                        <option key={index} value={status}>
                            {status}
                        </option>
                    ))}
                </Field>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Vehicle Number</FormLabel>
                <Field name="vehiclenumber" as={Input} />
            </FormControl>

            {/* <FormControl mt={4}>
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
            )} */}

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

export default SalesForm;