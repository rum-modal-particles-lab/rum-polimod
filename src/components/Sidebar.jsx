export default function Sidebar({ title, sections, onSelectElement, selectedElementId }) {
  return (
    <aside className="w-full md:w-64 bg-[#205781] text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
      {sections.map((section) => (
        <div key={section.title} className="mb-4">
          <h3 className="uppercase text-sm font-semibold mb-2 text-[#F5A623]">
            {section.title}
          </h3>
          <ul className="space-y-1">
            {section.elements.map((element) => (
              <li key={element.id}>
                <button
                  onClick={() => onSelectElement(element)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition ${
                    selectedElementId === element.id
                      ? "bg-white text-[#205781] font-semibold"
                      : "hover:bg-[#F5A623] hover:text-white"
                  }`}
                >
                  {element.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
