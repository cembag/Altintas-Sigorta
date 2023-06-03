import IPolicy from "../../models/policy/ipolicy";
import dbModel from "../../utils/dbModel";

export default class PolicyDal {
    
    public async createPolicy(policy: IPolicy): Promise<void> {
        await dbModel.policies.add(policy);
    }
    
    public async deletePolicy(policyId: string): Promise<void> {
        await dbModel.policies.doc(policyId).delete();
    }
    
    public async getPolicy(policyId: string): Promise<IPolicy> {
        return (await dbModel.policies.doc(policyId).get()).data()!;
    }
    
    public async updatePolicy(policyId: string, data: Partial<IPolicy>) {
        await dbModel.policies.doc(policyId).update(data);
    }
}