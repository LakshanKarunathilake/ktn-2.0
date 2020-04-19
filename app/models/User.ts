export interface SignupView {
  username: string;
  password: string;
  contact: string;
  adminPassword: string;
}
export interface LoginView {
  username: string;
  password: string;
}
export interface ItemAddView {
  code: string;
  category: string;
  description: string;
  vehicle: string;
  brand: string;
  unit: string;
  location: string;
  formDisabled?: boolean;
}
