import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Form, Field, FieldProps, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";

export interface AddEditCustomerValues {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface AddEditCustomerProps {
    onSave: (values: AddEditCustomerValues) => void;
}

const AddEditCustomer: React.FC<AddEditCustomerProps> = ({ onSave }) => {
    const navigate = useNavigate();

    const initialValues: AddEditCustomerValues = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
    };

    const handleSubmit = async (values: AddEditCustomerValues, { setSubmitting }: FormikHelpers<AddEditCustomerValues>) => {
        setSubmitting(true);
        // await new Promise((r) => setTimeout(r, 500));
        // alert(JSON.stringify(values, null, 2));
        onSave(values);
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
                    <Form id="add-edit-customer-form">
                        <Field name='firstName'>
                            {({ field }: FieldProps) => (
                                <FormControl isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input {...field} type="text" placeholder='Enter First Name' />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='lastName'>
                            {({ field }: FieldProps) => (
                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input {...field} type="text" placeholder='Enter Last Name' />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='phoneNumber'>
                            {({ field }: FieldProps) => (
                                <FormControl isRequired>
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input {...field} type="tel" placeholder='Enter Phone Number' />
                                </FormControl>
                            )}
                        </Field>
                    </Form>
                )
            }
        </Formik>
    )
}

export default AddEditCustomer;