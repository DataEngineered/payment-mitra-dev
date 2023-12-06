import { poolConnMitra } from "../../databases/connections.js";
import { query_mitra_va, update_history_paids } from "../../databases/queries.js";
import { kirimAccounting } from "./models/accountingModels.js";
import { statusCustomer } from "./models/statusBerlanggananModels.js";
import dotenv from "dotenv";
dotenv.config();

export async function statusCustomerControllers(data){
    const [data_customer]       = await poolConnMitra.query(query_mitra_va, [data.va])
    data["data_customer"]       = data_customer[0]
    data["url_accounting"]      = process.env.URL_ACCOUNTING

    await statusCustomer(data)

    await kirimAccounting(data)

    const { id_history_paids, kirim_accounting } = data

    const history_paids_report = [kirim_accounting, id_history_paids]

    await poolConnMitra.query(update_history_paids, history_paids_report)
}