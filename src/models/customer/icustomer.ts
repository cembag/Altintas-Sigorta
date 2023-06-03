import firebase from "firebase"

export const customerTypes = ["individual", "institutional"] as const;
export type CustomerType = typeof customerTypes[number];

export default interface ICustomer {
    id: string
    name: string
    tax_id: string
    phone: string
    type: CustomerType
    created_at: firebase.firestore.Timestamp,
    updated_at?: firebase.firestore.Timestamp,
}