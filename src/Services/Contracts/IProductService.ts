import { CompanyProductInfo, ProductUnitInfo, ProductDTO } from "../Models/CompanyProductInfo";

export interface IProductService {
    getCompanyProducts(companyId: number): Promise<CompanyProductInfo[]>;
    getProductUnits(companyId: number): Promise<ProductUnitInfo[]>;
    addProduct(productInfo: ProductDTO): Promise<boolean>;
    removeProduct(id: number): Promise<boolean>;
}