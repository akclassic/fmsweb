export interface AgedTrialBalanceDto {
    Account: string;      // Could be a custom supplier code or ID
    Name: string;
    Balance: number;      // Corresponds to C# decimal
    Current: number;      // Corresponds to C# decimal
    OneMonth: number;     // Corresponds to C# decimal
    TwoMonths: number;    // Corresponds to C# decimal
    ThreeMonths: number;  // Corresponds to C# decimal
    Phone: string;        // Assuming the Supplier has a phone field
}
