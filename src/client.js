import fs from "fs";
import path from "path";
import process from "process";

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const KEYS_PATH = path.join(process.cwd(), "credentials.json");
const SPREADSHEET_PATH = path.join(process.cwd(), "srpeadsheet.json");

export const getKeys = async () => {
  const content = await fs.readFileSync(KEYS_PATH);
  const keys = JSON.parse(content);
  return keys;
};

export const getSpreadSheetKeys = async () => {
  const content = await fs.readFileSync(SPREADSHEET_PATH);
  const keys = JSON.parse(content);
  return keys;
};

