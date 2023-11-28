import spreadsheetKeys from "../srpeadsheet.json" assert { type: "json" };
import { writeToRange } from "./functions.js";
import { calculateRange } from "./range.js";
import gsapi from "./utils.js";

const range = calculateRange(1, 1);
const data = [["updated"]];

writeToRange(spreadsheetKeys.spreadsheetId, range, data);
