import { Models } from 'node-appwrite';

/* Types match the created schemas in AppWrite */


/* -------------- Used for registration form -------------- */
export interface Member extends Models.Document{
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  primaryExpert: string;
  privacyConsent: boolean;
  gender: Gender;
//  : string;
}