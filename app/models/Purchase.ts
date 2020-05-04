export default interface Purchase {
  invoiceNo: string;
  date: Date;
  total: string;
  items?: Array<{ code: string; cost: number; selling: number; qty: number }>;
  returns?: Array<any>;
}

export interface Supplier {
  name: string;
  address: string;
  contactNumber: string;
  lastUpdatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
