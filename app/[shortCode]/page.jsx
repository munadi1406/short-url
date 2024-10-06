import { readUrls } from '@/libs/urlStorage';

// Fungsi untuk menghasilkan metadata
export async function generateMetadata({ params }) {
  const { shortCode } = params; // Mendapatkan shortCode dari params

  // Membaca URL dari file JSON
  const urls = readUrls();

  // Mencari URL asli berdasarkan shortCode
  const foundUrl = urls.find((url) => url.short === shortCode);

  // Mengatur metadata
  return {
    title: foundUrl ? `Shortened URL for ${foundUrl.original}` : 'URL Not Found',
    description: foundUrl ? `This is a shortened URL for ${foundUrl.original}` : 'The URL you requested was not found.',
    openGraph: {
      title: foundUrl ? `Shortened URL for ${foundUrl.original}` : '404 - URL Not Found',
      description: foundUrl ? `Redirecting to ${foundUrl.original}` : 'The URL you requested was not found.',
      images: foundUrl ? ['/path-to-your-default-image.jpg'] : [], // Ganti dengan gambar yang sesuai
    },
  };
}

export default function Page({ params }) {
  const { shortCode } = params; // Mendapatkan shortCode dari params

  // Membaca URL dari file JSON
  const urls = readUrls();

  // Mencari URL asli berdasarkan shortCode
  const foundUrl = urls.find((url) => url.short === shortCode);

  if (foundUrl) {
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

  // Jika tidak ditemukan, mengembalikan halaman 404 atau pesan kesalahan
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">404 - URL not found</h1>
    </div>
  );
}
