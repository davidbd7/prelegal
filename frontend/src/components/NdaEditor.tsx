"use client";

import { useState } from "react";
import { NdaFormData, defaultFormData } from "@/types/nda";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import DownloadButton from "@/components/DownloadButton";

export default function NdaEditor() {
  const [formData, setFormData] = useState<NdaFormData>(defaultFormData);

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Prelegal</h1>
            <p className="text-sm text-gray-500">Mutual NDA Creator</p>
          </div>
          <DownloadButton data={formData} />
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Fill in NDA Details
            </h2>
            <NdaForm data={formData} onChange={setFormData} />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Document Preview
            </h2>
            <NdaPreview data={formData} />
          </div>
        </div>
      </main>
    </>
  );
}
