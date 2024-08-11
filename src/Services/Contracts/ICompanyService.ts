import { CompanyInfo } from "../Models/CompanyInfo";
import { PurchaseOrderinfo } from "../Models/PurchaseInfor";

export interface ICompanyService {
    getCompanyList(): Promise<CompanyInfo[]>;
    getPurchaseOrders(companyId: number): Promise<PurchaseOrderinfo[]>;
}