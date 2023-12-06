import { poolConnMitra } from "../../../databases/connections.js";
import { insert_notifications_mitra, get_history_paids } from "../../../databases/queries.js";
import moment from "moment-timezone";

export async function insertNotificationMitra(data) {
    const {
        trx_id, merchant_id, merchant, bill_no, payment_reff,
        payment_date, payment_status_code, payment_status_desc, bill_total,
        payment_total, payment_channel_uid, payment_channel, signature,va,chanel
    } = data;

    const insertingData = [
       trx_id,merchant_id,merchant,chanel,va,payment_reff,
       payment_date,payment_status_code,payment_status_desc,
       bill_total,payment_total,payment_channel_uid,payment_channel,signature
    ]

    const notif = await insertData(insertingData);

    if(notif.message == "error" && notif.code_error == "1062"){
        data["pernah_notif"] = true
    }else{
        const ambilIdHistory = await getIdHistoryPaids(trx_id);
        data["id_history_paids"] = ambilIdHistory;
    }

    const faspayResponse = {
        "response"      : "Payment Notification",
        "trx_id"        : trx_id,
        "merchant_id"   : merchant_id,
        "merchant"      : merchant,
        "bill_no"       : bill_no,
        "response_code" : "00",
        "response_desc" : "Success",
        "response_date" : moment().format()
    }

    data["faspay_response"] = faspayResponse
    return data
}

async function insertData(insertingData) {
    try {
        await poolConnMitra.query(insert_notifications_mitra,[insertingData])
        return {message: "success"}
    } catch (e) {
        return {message: "error", code_error: e.errno}
    }
}

async function getIdHistoryPaids(trx_id) {
    const [data] = await poolConnMitra.query(get_history_paids, [trx_id]);
    return data[0].id;
}
