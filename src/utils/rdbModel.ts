import { rDb } from "../config/firebase"

const rdbModel = {
    customers: rDb.ref("metadatas/customers")
}

export default rdbModel