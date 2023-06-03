import firebase from "firebase";
import IPolicy from "./ipolicy";
import { InsuranceCompany } from "../../context/insurancecompanies";

export default class DaskPolicy implements IPolicy {
    id: string;
    name: string;
    insurance_company: InsuranceCompany;
    user_id: string;
    type: "dask";
    subtype: "dask";
    price: number;
    commission_rate: number;
    created_at: firebase.firestore.Timestamp;
    actived_at: firebase.firestore.Timestamp;
    expired_at: firebase.firestore.Timestamp;
    updated_at!: firebase.firestore.Timestamp;
    
    constructor(
        name: string,
        insurance_company: InsuranceCompany,
        user_id: string,
        price: number,
        commission_rate: number,
        created_at: firebase.firestore.Timestamp,
        actived_at: firebase.firestore.Timestamp,
        expired_at: firebase.firestore.Timestamp,
    ) {
        this.id = "";
        this.name = name;
        this.insurance_company = insurance_company;
        this.user_id = user_id;
        this.price = price;
        this.commission_rate = commission_rate;
        this.created_at = created_at;
        this.actived_at = actived_at;
        this.expired_at = expired_at;
        this.type = "dask";
        this.subtype = "dask";
    }
    
}