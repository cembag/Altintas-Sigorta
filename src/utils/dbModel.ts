import firebase from "firebase";
import { db } from "../config/firebase";
import ICustomer from "../models/customer/icustomer";
import IPolicy from "../models/policy/ipolicy";

const converter = <T>() => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => Object.assign({id: snap.id}, snap.data()) as T
})

const dataPoint = <T extends firebase.firestore.DocumentData>(collectionPath: string) => db.collection(collectionPath).withConverter(converter<T>())

const dbModel = {
    customer: dataPoint<ICustomer>("customers"),
    policies: dataPoint<IPolicy>("policies"),
    customerPolicies: (customerId: string) => dataPoint<IPolicy>("customers/" + customerId + "/policies"),
}

export default dbModel
