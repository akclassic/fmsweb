import { Box, Button, useDisclosure } from "@chakra-ui/react";
import CommonModal from "../../Components/Modal/Modal";
import withForm from "../../HOC/withForm";
import PaymentsReceivedForm, { PaymentsReceivedFormValues } from "../../Components/Forms/PaymentRecieved";
import { useState } from "react";
import { PaymentMode } from "../../Utils/enums";
import { FormikHelpers } from "formik";
import PaymentsMadeForm, { PaymentsMadeFormValues } from "../../Components/Forms/PaymentMade";
import SalesForm, { SalesFormValues } from "../../Components/Forms/Sales";
import PurchaseForm, { PurchaseFormValues } from "../../Components/Forms/Purchase";

const EnhancedPaymentsReceivedForm = withForm<PaymentsReceivedFormValues>(PaymentsReceivedForm);
const EnhancedPaymentsMadeForm = withForm<PaymentsMadeFormValues>(PaymentsMadeForm);
const EnhancedSalesForm = withForm<SalesFormValues>(SalesForm);
const EnhancedPurchaseForm = withForm<PurchaseFormValues>(PurchaseForm);

const FormsPage: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formSelected, setFormSelected] = useState<string>("");

    // const handleFormSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    //     console.log('Form Values:', values);
    //     // Perform further actions with form values
    // };

    const handleFormSelect = (index: number) => {
        if (index === 0) {
            setFormSelected("paymentreceivedform");
        } else if (index === 1) {
            setFormSelected("paymentmadeform");
        } else if (index === 2) {
            setFormSelected("salesform");
        } else if (index === 3) {
            setFormSelected("purchaseform");
        }
        onOpen();
    }

    const getForm = () => {
        if (formSelected === "paymentreceivedform") {
            return (
                <EnhancedPaymentsReceivedForm
                    initialValues={{
                        dateTime: '',
                        partyName: '',
                        paymentAmount: '',
                        paymentMode: PaymentMode.Cash,
                    }}
                    onSubmit={() => {}}
                />
            )
        } else if (formSelected === "paymentmadeform") {
            return (
                <EnhancedPaymentsMadeForm
                    initialValues={{
                        dateTime: '',
                        partyName: '',
                        paymentAmount: '',
                        paymentMode: PaymentMode.Cash,
                    }}
                    onSubmit={() => {}}
                />
            )
        } else if (formSelected === "salesform") {
            return (
                <EnhancedSalesForm
                    initialValues={{
                        dateTime: '',
                        partyName: '',
                        paymentAmount: '',
                        paymentMode: PaymentMode.Cash,
                    }}
                    onSubmit={() => {}}
                />
            )
        } else if (formSelected === "purchaseform") {
            return (
                <EnhancedPurchaseForm
                    initialValues={{
                        dateTime: '',
                        partyName: '',
                        paymentAmount: '',
                        paymentMode: PaymentMode.Cash,
                    }}
                    onSubmit={() => {}}
                />
            )
        }
    }

    return (
        <Box>
            <Box><Button onClick={() => handleFormSelect(0)}>Payment Received</Button></Box>
            <Box><Button onClick={() => handleFormSelect(1)}>Payment Made</Button></Box>
            <Box><Button onClick={() => handleFormSelect(2)}>Sales </Button></Box>
            <Box><Button onClick={() => handleFormSelect(3)}>Purchase </Button></Box>
            <CommonModal
                isOpen={isOpen}
                onClose={onClose}
                title={formSelected}
                isSubmitting={isSubmitting}
                form={formSelected}
            >
                {getForm()}
            </CommonModal>
        </Box>
    )
}

export default FormsPage;