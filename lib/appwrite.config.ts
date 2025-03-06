import * as sdk from 'node-appwrite';

export const {
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DB,
  APPWRITE_COLLECTION_EXPERT,
  APPWRITE_COLLECTION_MEMBER,
  APPWRITE_COLLECTION_APPOINTMENT,
  APPWRITE_NEXT_PUBLIC_STORAGE_BUCKET_ID: BUCKET_ID,
  APPWRITE_NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env

const client = new sdk.Client()

client
  .setEndpoint(ENDPOINT!)
  .setProject(APPWRITE_PROJECT_ID!)
  .setKey(APPWRITE_API_KEY!)

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
