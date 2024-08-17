import { CompanyProductInfo } from "../Models/CompanyProductInfo";

export interface IProductService {
    getCompanyProducts(companyId: number): Promise<CompanyProductInfo[]>;
}