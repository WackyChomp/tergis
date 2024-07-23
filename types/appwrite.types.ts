import { Models } from 'node-appwrite';

/* Types match the created schemas in AppWrite */


/* -------------- Used for registration form -------------- */
export interface Member extends Models.Document{
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  address: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
//  : string;
}