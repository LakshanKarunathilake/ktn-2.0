export default interface Purchase {
  invoiceNo: string;
  date: string;
  total: number;
  discount: number;
  items?: Array<{ code: string; cost: number; selling: number; qty: number }>;
  returns?: Array<any>;
}
