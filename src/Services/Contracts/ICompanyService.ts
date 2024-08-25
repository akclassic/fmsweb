import { CompanyInfo } from "../Models/CompanyInfo";
import { PurchaseOrderinfo, SalesOrderinfo } from "../Models/PurchaseInfor";

export interface ICompanyService {
    getCompanyList(): Promise<CompanyInfo[]>;
    getPurchaseOrders(companyId: number): Promise<PurchaseOrderinfo[]>;
    getSalesOrders(companyId: number): Promise<SalesOrderinfo[]>;
}