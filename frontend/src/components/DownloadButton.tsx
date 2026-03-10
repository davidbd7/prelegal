"use client";

import { useCallback, useState } from "react";
import { NdaFormData } from "@/types/nda";
import { generateFullNda } from "@/lib/nda-template";

interface DownloadButtonProps {
  data: NdaFormData;
}

const pdfStyles = `
  body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; color: #000; margin: 0; padding: 20px; }
  h1 { font-size: 18pt; text-align: center; margin-bottom: 16px; }
  h2 { font-size: 14pt; margin-top: 24px; }
  h3 { font-size: 12pt; margin-top: 16px; }
  p { margin: 8px 0; text-align: justify; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  th, td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 11pt; }
  th { background: #f0f0f0; font-weight: bold; }
  hr { border: none; border-top: 2px solid #000; margin: 32px 0; }
  .attribution { font-size: 9pt; color: #666; margin-top: 24px; }
  a { color: #000; }
`;

export default function DownloadButton({ data }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const content = generateFullNda(data);
      const container = document.createElement("div");
      container.innerHTML = `<style>${pdfStyles}</style>${content}`;

      const filename = [data.party1Company, data.party2Company]
        .filter(Boolean)
        .join("-");

      await html2pdf()
        .set({
          margin: [15, 15, 15, 15],
          filename: `Mutual-NDA${filename ? `-${filename}` : ""}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
        })
        .from(container)
        .save();
    } finally {
      setLoading(false);
    }
  }, [data]);

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download PDF
        </>
      )}
    </button>
  );
}
