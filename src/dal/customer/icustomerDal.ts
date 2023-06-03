import ICustomer from "../../models/customer/icustomer";

export default interface ICustomerDal {
    createCustomer: (customer: ICustomer) => Promise<void>
    deleteCustomer: (id: string) => Promise<void>
    updateCustomer: (id: string, data: Partial<ICustomer>) => Promise<void>
    getCustomer: (id: string) => Promise<ICustomer>
}   