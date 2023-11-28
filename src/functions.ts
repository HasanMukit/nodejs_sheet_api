import gsapi from "./utils.js";
import { calculateRange } from "./range.js";

export const readRange = async (spreadsheetId: string, range: string) => {
  try {
    const result = await gsapi.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });
    return result.data.values;
  } catch (error: any) {
    console.log(error.errors);
    return null;
  }
};

export const writeToRange = async (
  spreadsheetId: string,
  range: string,
  data: any[][]
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
    console.error(error.errors);
  }
};

export const appendRows = async (
  spreadsheetId: string,
  range: string,
  data: any[][]
) => {
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
    await gsapi.spreadsheets.values.append(opt);
  } catch (error: any) {
    console.error(error.errors);
  }
};

export const updateByID_Col = async (
  value: number,
  id: number,
  colName: string,
  sheetName: string,
  numberOfCols: number,
  spreadsheetId: string
) => {
  const tableRange = calculateRange(1, 1, "all", numberOfCols, sheetName);
  const tableData = await readRange(spreadsheetId, tableRange);

  const tableHeader = tableData[0];
  const updateColumnIndex = tableHeader.indexOf(colName);
  const idColumnIndex = tableHeader.indexOf("id");

  const rowIndex = tableData.findIndex(
    (row) => Number(row[idColumnIndex]) === id
  );

  const updateRange = calculateRange(
    rowIndex + 1,
    updateColumnIndex + 1,
    undefined,
    undefined,
    sheetName
  );
  const updateValue = [[value]];
  writeToRange(spreadsheetId, updateRange, updateValue);
};

export const deleteRow = async (
  spreadsheetId: string,
  sheetId: number,
  rowIndex: number
) => {
  try {
    const request = {
      spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId, // Assuming the sheet has only one sheet, change accordingly
                dimension: "ROWS",
                startIndex: rowIndex -1, // Index of the row to delete
                endIndex: rowIndex,
              },
            },
          },
        ],
      },
    };

    const result = gsapi.spreadsheets.batchUpdate(request);
  } catch (error: any) {
    console.log(error.errors);
    return null;
  }
};
