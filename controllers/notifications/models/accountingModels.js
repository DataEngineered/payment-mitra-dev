import axios from "axios";
import moment from "moment-timezone";

export async function kirimAccounting(data) {

    const { url_accounting, trx_id, payment_date, va, payment_status_desc, payment_channel, payment_total } = data
    const { nama, customer_id } = data.data_customer

    const tstamp = moment(payment_date).format("DD/MM/YYYY HH:mm:ss")
    const payment_date_format = moment(payment_date).format("DD/MM/YYYY")
    const payment_time_format = moment(payment_date).format("HH:mm:ss")

    const headers = {
        'Content-Type': 'application/json',
    }

    const form = {
        "tstamp"                : tstamp,
        "payment_date"          : payment_date_format,
        "payment_time"          : payment_time_format,
        "trx_id"                : trx_id,
        "va"                    : va,
        "nama"                  : nama,
        "customer_id"           : customer_id,
        "payment_status_desc"   : payment_status_desc,
        "payment_channel"       : payment_channel,
        "payment_total"         : payment_total
    }

    try {
        const response = await axios.post(url_accounting, form, { headers }, { timeout: 10000 })
        data["kirim_accounting"] = true
        return {message:"success", code:response.status}
    } catch (error) {
        if(error.code == "ECONNABORTED"){
            return {message:"error", code: error.code, causing:"time out"}
        }
        if(error.code == "ECONNREFUSED"){
            return {message:"error", code: error.code, causing:"server mati"}
        }else{
            return {message:"error", code: error.code, causing:"unknown reason"}
        }
    }
}