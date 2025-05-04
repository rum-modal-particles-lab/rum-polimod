import { useState, useEffect } from "react";
import CorpusChart from "./CorpusChart";
import CorpusCollocatesChart from "./CorpusCollocatesChart";

export default function CorpusSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [corpusIndex, setCorpusIndex] = useState([]);
  const [texts, setTexts] = useState({});
  const [showFull, setShowFull] = useState({});

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    fetch(`${base}/corpus/corpusIndex.json`)
      .then((res) => res.json())
      .then((data) => {
        setCorpusIndex(data);
        data.forEach((entry) => {
          const fullPath = `${base}${entry.path}`;
          fetch(fullPath)
            .then((res) => res.text())
            .then((text) =>
              setTexts((prev) => ({ ...prev, [entry.id]: text }))
            );
        });
      });
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const regex = new RegExp(`(.{0,40})(${escapeRegExp(lowerQuery)})(.{0,40})`, "gi");

    const allResults = corpusIndex.map((entry) => {
      const content = texts[entry.id] || "";
      const matches = [...content.matchAll(regex)].map((m, i) => ({
        key: i,
        left: m[1],
        keyword: m[2],
        right: m[3],
      }));
      return { ...entry, matches };
    }).filter(entry => entry.matches.length > 0);

    setResults(allResults);
  }, [query, texts]);

  const escapeRegExp = (str) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const highlightText = (text, keyword) => {
    const regex = new RegExp(`(${escapeRegExp(keyword)})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300">{part}</mark>
      ) : (
        part
      )
    );
  };

  const downloadCSV = () => {
    const rows = [["File", "Date", "Committee Meeting", "Left", "Keyword", "Right"]];
    results.forEach((doc) => {
      doc.matches.forEach((match) => {
        rows.push([
          doc.title,
          doc.date,
          doc.meeting,
          match.left.trim(),
          match.keyword,
          match.right.trim(),
        ]);
      });
    });
    const csvContent = rows.map(r => r.map(field => `"${field}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "corpus_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Korpus durchsuchen (KWIC)</h2>

      <input
        type="search"
        className="w-full p-2 border rounded mb-2"
        placeholder="Suchbegriff eingeben (z. B. schon)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={downloadCSV}
        className="mb-6 mt-2 bg-[#205781] text-white px-4 py-2 rounded hover:bg-[#1a4563]"
      >
        Download Results as CSV
      </button>

      {/* Visualisations */}
      <CorpusChart results={results} />
      <CorpusCollocatesChart results={results} />

      {/* Results */}
      {results.map((doc) => (
        <div key={doc.id} className="mb-6 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">{doc.title}</h3>
          <p className="text-sm text-gray-500 mb-2">
            {doc.meeting} ({doc.date})
          </p>

          <ul className="text-sm font-mono whitespace-pre-wrap mb-4">
            {doc.matches.map((match) => (
              <li key={match.key} className="mb-1">
                …{match.left}
                <span className="bg-yellow-200 font-semibold">{match.keyword}</span>
                {match.right}…
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
            <button
              onClick={() =>
                setShowFull((prev) => ({ ...prev, [doc.id]: !prev[doc.id] }))
              }
              className="text-blue-600 text-sm underline"
            >
              {showFull[doc.id] ? "Volltext ausblenden" : "Volltext anzeigen"}
            </button>

            {doc.videoLink && (
              <a
                href={doc.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#205781] underline hover:text-blue-800"
              >
                Videoquelle ansehen
              </a>
            )}
          </div>

          {showFull[doc.id] && (
            <pre className="mt-2 p-3 bg-gray-100 text-sm whitespace-pre-wrap rounded">
              {highlightText(texts[doc.id] || "", query)}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
