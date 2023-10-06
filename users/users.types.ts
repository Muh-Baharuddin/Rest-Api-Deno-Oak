export interface User {
  _id?: string;
  email: string;
  username: string;
  addresses?: Address[];
  password: string;
}

export interface Address {
  _id: string;
  reciever: string;
  contact : string;
  streetName: string;
  subdistrict: string;
  city: string;
  postalCode: string;
  description: string;
  coordinate: string;
}