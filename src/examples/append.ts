import spreadsheetKeys from "../../srpeadsheet.json" assert { type: "json" };
import { appendRows } from "../functions.js";
import { calculateRange } from "../range.js";

// 2D array which you want to append

const testData = [
  ["testId_1", "test_sku_1", "qty_1"],
  ["testId_2", "test_sku_2", "qty_2"],
  ["testId_3", "test_sku_3", "qty_3"],
];
const tablestartCol = 1;
const tableStartRow = 1;
const sheetName = "Sheet1";
const range = calculateRange(
  tableStartRow,
  tablestartCol,
  undefined,
  undefined,
  sheetName
);

appendRows(spreadsheetKeys.spreadsheetId, range, testData);
