"use client";

import { NdaFormData } from "@/types/nda";
import { generateFullNda } from "@/lib/nda-template";

interface NdaPreviewProps {
  data: NdaFormData;
}

export default function NdaPreview({ data }: NdaPreviewProps) {
  const html = generateFullNda(data);

  return (
    <div
      id="nda-preview"
      className="nda-document prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
