import { useCallback } from "react";
import { getBaseAPIUrl } from "../../Utils/func";
import axios from "axios";
import { IProductService } from "../Contracts/IProductService";
import { CompanyProductInfo, ProductDTO, ProductUnitInfo } from "../Models/CompanyProductInfo";

const useProductService = (): IProductService => {
    const hostUrl: string = getBaseAPIUrl();
    const baseUrl: string = hostUrl + "/Product";

    const getCompanyProducts = useCallback(async (companyId: number): Promise<CompanyProductInfo[]> => {
        try {
            const response = await axios.get(`${baseUrl}/${companyId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    const getProductUnits = useCallback(async (companyId: number): Promise<ProductUnitInfo[]> => {
        try {
            const response = await axios.get(`${baseUrl}/productunit/${companyId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    const addProduct = useCallback( async (product: ProductDTO): Promise<boolean> => {
        try {
            const response = await axios.post(`${baseUrl}/add`, product);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('Error add product');
        }
    }, [baseUrl]);

    const removeProduct = useCallback(async (id: number): Promise<boolean> => {
        try {
            const response = await axios.delete(`${baseUrl}/remove/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error removing product');
        }
    }, [baseUrl]);

    return { getCompanyProducts, getProductUnits, addProduct, removeProduct }
}

export default useProductService;