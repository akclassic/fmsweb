export interface CompanyProductInfo {
    id: number;
    name: string;
    category: string;
    productUnitName: string;
    productUnitPrice: number;
}

export interface ProductUnitInfo {
    id: string,
    name: string
}

export interface ProductDTO {
    name: string;
    companyId: number;
    productUnitId: number;
}