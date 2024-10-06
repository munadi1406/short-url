import { nanoid } from 'nanoid';
import { readUrls, writeUrls } from '../../../libs/urlStorage'
import { NextResponse } from 'next/server';  // Digunakan untuk mengembalikan response


// Fungsi untuk menangani POST request
export async function POST(req) {
  const body = await req.json(); // Membaca body dari request
  const { url } = body;

  if (!url) {
    return NextResponse.json({ message: 'URL is required' }, { status: 400 });
  }

  const shortCode = nanoid(6); // Membuat kode pendek

  // Membaca data URL yang ada
  const urls = readUrls();

  // Menambahkan URL baru
  const newUrl = {
    original: url,
    short: shortCode,
    createdAt: new Date().toISOString(),
  };

  urls.push(newUrl);

  // Menyimpan kembali ke file JSON
  writeUrls(urls);

  // Mengembalikan response dengan short URL yang baru dibuat
  return NextResponse.json(
    { shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${shortCode}` },
    { status: 201 }
  );
}

