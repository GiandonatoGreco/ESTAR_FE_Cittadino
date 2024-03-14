export interface LoginI {
  token: string;
}

export interface ProfileI {
  id: number;
  name: string;
  taxCode: string;
  serviceCompany: string;
  residence: string;
  sanitaryDomicile: string;
  email?: string;
  phone?: string;
}
