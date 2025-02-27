import { Box, Button, FormControl, FormLabel, Heading, Input, Image, RadioGroup, Select, Stack, VStack } from "@chakra-ui/react"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useState } from "react";
import { CartageStatus, PaymentMode, Products } from "../../Utils/enums";
import { UserInfo } from "../../Services/Models/UserInfo";
import { S3 } from "aws-sdk";

export interface PurchaseFormValues {
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

const PurchaseForm: React.FC<FormikProps<PurchaseFormValues>> = ({ values, setFieldValue, handleSubmit }) => {

    const [isMaterialPurchase, setIsMaterialPurchase] = useState<boolean>(true);
    const [partyList, setPartyList] = useState<UserInfo[]>([]);
    const [productList, setProductList] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const onServiceSelection = (value: string) => {
        if (value === 'true') {
            setIsMaterialPurchase(true);
        } else {
            setIsMaterialPurchase(false);
        }
    }

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

    return (
        <Form id="purchaseform">
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
        </Form>
    )
}

export default PurchaseForm;