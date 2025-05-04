import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ElementsViewer from "./ElementsViewer";
import CorpusSearch from "./CorpusSearch";
import moduleData from "../data/moduleData.json";

export default function ModuleLayout() {
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const first = moduleData.sections[0]?.elements[0];
    if (first) setSelectedElement(first);
  }, []);

  useEffect(() => {
    document.title = moduleData.moduleTitle || "PoliMOD";
  }, []);

  return (
    <div className="min-h-screen bg-[#FEFFFC] flex flex-col md:flex-row">
      <Sidebar
        title={moduleData.moduleTitle}
        sections={moduleData.sections}
        onSelectElement={setSelectedElement}
        selectedElementId={selectedElement?.id}
      />

      <main className="flex-1 p-8 bg-[#F2F5F0] overflow-y-auto">
        {selectedElement ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            {selectedElement.type === "component" &&
            selectedElement.id === "corpus-search" ? (
              <CorpusSearch />
            ) : (
              <ElementsViewer element={selectedElement} />
            )}
          </div>
        ) : (
          <p className="text-gray-600">
            Wähle ein Modul-Element aus, um zu beginnen.
          </p>
        )}
      </main>
    </div>
  );
}
