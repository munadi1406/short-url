import { supabase } from '@/libs/supabase';
import { readUrls } from '@/libs/urlStorage';

// Fungsi untuk menghasilkan metadata
export async function generateMetadata({ params }) {
  const { shortCode } = params;

  // Query ke Supabase untuk mendapatkan URL berdasarkan shortCode
  const { data: foundUrl, error } = await supabase
    .from('short')
    .select('*')
    .eq('short', shortCode)
    .single();

  if (error || !foundUrl) {
    // Jika URL tidak ditemukan, kembalikan metadata untuk halaman 404
    return {
      title: 'URL Not Found',
      description: 'The URL you requested was not found.',
      openGraph: {
        title: '404 - URL Not Found',
        description: 'The URL you requested was not found.',
        images: [],
      },
    };
  }

  // Mengatur metadata jika URL ditemukan
  return {
    title: `Shortened URL for ${foundUrl.original}`,
    description: `This is a shortened URL for ${foundUrl.original}`,
    openGraph: {
      title: `Shortened URL for ${foundUrl.original}`,
      description: `Redirecting to ${foundUrl.original}`,
      images: ['/path-to-your-default-image.jpg'], // Ganti dengan gambar yang sesuai
    },
  };
}

export default async function Page({ params }) {
  const { shortCode } = params;

  // Query ke Supabase untuk mendapatkan URL berdasarkan shortCode
  const { data: foundUrl, error } = await supabase
    .from('short')
    .select('*')
    .eq('short', shortCode)
    .single();

  if (error || !foundUrl) {
    // Jika tidak ditemukan, kembalikan halaman 404
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold">404 - URL not found</h1>
      </div>
    );
  }

  // Jika URL ditemukan, render tombol untuk membuka URL asli
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <form action={foundUrl.original} method="GET">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Open URL
          </button>
        </form>
      </div>
    </div>
  );
}
