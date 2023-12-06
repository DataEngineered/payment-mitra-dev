import express from "express";
import dotenv from "dotenv";
dotenv.config()

import { getVACustomers } from "./controllers/inquiries/mitraInquiryControllers.js";
import { receiveNotifications } from "./controllers/notifications/notificationControllers.js";

const app = express();
const PORT = process.env.PORT_RUNNING;
app.use(express.json());

app.get('/inquiry/:va_number/:signature', async(req, res) => {
    const {va_number, signature} = req.params;
    const {type,trx_uid,amount} = req.query;
    const data =
    {
        type      : type,
        va_number : va_number,
        trx_uid   : trx_uid,
        amount    : amount,
        signature : signature
    }
    const data_res = await getVACustomers(data);
    return res.send(data_res);
})

app.post('/notifications', [receiveNotifications])

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})