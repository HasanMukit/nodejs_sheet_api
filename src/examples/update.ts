import spreadsheetKeys from "../../srpeadsheet.json" assert { type: "json" };
import { updateByID_Col } from "../functions.js";

updateByID_Col(1000, 65, "wh1", "Sheet1", 3, spreadsheetKeys.spreadsheetId);
