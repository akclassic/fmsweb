import { CustomerPurchaseInfo } from "../Models/CustomerPurchaseInfo";

export interface ICustomerService{
    // getSupplierInfo(id: string): Promise<SupplierDetail>;
    getCustomerTransactionsInfo(id: string): Promise<CustomerPurchaseInfo[]>;
}