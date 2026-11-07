// This is what an Invoice looks like when it arrives from the AI
export interface InvoiceData {
  supplierName: string;
  amount: number;
  vatAmount: number;
  invoiceDate: string;
  invoiceNumber: string;
}

// This is what an Invoice looks like in our Database
export interface InvoiceRecord extends InvoiceData {
  id: number;
  status: 'pending' | 'synced' | 'failed';
  createdAt: Date;
}