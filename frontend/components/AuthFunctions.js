import firebase from "../secrets/Firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getIdToken, getIdTokenResult } from "firebase/auth";

export async function signUpFunction(email, password) {
  try {
    const auth = getAuth(firebase)
    const res = await createUserWithEmailAndPassword(auth, email, password)
    
    return {
      "success": true,
      "info": res,
      "uid": res.user.uid
    }
  } catch (error) {
    return error
  }
}

export async function login(email, password) {
  try {
    const auth = getAuth(firebase)
    const res = await signInWithEmailAndPassword(auth, email, password)

    return {
      "success": true,
      "info": res,
      "uid": res.user.uid
    }
  } catch (error) {
    return error
  }
}

export async function getAuthToken() {
  let token = await getAuth(firebase).currentUser.getIdToken()
  return token
}