import { google } from "googleapis";
import keys from "../credentials.json" assert { type: "json" };
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const client = new google.auth.JWT(
  keys.client_email,
  undefined,
  keys.private_key,
  SCOPES
);
const gsapi = google.sheets({ version: "v4", auth: client });

export default gsapi