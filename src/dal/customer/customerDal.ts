import firebase from "firebase"
import ICustomer from "../../models/customer/icustomer";
import dbModel from "../../utils/dbModel";
import rdbModel from "../../utils/rdbModel";
import ICustomerDal from "./icustomerDal";

export default class CustomerDal implements ICustomerDal {
    public async createCustomer(customer: ICustomer): Promise<void> {
        await dbModel.customer.add(customer).then(async (customer) => customer.update({id: customer.id}));
        await rdbModel.customers.child("count").set(firebase.database.ServerValue.increment(1));
    }
    
    public async deleteCustomer(id: string): Promise<void> {
        await dbModel.customer.doc(id).delete();
        await rdbModel.customers.child("count").set(firebase.database.ServerValue.increment(-1));
    }
    
    public async updateCustomer(id: string, data: Partial<ICustomer>): Promise<void> {
        await dbModel.customer.doc(id).update(data)
    }
    
    public async getCustomer(id: string): Promise<ICustomer> {
        return (await dbModel.customer.doc(id).get()).data() as ICustomer
    }
}