'use client'; // Menggunakan client component

// import SubtitleUpload from '@/components/Subtitle';
import { useState } from 'react';

export default function ShortenUrlPage() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // Reset state error
    setError('');
    setShortUrl('');

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }), // Mengirim URL sebagai JSON
      });

      if (!response.ok) {
        // Jika ada kesalahan, tangani di sini
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json(); // Mengambil response JSON
      setShortUrl(data.shortUrl); // Menyimpan short URL ke state
    } catch (err) {
      setError(err.message); // Menyimpan pesan error ke state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* <div><SubtitleUpload /></div> */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Shorten Your URL</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700">Shortened URL:</h2>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}
      </div>

    </div>
  );
}
