import { useCallback } from "react";
import { getBaseAPIUrl } from "../../Utils/func";
import { ISupplierService } from "../Contracts/ISupplierService";
import { SupplierDetail } from "../Models/SupplierDetailInfo";
import axios from "axios";
import { SupplierPurchaseInfo } from "../Models/SupplierPurchaseInfo";
import { AgedTrialBalanceDto } from "../Models/AgedTrialBalanceInfo";

const useSupplierService = (): ISupplierService => {
    const hostUrl: string = getBaseAPIUrl();
    const baseUrl: string = hostUrl + "/Supplier";

    const getSupplierInfo = useCallback(async (id: string): Promise<SupplierDetail> => {
        try {
            const response = await axios.get(`${baseUrl}/${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    const getSupplierTransactionsInfo = useCallback(async (supplierId: string): Promise<SupplierPurchaseInfo[]> => {
        try {
            const response = await axios.get(`${baseUrl}/purchases/${supplierId}`);
            console.log(response);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }, [baseUrl]);

    const getSupplierTrailBalance = async (companyId: number): Promise<AgedTrialBalanceDto[]> => {
        try {
            const response = await axios.get(`${baseUrl}/trialbalance/${companyId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }

    return { getSupplierInfo, getSupplierTransactionsInfo, getSupplierTrailBalance };
};

export default useSupplierService;