import { PolicySubType } from "../models/policy/ipolicy";

const policyNamesTurkhis: {[key in PolicySubType]: string} = {
    traffic: "trafik",
    kasko: "kasko",
    house: "konut",
    dask: "dask",
    "complementary health": "tam. sağlık",
    "special health": "özel sağlık",
}

export default policyNamesTurkhis;

