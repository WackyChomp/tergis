'use server'

import { ID, Query } from "node-appwrite"
import { users } from '../appwrite.config'

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