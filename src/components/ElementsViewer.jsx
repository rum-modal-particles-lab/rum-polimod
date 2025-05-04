import { useEffect, useState } from "react";

export default function ElementsViewer({ element }) {
  const [transcript, setTranscript] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    if (element?.type === "video-text") {
      if (element.transcriptPath) {
        const transcriptSrc = `${base}${element.transcriptPath}`;
        fetch(transcriptSrc)
          .then((res) => res.text())
          .then(setTranscript)
          .catch(() =>
            setTranscript("[Fehler beim Laden des Transkripts]")
          );
      }

      if (element.htmlPath) {
        const htmlSrc = `${base}${element.htmlPath}`;
        fetch(htmlSrc)
          .then((res) => res.text())
          .then(setHtmlContent)
          .catch(() =>
            setHtmlContent("<p>[Fehler beim Laden der HTML-Datei]</p>")
          );
      }
    }
  }, [element]);

  if (!element) {
    return <p>No element selected.</p>;
  }

  if (element.type === "text") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{element.title}</h2>
        <p className="text-gray-700">[Markdown content will be rendered here]</p>
      </div>
    );
  }

  if (element.type === "video") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{element.title}</h2>
        <video
          controls
          className="w-full max-w-3xl aspect-video mx-auto shadow-lg bg-[#FEFFFC]"
        >
          <source src={`${base}${element.mediaPath}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <LicenseNotice />
      </div>
    );
  }

  if (element.type === "video-text") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{element.title}</h2>

        <video
          controls
          className="w-full max-w-3xl aspect-video mx-auto shadow-lg bg-[#FEFFFC]"
        >
          <source src={`${base}${element.videoPath}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <LicenseNotice />

        <div className="mt-6 bg-gray-50 p-4 rounded shadow text-sm whitespace-pre-wrap font-mono">
          {transcript || "[Lade Transkript…]"}
        </div>

        <div
          className="mt-6 bg-white p-4 shadow rounded-md"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  }

  if (element.type === "html") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{element.title}</h2>
        <div
          className="bg-white p-4 shadow rounded-md"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  }

  return <p>Element type "{element.type}" not supported yet.</p>;
}

function LicenseNotice() {
  return (
    <p className="text-[0.75rem] text-left text-gray-600 bg-gray-100 p-3 rounded-md max-w-3xl mx-auto mt-3 leading-snug">
      This video content is publicly provided by the{" "}
      <a
        href="https://www.bundestag.de/en/media_centre"
        className="text-[#205781] underline hover:text-[#F5A623]"
        target="_blank"
        rel="noopener noreferrer"
      >
        Media Centre of the German Bundestag
      </a>{" "}
      and is used here exclusively for educational and academic research purposes within a higher education context. Usage complies with the{" "}
      <a
        href="https://www.bundestag.de/nutzungsbedingungen"
        className="text-[#205781] underline hover:text-[#F5A623]"
        target="_blank"
        rel="noopener noreferrer"
      >
        Bundestag's conditions of use
      </a>
      , including attribution, non-commercial use, and respectful presentation.
      No modifications beyond accessibility adjustments have been made. This use
      does not imply any affiliation with or endorsement by the German
      Bundestag.
    </p>
  );
}
