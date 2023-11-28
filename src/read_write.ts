import { google } from "googleapis";
import keys from "../credentials.json" assert { type: "json" };
import spreadsheetKeys from "../srpeadsheet.json" assert { type: "json" };
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const client = new google.auth.JWT(
  keys.client_email,
  undefined,
  keys.private_key,
  SCOPES
);
const gsapi = google.sheets({ version: "v4", auth: client });

const readRange = async (spreadsheetId: string, range: string) => {
  try {
    const result = await gsapi.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });
    console.log("try:", result.status);
    return result.data.values;
  } catch (error: any) {
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

const writeToRange = async (
  spreadsheetId: string,
  range: string,
  data: string
) => {
  if (!data) return;
  console.log(data);
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
  } catch (error: any) {
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
const data = await readRange(spreadsheetKeys.spreadsheetId, "Sheet1!A2:")
console.log(data?.length);
// writeData(spreadsheetKeys.spreadsheetId, "Sheet2!A2:C", data);
