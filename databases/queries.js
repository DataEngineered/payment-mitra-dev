export const query_mitra_va = `
SELECT dmpc.id AS customer_id, dmpc.nama, dmpb.amount
FROM payment_bills dmpb
INNER JOIN partner_customers dmpc ON dmpb.customer_id = dmpc.id
WHERE dmpb.virtual_account = ?
`
export const query_channels = `
SELECT * FROM developer_dasarata_payment.channels WHERE kode = ?
`

export const insert_notifications_mitra = `
INSERT INTO history_pathner_paids
(trx_id,merchant_id,merchant,chanel,va,payment_reff,payment_date,
payment_status_code,payment_status_desc,bill_total,payment_total,
payment_channel_uid,payment_channel,signature)
VALUES (?)
`

export const update_status_customer_mitra = `
UPDATE partner_customers SET status_customer = ? WHERE id = ?
`

export const get_history_paids =
`SELECT id FROM history_pathner_paids WHERE trx_id = ?`

export const update_history_paids =
`UPDATE history_pathner_paids SET kirim_accounting = ? WHERE id = ?`