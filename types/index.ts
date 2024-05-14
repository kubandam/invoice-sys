export interface IUser {
  name: string;
  email: string;
  password: string;
  _id?: string;
  phone?: string;
}
export interface ICompany {
  _id: string,
  ico: string,
  dic: string,
  icdph?: string,
  address: string,
  zip: string,
  town: string,
  country: string,
}  