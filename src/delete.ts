import spreadsheetKeys from "../srpeadsheet.json" assert { type: "json" };
import { deleteRow } from "./functions.js";

deleteRow(spreadsheetKeys.spreadsheetId, 764725746, 10);
