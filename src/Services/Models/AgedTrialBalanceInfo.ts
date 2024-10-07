export interface AgedTrialBalanceDto {
    id: string;      // Could be a custom supplier code or ID
    name: string;
    balance: number;      // Corresponds to C# decimal
    current: number;      // Corresponds to C# decimal
    oneMonth: number;     // Corresponds to C# decimal
    twoMonths: number;    // Corresponds to C# decimal
    threeMonths: number;  // Corresponds to C# decimal
    phone: string;        // Assuming the Supplier has a phone field
}
