import axios from "axios";
import { useCallback } from 'react';
import { ICompanyService } from "../Contracts/ICompanyService";
import { CompanyInfo } from '../Models/CompanyInfo';
import { PurchaseOrderinfo, SalesOrderinfo } from "../Models/PurchaseInfor";
import { getBaseAPIUrl } from "../../Utils/func";

const useCompanyService = (): ICompanyService => {
    const hostUrl: string = getBaseAPIUrl();
    const baseUrl: string = hostUrl + "/Company";

    const getCompanyList = useCallback(async (): Promise<CompanyInfo[]> => {
        try {
            const response = await axios.get(`${baseUrl}/companylist`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    const getPurchaseOrders = useCallback(async (companyId: number): Promise<PurchaseOrderinfo[]> => {
        try {
            const response = await axios.get(`${baseUrl}/purchases/${companyId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    const getSalesOrders = useCallback(async (companyId: number): Promise<SalesOrderinfo[]> => {
        try {
            const response = await axios.get(`${baseUrl}/sales/${companyId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    return { getCompanyList, getPurchaseOrders, getSalesOrders };
};

export default useCompanyService;
