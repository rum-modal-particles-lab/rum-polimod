import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from "recharts";
  
  export default function CorpusCollocatesChart({ results }) {
    if (!results.length) return null;
  
    const leftFreq = {};
    const rightFreq = {};
  
    const cleanWord = (word) =>
        word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
      
      const isValidWord = (word) => /[a-zA-ZäöüßÄÖÜ]/.test(word);
      
      const getLastWord = (str) => {
        const words = str.trim().split(/\s+/).reverse();
        for (let raw of words) {
          const word = cleanWord(raw.toLowerCase());
          if (isValidWord(word)) return word;
        }
        return null;
      };
      
      const getFirstWord = (str) => {
        const words = str.trim().split(/\s+/);
        for (let raw of words) {
          const word = cleanWord(raw.toLowerCase());
          if (isValidWord(word)) return word;
        }
        return null;
      };      

    results.forEach((doc) => {
      doc.matches.forEach(({ left, right }) => {
        const leftWord = getLastWord(left);
        const rightWord = getFirstWord(right);
  
        if (leftWord) leftFreq[leftWord] = (leftFreq[leftWord] || 0) + 1;
        if (rightWord) rightFreq[rightWord] = (rightFreq[rightWord] || 0) + 1;
      });
    });
  
    const top = (obj, n = 10) =>
        Object.entries(obj)
          .filter(([, count]) => count > 1)
          .sort((a, b) => b[1] - a[1])
          .slice(0, n)
          .map(([word, count]) => ({ word, count }));      
  
    const leftData = top(leftFreq);
    const rightData = top(rightFreq);
  
    return (
      <div className="mb-10 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Häufigste Nachbarwörter (KWIC)</h3>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Context Words */}
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">← Vorher</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={leftData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="word" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          {/* Right Context Words */}
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">Nachher →</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={rightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="word" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
  