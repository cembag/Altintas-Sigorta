const insuranceCompanies = ["allians", "doğa", "ak", "anadolu", "axa", "gri", "orient", "neova", "quick", "mapfre", "sompo", "türkiye", "unico", "hdi", "koru", "ethica"] as const;
export type InsuranceCompany = typeof insuranceCompanies[number];

export default insuranceCompanies;