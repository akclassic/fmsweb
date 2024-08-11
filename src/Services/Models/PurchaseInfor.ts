export interface PurchaseOrderinfo
{
    id: number;
    supplierId: string;
    supplierName: string;
    quantity: number;
    totalAmount: number;
    outstandingBalance: number;
    productId: number;
    dateOfPurchase: Date;
    productName: string;
    invoiceUrl: string;
}