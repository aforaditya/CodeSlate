import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "ecommerce-df6a1.firebaseapp.com",
    projectId: "ecommerce-df6a1",
    storageBucket: "ecommerce-df6a1.appspot.com",
    messagingSenderId: "88919524728",
    appId: "1:88919524728:web:d3a7fef1d52d60fc87f48d",
    measurementId: "G-XVMJZCMDPT"
  }

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const add = async (collectionName, data)=>{
    let docSnap = await addDoc(collection(db, collectionName), {...data, timeStamp: serverTimestamp()});
    return docSnap.id
}


export const get = async (collectionName, key)=>{
    const docSnap = await getDoc(doc(db, collectionName, key));
    return docSnap.data()
}
