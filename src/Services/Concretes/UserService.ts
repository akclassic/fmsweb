import axios from "axios";
import { useCallback } from 'react';
import { IUserService } from "../Contracts/IUserService";
import { UserInfo } from '../Models/UserInfo';

const useUserService = (): IUserService => {
    const baseUrl:string = "https://localhost:7022/api/User";

    const getAllCustomers = useCallback(async (): Promise<UserInfo[]> => {
        try {
            const response = await axios.get(`${baseUrl}/customers`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    return { getAllCustomers };
};

export default useUserService;
