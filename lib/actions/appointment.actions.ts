import { ID } from 'node-appwrite';
import { APPWRITE_DB, APPWRITE_COLLECTION_APPOINTMENT, databases } from '../appwrite.config';
import { parseStringify } from '../utils';

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try{
    const newAppointment = await databases.createDocument(
      APPWRITE_DB!,
      APPWRITE_COLLECTION_APPOINTMENT!,
      ID.unique(),
      appointment,
    )

    return parseStringify(newAppointment);
  } catch(error){
    console.log(error);
  }
}