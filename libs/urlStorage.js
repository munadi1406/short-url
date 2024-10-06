import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'urls.json');

// Fungsi untuk membaca file JSON
export function readUrls() {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

// Fungsi untuk menulis file JSON
export function writeUrls(urls) {
  fs.writeFileSync(filePath, JSON.stringify(urls, null, 2)); // Menyimpan dengan format rapi
}
