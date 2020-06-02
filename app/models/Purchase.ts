export default interface Purchase {
  invoiceNo: string;
  date?: Date;
  total: string;
  companyId: { key: string; value: string };
  items: Array<PurchaseItem>;
  returns?: Array<any>;
}

export interface PurchaseItem {
  key: number;
  partNumber: string;
  description: string;
  cost: number;
  selling: number;
  qty: number;
  purchased: number;
}

export interface Supplier {
  name: string;
  address: string;
  contactNumber: string;
  lastUpdatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
