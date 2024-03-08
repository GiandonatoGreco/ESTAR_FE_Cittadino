export interface GeoI {
  lat: number;
  lng: number;
}

export interface CompanyI {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface DoctorI {
  id: number;
  name: string;
  username: string;
  email: string;
  available: 'yes' | 'no' | 'only_desk';
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoI;
  };
  phone: string;
  website: string;
  company: CompanyI;
}
