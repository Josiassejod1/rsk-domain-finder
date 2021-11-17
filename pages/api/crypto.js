// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const dotenv = require('dotenv')
const BASE_URL = "https://api.kucoin.com";

export default function handler(req, res) {

  if (req.method == "GET") {
    res.status(200).send(getCurrentPrice());
  }
}

async function getCurrentPrice() {
  const KC_API_KEY = process.env.KC_API_KEY;
  const KC_SECRET = process.env.KC_SECRET;
  const KC_PASS_PHRASE = process.env.KC_PASS_PHRASE;
  const resp = await fetch(BASE_URL + "/api/v1/market/stats?symbol=BTC-USDT", {
    method: "GET",
    headers: {
      "KC-API-KEY": KC_API_KEY, 
      "KC-API-SIGN": KC_SECRET,
      "KC-API-TIMESTAMP": Date.now() / 1000,
      "KC-API-PASSPHRASE": KC_PASS_PHRASE,
      "Content-Type": "application/json"
    }
  }).then(data => console.log(data));

  // console.log(resp);
  // console.log(resp.then(data => console.log(data)));

  //return resp.body;
}
