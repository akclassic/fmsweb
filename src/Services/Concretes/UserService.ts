import axios from "axios";
import { useCallback } from 'react';
import { IUserService } from "../Contracts/IUserService";
import { UserInfo } from '../Models/UserInfo';
import { CustomerInfo } from "../Models/CustomerInfo";
import { getBaseAPIUrl } from "../../Utils/func";

const useUserService = (): IUserService => {
    const hostUrl: string = getBaseAPIUrl();
    const baseUrl: string = hostUrl + "/User";

    const getAllCustomers = useCallback(async (companyId: number): Promise<UserInfo[]> => {
        try {
            const response = await axios.get(`${baseUrl}/customers/${companyId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    const getAllSuppliers = useCallback(async (companyId: number): Promise<UserInfo[]> => {
        try {
            const response = await axios.get(`${baseUrl}/suppliers/${companyId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    const saveCustomerDetail = useCallback(async (customerInfo: CustomerInfo, comapanyId: number): Promise<boolean> => {
        try {
            const response = await axios.post(`${baseUrl}/customerdetail/${comapanyId}`, customerInfo);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    const removeCustomer = useCallback(async (customerId: string): Promise<boolean> => {
        try {
            const response = await axios.delete(`${baseUrl}/customer/${customerId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    const removeSupplier = useCallback(async (supplierId: string): Promise<boolean> => {
        try {
            const response = await axios.delete(`${baseUrl}/supplier/${supplierId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    return { getAllCustomers, saveCustomerDetail, removeCustomer, getAllSuppliers, removeSupplier };
};

export default useUserService;
