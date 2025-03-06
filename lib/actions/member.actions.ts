'use server'

import { ID, Query } from "node-appwrite"
import { BUCKET_ID, APPWRITE_DB, ENDPOINT, APPWRITE_COLLECTION_MEMBER, APPWRITE_PROJECT_ID, databases, storage, users } from '../appwrite.config'
import { parseStringify } from "../utils"

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

    return parseStringify(newUser)
    
  } catch (error: any) {
    if(error && error?.code === 409){
      const documents = await users.list([
        Query.equal('email', [user.email])
      ])

      return documents?.users[0]
    }
    console.error('An error occured while creating new user:', error)
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

export const registerMember = async ({ identificationDocument, ...member } : RegisterUserParams) =>{
  try {
    let file;
    if(identificationDocument){
      const inputFile = identificationDocument && 
        InputFile.fromBuffer(
          identificationDocument?.get('blobFile') as Blob,
          identificationDocument?.get('fileName') as string,
      )

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    // console.log(
    //   {
    //     identificationDocumentId: file?.$id || null,
    //     identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${APPWRITE_PROJECT_ID}`,
    //     gender: member.gender
    //   }
    // )

    const newMember = await databases.createDocument(
      APPWRITE_DB!,
      APPWRITE_COLLECTION_MEMBER!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${APPWRITE_PROJECT_ID}`,
        ...member,
      }
    )

    return parseStringify(newMember);

  } catch (error) {
    console.log(error);
  }
}