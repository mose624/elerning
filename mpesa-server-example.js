/*
  M-Pesa Daraja STK Push backend example.

  Install a backend framework such as Express, then adapt this handler to your server.
  Required environment variables:
  MPESA_CONSUMER_KEY
  MPESA_CONSUMER_SECRET
  MPESA_PASSKEY
  MPESA_SHORTCODE
  MPESA_CALLBACK_URL

  Important: 0798462815 is a contact/payment confirmation phone number. Live STK Push
  normally requires a registered Paybill or Till shortcode from Safaricom.
*/

const MPESA_AUTH_URL = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
const MPESA_STK_URL = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

function timestamp() {
  const value = new Date();
  const pad = (part) => String(part).padStart(2, "0");
  return [
    value.getFullYear(),
    pad(value.getMonth() + 1),
    pad(value.getDate()),
    pad(value.getHours()),
    pad(value.getMinutes()),
    pad(value.getSeconds())
  ].join("");
}

function normalizeKenyanPhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return `254${digits.slice(1)}`;
  return digits;
}

async function getAccessToken() {
  const credentials = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");
  const response = await fetch(MPESA_AUTH_URL, {
    headers: {
      Authorization: `Basic ${credentials}`
    }
  });

  if (!response.ok) {
    throw new Error("Unable to authenticate with M-Pesa.");
  }

  const data = await response.json();
  return data.access_token;
}

async function stkPush({ customerPhone, amount, resource }) {
  const accessToken = await getAccessToken();
  const shortcode = process.env.MPESA_SHORTCODE;
  const requestTimestamp = timestamp();
  const password = Buffer.from(`${shortcode}${process.env.MPESA_PASSKEY}${requestTimestamp}`).toString("base64");

  const response = await fetch(MPESA_STK_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: requestTimestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Number(amount),
      PartyA: normalizeKenyanPhone(customerPhone),
      PartyB: shortcode,
      PhoneNumber: normalizeKenyanPhone(customerPhone),
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: "CBE Resources",
      TransactionDesc: resource || "CBE learning material"
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.errorMessage || "M-Pesa STK push failed.");
  }
  return data;
}

module.exports = { stkPush };
