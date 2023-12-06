import { poolConnMitra, poolConnDasarata } from "../../databases/connections.js";
import { query_channels, query_mitra_va } from "../../databases/queries.js";

export async function getVACustomers(data) {
    const {type, va_number, trx_uid, amount, signature} = data

    const channel = va_number.slice(0, -10)
    const va = va_number.slice(-10)

    const [result_channel] = await poolConnDasarata.query(query_channels, [channel]);
    const [result_va] = await poolConnMitra.query(query_mitra_va, [va]);

    const harga = result_va[0]['amount']

    if(result_channel[0] != undefined && result_va[0] != undefined){
        if(type == "inquiry" || type == "payment"){
            if(type == "payment" && harga != amount){
                return { error: "error", response_code: "01"}
            }

            const inquiryData = {
                response        : "VA Static Response",
                va_number       : channel+va,
                amount          : harga,
                cust_name       : result_va[0].nama,
                response_code   : "00"
            }

            return inquiryData
        }
    }
    return { error: "error", response_code: "01"}
}