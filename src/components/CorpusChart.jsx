import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function CorpusChart({ results }) {
  if (!results.length) return null;

  const chartData = results.map((doc) => ({
    name: doc.title.length > 30 ? doc.title.slice(0, 30) + "…" : doc.title,
    frequency: doc.matches.length,
  }));

  return (
    <div className="mb-10 bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-4">Verteilung der Treffer nach Dokument</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 30, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} height={70} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="frequency" fill="#205781" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
