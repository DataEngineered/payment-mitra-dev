import { poolConnMitra } from "../../databases/connections.js";
import { query_mitra_va } from "../../databases/queries.js";
import { insertNotificationMitra } from "./models/insertNotificationModels.js";
import { statusCustomerControllers } from "./statusCustomerControllers.js";

export async function receiveNotifications(req, res) {
    if(req.body.request != "Payment Notification" || req.body.payment_status_code != "2"){
        return res.send({error: "error", response_code: "01"})
    }

    const data                  = req.body

    data["chanel"]              = data.bill_no.slice(0, -10)
    data["va"]                  = data.bill_no.slice(-10)
    data["pernah_notif"]        = false
    data["id_history_paids"]    = ""
    data["kirim_accounting"]    = false
    data["url_accounting"]      = ""

    const [result_va]           = await poolConnMitra.query(query_mitra_va, [data.va])
    if(result_va[0] == undefined){return res.send('no access')}

    data["faspay_response"]     = ""

    await insertNotificationMitra(data)
    res.send(data.faspay_response)
    if(data.pernah_notif){
        console.log("pernah notif gan")
        return
    }
    await statusCustomerControllers(data)
    return
}