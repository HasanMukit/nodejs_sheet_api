import { google } from "googleapis";
import { getSpreadSheetKeys, getKeys } from "./private_credentials.js";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const keys = await getKeys();
const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  SCOPES
);
const gsapi = google.sheets({ version: "v4", auth: client });
const spreadsheetKeys = await getSpreadSheetKeys();

const readData = async (spreadsheetId, range) => {
  try {
    const result = await gsapi.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });
    return result.data.values;
  } catch (error) {
    /* 
    !types of errors
    * if spreadsheet is not shared:
    [
      {
        message: "The caller does not have permission",
        domain: "global",
        reason: "forbidden",
      },
    ];
     * if spreadsheet id is wrong:
    [
      {
        message: 'Requested entity was not found.',
        domain: 'global',
        reason: 'notFound'
      }
    ]
    * if range in unavailable mostly due to incorrect sheet name:
    [
      {
        message: 'Unable to parse range: Sheet3!A2:C415',
        domain: 'global',
        reason: 'badRequest'
      }
    ]
    */
    console.log(error.errors);
    return null;
  }
};

const writeData = async (spreadsheetId, range, data) => {
  if (!data) return;
  const resource = {
    values: data,
  };
  const opt = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "USER_ENTERED",
    resource,
  };
  try {
    await gsapi.spreadsheets.values.update(opt);
  } catch (error) {
    /* 
    !types of error
    * same scenario as reading data applies here
    * additionally  
    * if spreadsheet is shared but write access is not given:
    [
      {
        message: 'The caller does not have permission',
        domain: 'global',
        reason: 'forbidden'
      }
    ]
    * if data and range do note have the same dimension:
    [
      {
        message:
          "Requested writing within range [Sheet2!A2:C400], but tried writing to row [401]",
        domain: "global",
        reason: "badRequest",
      },
    ];
    */
    console.error(error.errors);
  }
};

// reads data from Sheet1 and writes on Sheet2
// returned data is a 2D array
const data = await readData(spreadsheetKeys.spreadsheetId, "Sheet1!A2:C415");
writeData(spreadsheetKeys.spreadsheetId, "Sheet2!A2:C400", data);
