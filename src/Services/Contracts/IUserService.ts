import { CustomerInfo } from "../Models/CustomerInfo";
import { UserInfo } from "../Models/UserInfo";

export interface IUserService {
    getAllCustomers(customerId: number): Promise<UserInfo[]>;
    getAllSuppliers(customerId: number): Promise<UserInfo[]>;
    saveCustomerDetail(customerInfo: CustomerInfo, comapanyId: number): Promise<boolean>;
    // saveSupplierDetail(customerInfo: SupplierInfo, comapanyId: number): Promise<boolean>;
    removeCustomer(customerId: string): Promise<boolean>;
    removeSupplier(supplierId: string): Promise<boolean>;
}