import { Box, Center, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { CompanyProductInfo } from "../../Services/Models/CompanyProductInfo";
import useProductService from "../../Services/Concretes/ProductService";
import { DeleteIcon } from "@chakra-ui/icons";

const Materials: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<CompanyProductInfo[]>([]);
    const { getCompanyProducts } = useProductService();
    
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

    return (
        <Box>
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
                                    <Td key={product.id} textAlign="left">
                                        {product.id}
                                    </Td>
                                    <Td key={product.id} textAlign="left">
                                        {product.name}
                                    </Td>
                                    <Td key={product.id} textAlign="left">
                                        {product.category}
                                    </Td>
                                    <Td key={product.id} textAlign="left">
                                        {product.productUnitName}
                                    </Td>
                                    <Td key={product.id} textAlign="left">
                                        {product.productUnitPrice}
                                    </Td>
                                    <Td>
                                        <DeleteIcon  />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    )
}

export default Materials;