'use server'

import { ID, Query } from "node-appwrite"
import { BUCKET_ID, APPWRITE_DB, ENDPOINT, APPWRITE_COLLECTION_MEMBER, APPWRITE_PROJECT_ID, databases, storage, users } from '../appwrite.config'
import { parseStringify } from "../utils"
import { IdentificationTypes } from "@/constants"

import { InputFile } from 'node-appwrite/file';

export const createUser = async (user:CreateUserParams) => {
  //create auth for appwrite user
  try {
    const newUser = await users.create(
      ID.unique(), 
      user.email, 
      user.phone, 
      undefined,      // refers to password , parameter order matters
      user.name, 
    )
    
  } catch (error: any) {
    if(error && error?.code === 409){
      const documents = await users.list([
        Query.equal('email', [user.email])
      ])

      return documents?.users[0]
    }
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log(error)
  }
}

export const registerMember = async ({ IdentificationDocument, ...member } : RegisterUserParams) =>{
  try {
    let file;
    if(IdentificationDocument){
      const inputFile = InputFile.fromBuffer(
        IdentificationDocument?.get('blobFile') as Blob,
        IdentificationDocument?.get('fileName') as string,
      )

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    const newMember = await databases.createDocument(
      APPWRITE_DB!,
      APPWRITE_COLLECTION_MEMBER!,
      ID.unique(),
      {
        IdentificationDocument: file?.$id || null,
        IdentificationUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${APPWRITE_PROJECT_ID}`,
        ...member
      }
    )
  } catch (error) {
    console.log(error);
  }
}