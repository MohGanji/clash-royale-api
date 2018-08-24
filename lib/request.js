const axios = require('axios')

const BASE_URL = 'https://api.clashroyale.com/v1/'
// const proxyURL = "https://cors-anywhere.herokuapp.com/";
const jwtToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijg4N2FiZTIxLWYyZWEtNGY4Ny1iMjJiLWFkOGUwZjIwNDlmMiIsImlhdCI6MTUzNTA5OTg0Mywic3ViIjoiZGV2ZWxvcGVyL2VlMzEyNDA1LTc5NjUtNWJkNS1kNzZkLTA3ZGI0YTQ1NjMwMCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMDkuMjAyLjEwMS4zNSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.ofBXL_sb-e2N8W6s8KVbsLcswoScZQa4NUepW62kfcAlrZnuN-dtktYy3Wgy78t916szVMJ9RI23wemoDV5_Rg'

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    authority: 'api.clashroyale.com',
    authorization: `Bearer ${jwtToken}`,
    Accept: 'application/json',
    // referer: "https://developer.clashroyale.com/api-docs/index.html",
    // accept: "application/json;charset=utf-8,*/*",
    // origin: "https://developer.clashroyale.com",
    // "accept-encoding": "gzip, deflate, br",
    // "accept-language": "en-US,en;q=0.9"
    // "Access-Control-Allow-Origin": "*"
  },
})

module.exports = request
