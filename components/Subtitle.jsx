import { useState } from 'react';
import srtParser2 from 'srt-parser-2'; // Import srt-parser-2 untuk parsing subtitle
import axios from 'axios'; // Import axios untuk request ke API

const SubtitleUpload = () => {
  const [subtitles, setSubtitles] = useState([]);
  const [translatedSubtitles, setTranslatedSubtitles] = useState([]); // State untuk subtitle yang sudah diterjemahkan
  const [loading, setLoading] = useState(false); // Untuk state loading
  const [error, setError] = useState(null); // Untuk state error handling
  const [targetLanguage, setTargetLanguage] = useState('en'); // Default ke bahasa Inggris

  // Fungsi untuk memuat dan memparsing file .srt langsung di frontend
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const reader = new FileReader(); // Menggunakan FileReader untuk membaca file .srt

    reader.onload = async (event) => {
      const fileContent = event.target.result;

      try {
        const parser = new srtParser2(); // Membuat instance parser
        const parsedSubtitles = parser.fromSrt(fileContent); // Parsing konten SRT menjadi JSON
        setSubtitles(parsedSubtitles);
      } catch (err) {
        console.error('Error parsing file:', err);
        setError('Failed to parse the subtitle file.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file); // Membaca file sebagai teks
  };

  // Fungsi untuk membagi array menjadi chunk berukuran 100
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Fungsi untuk menerjemahkan subtitle menggunakan API handler
  const translateSubtitles = async () => {
    try {
      const textsToTranslate = subtitles.map((sub) => sub.text);
      const subtitleChunks = chunkArray(textsToTranslate, 100);

      const translatedTexts = [];

      for (const chunk of subtitleChunks) {
        const batchQuery = chunk.join('\n'); // Gabungkan subtitle dalam satu string, dipisahkan oleh newline

        const response = await axios.post('/api/translate', { query: `Translate this to ${targetLanguage}: ${batchQuery}` });

        const chunkTranslatedTexts = response.data.output.split('\n');
        translatedTexts.push(...chunkTranslatedTexts);
      }

      const newTranslatedSubtitles = subtitles.map((sub, index) => ({
        ...sub,
        translatedText: translatedTexts[index],
      }));

      setTranslatedSubtitles(newTranslatedSubtitles);
    } catch (err) {
      console.error('Error translating subtitles:', err);
      setError('Failed to translate subtitles.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Subtitle Translator</h1>

      <input
        type="file"
        accept=".srt"
        onChange={handleFileUpload}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      <div className="mb-4">
        <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-1">Pilih Bahasa Terjemahan:</label>
        <select
          id="language-select"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="en">Inggris</option>
          <option value="es">Spanyol</option>
          <option value="fr">Perancis</option>
          <option value="de">Jerman</option>
          <option value="indonesia">Indonesia</option>
        </select>
      </div>

      <button
        onClick={translateSubtitles}
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
      >
        Translate
      </button>

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-5">
        <h3 className="text-xl font-semibold mb-2">Subtitle Asli:</h3>
        {subtitles.map((subtitle, index) => (
          <div key={index} className="mb-2 p-2 border border-gray-200 rounded-md">
            <p className="font-medium">{subtitle.startTime} - {subtitle.endTime}</p>
            <p>{subtitle.text}</p>
          </div>
        ))}

        <h3 className="text-xl font-semibold mt-5 mb-2">Subtitle Terjemahan:</h3>
        {translatedSubtitles.map((subtitle, index) => (
          <div key={index} className="mb-2 p-2 border border-gray-200 rounded-md">
            <p className="font-medium">{subtitle.startTime} - {subtitle.endTime}</p>
            <p>{subtitle.translatedText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubtitleUpload;
