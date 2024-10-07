import { AgedTrialBalanceDto } from "../Models/AgedTrialBalanceInfo";
import { SupplierDetail } from "../Models/SupplierDetailInfo";
import { SupplierPurchaseInfo } from "../Models/SupplierPurchaseInfo";

export interface ISupplierService{
    getSupplierInfo(id: string): Promise<SupplierDetail>;
    getSupplierTransactionsInfo(id: string): Promise<SupplierPurchaseInfo[]>;
    getSupplierTrailBalance(companyId: number): Promise<AgedTrialBalanceDto[]>;
}