import { readUrls } from '@/libs/urlStorage';

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

  // Jika tidak ditemukan, bisa mengembalikan halaman 404 atau pesan kesalahan
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">404 - URL not found</h1>
    </div>
  );
}
