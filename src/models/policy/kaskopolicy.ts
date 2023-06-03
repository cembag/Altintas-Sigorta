import firebase from "firebase";
import IPolicy from "./ipolicy";
import { InsuranceCompany } from "../../context/insurancecompanies";

export default class KaskoPolicy implements IPolicy {
    id: string;
    name: string;
    insurance_company: InsuranceCompany;
    user_id: string;
    subtype: "kasko";
    type: "car";
    price: number;
    commission_rate: number;
    license_plate: string;
    brand: string;
    model: string;
    created_at: firebase.firestore.Timestamp;
    actived_at: firebase.firestore.Timestamp;
    expired_at: firebase.firestore.Timestamp;
    updated_at!: firebase.firestore.Timestamp;
    
    constructor(
        name: string,
        user_id: string,
        insurance_company: InsuranceCompany,
        license_plate: string,
        brand: string,
        model: string,
        price: number,
        commission_rate: number,
        created_at: firebase.firestore.Timestamp,
        actived_at: firebase.firestore.Timestamp,
        expired_at: firebase.firestore.Timestamp
    ) {
        this.id = "";
        this.name = name;
        this.insurance_company = insurance_company;
        this.user_id = user_id;
        this.subtype = "kasko";
        this.type = "car";
        this.price = price;
        this.commission_rate = commission_rate;
        this.license_plate = license_plate;
        this.brand = brand;
        this.model = model;
        this.created_at = created_at;
        this.actived_at = actived_at;
        this.expired_at = expired_at;
    };
}