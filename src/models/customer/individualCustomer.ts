import firebase from "firebase";
import ICustomer, { CustomerType } from "./icustomer";

export default class IndividualCustomer implements ICustomer {
    id: string;
    name: string;
    tax_id: string;
    phone: string;
    created_at: firebase.firestore.Timestamp;
    updated_at: firebase.firestore.Timestamp;
    type: CustomerType
    
    constructor(
        id: string,
        name: string,
        tax_id: string,
        phone: string,
        created_at: firebase.firestore.Timestamp,
        updated_at: firebase.firestore.Timestamp,
    ) {
        this.id = id,
        this.name = name,
        this.tax_id = tax_id,
        this.phone = phone,
        this.created_at = created_at,
        this.updated_at = updated_at
        this.type = "individual"
    }
}