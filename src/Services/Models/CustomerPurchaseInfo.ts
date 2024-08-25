export interface CustomerPurchaseInfo {
    sellOrderId: string; // Guid is typically represented as a string in TypeScript
    totalAmount: number;
    outstandingBalance: number;
    productId: number;
    createdTime: Date;
    quantity: number;
    invoiceUrl: string;
    paymentModeId?: number; // Nullable types in C# are represented with the optional flag in TypeScript
    transactionDescription: string;
    paymentModeName: string;
    productName: string;
}
