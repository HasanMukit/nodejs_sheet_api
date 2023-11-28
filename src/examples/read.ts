import spreadsheetKeys from "../../srpeadsheet.json" assert { type: "json" };
import { readRange } from "../functions.js";
import { calculateRange } from "../range.js";

const range = calculateRange(1, 1, 10, 2, "Sheet2");

const data = await readRange(spreadsheetKeys.spreadsheetId, range);
console.log(data);
