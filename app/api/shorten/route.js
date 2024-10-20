import { nanoid } from 'nanoid';
import { readUrls, writeUrls } from '../../../libs/urlStorage'
import { NextResponse } from 'next/server';  // Digunakan untuk mengembalikan response
import { supabase } from '@/libs/supabase';


// Fungsi untuk menangani POST request
export async function POST(req) {
  const body = await req.json(); // Membaca body dari request
  const { url } = body;

  if (!url) {
    return NextResponse.json({ message: 'URL is required' }, { status: 400 });
  }

  const shortCode = nanoid(6); // Membuat kode pendek

  // Menyimpan URL ke dalam Supabase
  const { data, error } = await supabase
    .from('short') // Nama tabel di Supabase
    .insert([
      {
        original: url,
        short: shortCode,
        created_at: new Date().toISOString(),
      },
    ]);

  if (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ message: 'Error saving URL' }, { status: 500 });
  }

  // Mengembalikan response dengan short URL yang baru dibuat
  return NextResponse.json(
    { shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${shortCode}` },
    { status: 201 }
  );
}

