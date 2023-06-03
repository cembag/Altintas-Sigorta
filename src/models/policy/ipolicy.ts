import firebase from "firebase"
import { InsuranceCompany } from "../../context/insurancecompanies";

export const policyTypes = ["car", "health", "house", "dask"] as const;
export const policySubTypes = ["traffic", "kasko", "house", "complementary health", "special health", "dask"] as const;

export type PolicyType = typeof policyTypes[number];
export type PolicySubType = typeof policySubTypes[number];


export default interface IPolicy {
    id: string,
    name: string,
    insurance_company: InsuranceCompany,
    user_id: string,
    type: PolicyType,
    subtype: PolicySubType
    price: number,
    commission_rate: number,
    created_at: firebase.firestore.Timestamp,
    actived_at: firebase.firestore.Timestamp,
    expired_at: firebase.firestore.Timestamp,
    updated_at: firebase.firestore.Timestamp | null,
}