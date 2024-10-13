export interface Invoice {
    id: number;
    invoice_number: string;
    date: string; 
    netto_amount: number;
    cost_code_id: number;
    cost_center_id: number;
    supplier_id: number;
    user_id: number; 
    supplier: string;
}
