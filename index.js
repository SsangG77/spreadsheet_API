const { google } = require('googleapis');

//import api_Key from "./apikey.json"
const api_key = require('./apikey.json')
require('dotenv').config()

async function getSharedSheetAsJson(sheetId, range, apiKey) {
    console.log(
        '=================================================================================[ 함수 동작함 ] ==================================================================='
        )
  try {
    const sheets = google.sheets('v4');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
      key: apiKey,
    });

    const rows = response.data.values;
    console.log("==================== rows ====================")
    console.log(rows)
    const headers = rows[0];
    const data = rows.slice(1);

    const result = data.map(row => {
      return headers.reduce((obj, header, idx) => {
        obj[header] = row[idx];
        return obj;
      }, {});
    });

    return JSON.stringify(result);
  } catch (error) {
    console.error(error);
    return null;
  }
}


let sheetId = "1FOZdya-n8Rv2GMBOqecv_rOA8swGGLUJE6hA_LYv6wg" //공유된 스프레드시트 ID
let sheetRange = "2월!D3:AI19"; //스프레드시트 셀 범위
//let apiKey = api_key.key
let apiKey = process.env.API_KEY


// 예시: 공유된 스프레드시트 ID, 범위, API 키를 인자로 전달합니다.
getSharedSheetAsJson(sheetId, sheetRange, apiKey)
  .then(jsonData => {
    let parseJson = JSON.parse(jsonData)
    console.log('======================= parseJson =======================')
    console.log(parseJson);
  });
