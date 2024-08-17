import { useCallback } from "react";
import { getBaseAPIUrl } from "../../Utils/func";
import axios from "axios";
import { IProductService } from "../Contracts/IProductService";
import { CompanyProductInfo } from "../Models/CompanyProductInfo";

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

    return { getCompanyProducts }
}

export default useProductService;