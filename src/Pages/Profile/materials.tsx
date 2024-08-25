import { Box, Button, Center, Flex, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { CompanyProductInfo, ProductDTO } from "../../Services/Models/CompanyProductInfo";
import useProductService from "../../Services/Concretes/ProductService";
import { DeleteIcon } from "@chakra-ui/icons";
import CommonModal from "../../Components/Modal/Modal";
import AddEditMaterial from "../../Components/Forms/AddEditMaterial";
import useToastMessage from "../../Contexts/UseToastMessage";
import { cloneDeep } from "lodash";

const Materials: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<CompanyProductInfo[]>([]);
    const { getCompanyProducts, addProduct, removeProduct } = useProductService();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const showToast = useToastMessage();

    useEffect(() => {
        setLoading(true);
        loadProducts();
        setLoading(false);
    }, []);

    const loadProducts = async () => {
        try {
            let companyId: number = 1;
            const result = await getCompanyProducts(companyId);
            setProducts(result);
        } catch (error) {
            //setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSave = async (data: any) => {
        setIsSubmitting(true);
        const productDTO: ProductDTO = {
            name: cloneDeep(data.name),
            companyId: 1,
            productUnitId: cloneDeep(Number(data.unit))
        };

        const result = await addProduct(cloneDeep(productDTO));

        try
        {
            if (result)  {
                showToast('Material Add Successfully', 'success');
                await loadProducts();
                onClose();
            } else {
                showToast('Failed', 'error');
                onClose();
            }
        }
        catch (error) {
            showToast('Failed', 'error');
            onClose();
        }
        finally {
            setIsSubmitting(false);
        }
        


    };

    const handleDelete = async (id: number) => {
        const result = await removeProduct(id);

        if (result)  {
            showToast('Material Removed Successfully', 'success');
            await loadProducts();
        } else {
            showToast('Failed', 'error');
        }
    }

    return (
        <Box>
            <Flex justifyContent="flex-end" alignItems="center" mb={4}>
                <Button colorScheme="blue" onClick={onOpen}>Add Material</Button>
            </Flex>
            {loading ? (
                <Center height="100vh">
                    <Spinner size="xl" />
                </Center>
            ) : (
                <TableContainer>
                    <Table variant='simple' colorScheme='teal'>
                        {/* <TableCaption>Table data updated at {moment().date.toString()}</TableCaption> */}
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Category</Th>
                                <Th>Unit</Th>
                                <Th>Per Unit Price</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {products.map((product) => (
                                <Tr key={product.id}>
                                    <Td textAlign="left">
                                        {product.id}
                                    </Td>
                                    <Td textAlign="left">
                                        {product.name}
                                    </Td>
                                    <Td textAlign="left">
                                        {product.category}
                                    </Td>
                                    <Td textAlign="left">
                                        {product.productUnitName}
                                    </Td>
                                    <Td textAlign="left">
                                        {product.productUnitPrice}
                                    </Td>
                                    <Td>
                                        <DeleteIcon onClick={() => handleDelete(product.id)} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
            <CommonModal
                isOpen={isOpen}
                onClose={onClose}
                title="Add Material"
                onSave={(data: any) => handleSave(data)}
                isSubmitting={isSubmitting}
                form="add-edit-material-form"
            >
                <AddEditMaterial onSubmit={handleSave} />
            </CommonModal>
        </Box>
    )
}

export default Materials;