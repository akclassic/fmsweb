import axios from "axios";
import { ICustomerService } from "../Contracts/ICustomerService";
import { CustomerPurchaseInfo } from "../Models/CustomerPurchaseInfo";
import { getBaseAPIUrl } from "../../Utils/func";
import { AgedTrialBalanceDto } from "../Models/AgedTrialBalanceInfo";

const useCustomerService = (): ICustomerService => {
    const hostUrl: string = getBaseAPIUrl();
    const baseUrl: string = hostUrl + "/Customer";

    const getCustomerTransactionsInfo = async (id: string): Promise<CustomerPurchaseInfo[]> => {
        try {
            const response = await axios.get(`${baseUrl}/sell/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }

    const getTrailBalance = async (companyId: number): Promise<AgedTrialBalanceDto[]> => {
        try {
            const response = await axios.get(`${baseUrl}/trialbalance/${companyId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }

    return { getCustomerTransactionsInfo, getTrailBalance};
}

export default useCustomerService;