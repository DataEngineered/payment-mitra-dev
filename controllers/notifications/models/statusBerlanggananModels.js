import { poolConnMitra } from "../../../databases/connections.js";
import { update_status_customer_mitra } from "../../../databases/queries.js";

export async function statusCustomer(data) {
    const {customer_id} = data.data_customer
    const updateStatusValue = ['aktif', customer_id]

    await poolConnMitra.query(update_status_customer_mitra, updateStatusValue)

    return data
}