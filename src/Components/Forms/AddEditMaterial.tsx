import React, { useEffect, useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import useProductService from '../../Services/Concretes/ProductService';
import { ProductUnitInfo } from '../../Services/Models/CompanyProductInfo';

interface AddEditMaterialValues {
    name: string;
    unit: string;
}

interface AddEditMaterialFormProps {
    onSubmit: (data: any) => void;
}

const AddEditMaterial: React.FC<AddEditMaterialFormProps> = ({ onSubmit }) => {
    const { getProductUnits } = useProductService();
    const [units, setUnits] = useState<ProductUnitInfo[]>([]);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

    useEffect(() => {
        loadProductUnits();
    }, []);

    const loadProductUnits = async () => {
        try {
            setLoadingProducts(true);
            let companyId: number = 1;
            const result = await getProductUnits(companyId);
            setUnits(result);
        } catch (error) {
            //setError(error.message);
        } finally {
            setLoadingProducts(false);
        }
    }

    const initialValues: AddEditMaterialValues = {
        name: '',
        unit: ''
    };

    const handleSubmit = async (values: AddEditMaterialValues, { setSubmitting }: FormikHelpers<AddEditMaterialValues>) => {
        setSubmitting(true);
        // await new Promise((r) => setTimeout(r, 500));
        // alert(JSON.stringify(values, null, 2));
        onSubmit(values);

        setSubmitting(false);
        // navigate('/profile'); // Redirect after form submission
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {
                (props) => (
                    <Form id="add-edit-material-form">
                        <Field name='name'>
                            {({ field }: FieldProps) => (
                                <FormControl isRequired>
                                    <FormLabel>Material Name</FormLabel>
                                    <Input {...field} type="text" placeholder="Enter Material Name" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='unit'>
                            {({ field }: FieldProps) => (
                                <FormControl id="product-unit" isRequired>
                                    <FormLabel>Product Unit</FormLabel>
                                    <Select {...field} placeholder="Select option">
                                        {
                                            units.map((unit) => <option value={unit.id.toString()} key={unit.id}>{unit.name}</option>)
                                        }
                                    </Select>
                                </FormControl>
                            )}
                        </Field>
                    </Form>
                )
            }
        </Formik>
    );
};

export default AddEditMaterial;
