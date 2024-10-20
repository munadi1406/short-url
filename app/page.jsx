'use client'; // Menggunakan client component

import { useState } from 'react';

export default function ShortenUrlPage() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false); // Menambahkan state untuk tombol 'copy'

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // Reset state error dan shortUrl
    setError('');
    setShortUrl('');
    setCopied(false); // Reset state copy

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

  // Fungsi untuk menyalin short URL ke clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true); // Menandai bahwa URL telah disalin
      setTimeout(() => setCopied(false), 2000); // Mengembalikan status 'copied' ke false setelah 2 detik
    });
  };

  // Fungsi untuk mereset input dan hasil
  const handleClear = () => {
    setUrl(''); // Mengosongkan input URL
    setShortUrl(''); // Mengosongkan hasil short URL
    setError(''); // Menghapus pesan error
    setCopied(false); // Reset status copy
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleCopy}
                className={`bg-green-500 text-white p-2 rounded-md transition duration-200 ${
                  copied ? 'bg-green-600' : 'hover:bg-green-600'
                }`}
              >
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <button
                onClick={handleClear}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Clear
              </button>
            </div>
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
