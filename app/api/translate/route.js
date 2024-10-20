// app/api/translate/route.js

import axios from 'axios';

export async function POST(request) {
  const { query } = await request.json(); // Mendapatkan query dari body permintaan
  console.log({query})

  try {
    const response = await axios.post('https://infinite-gpt.p.rapidapi.com/infinite-gpt', {
      query: query,
    }, {
      headers: {
        'x-rapidapi-key': 'b72eab963fmshcb651defebf1012p18718ejsn7a4b38d9f93a', // Ganti dengan API key Anda
        'x-rapidapi-host': 'infinite-gpt.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
    });
   

    return new Response(JSON.stringify({ output: response.data.msg }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error calling translation API:', error);
    return new Response(JSON.stringify({ error: 'Failed to translate.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
